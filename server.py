import http.server
import socketserver
import urllib.parse
import urllib.request
import json
import os
import base64
from datetime import datetime

# --- CONFIGURATION ---
# Load .env file manually to avoid external dependencies
if os.path.exists(".env"):
    print("Loading .env file...")
    with open(".env") as f:
        for line in f:
            line = line.strip()
            if "=" in line and not line.startswith("#"):
                try:
                    key, value = line.split("=", 1)
                    os.environ[key.strip()] = value.strip()
                except ValueError:
                    continue

PORT = int(os.environ.get("PORT", 8000))
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "ccg-admin-2025")

# Graph API / OAuth Config
TENANT_ID = os.environ.get("TENANT_ID")
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
SCOPE = os.environ.get("SCOPE", "https://graph.microsoft.com/.default")
GRANT_TYPE = os.environ.get("GRANT_TYPE", "client_credentials")

SITE_ID = os.environ.get("SITE_ID")
LIST_REQUEST_ID = os.environ.get("LIST_REQUEST_ID")
LIST_ENQUIRY_ID = os.environ.get("LIST_ENQUIRY_ID")
LIST_EOI_ID = os.environ.get("LIST_EOI_ID")
LIST_FEEDBACK_COMPLAINT_ID = os.environ.get("LIST_FEEDBACK_COMPLAINT_ID")
LIST_REFERRAL_ID = os.environ.get("LIST_REFERRAL_ID")
DRIVE_ID = os.environ.get("DRIVE_ID")
FOLDER_NAME = os.environ.get("FOLDER_NAME")

# --- LOGGING UTILITY ---
def log_event(message):
    """Logs a message to a daily file in the /logs directory."""
    try:
        if not os.path.exists("logs"):
            os.makedirs("logs")
        
        now = datetime.now()
        date_str = now.strftime("%Y%m%d")
        timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
        filename = f"logs/CCG-{date_str}.log"
        
        log_entry = f"[{timestamp}] {message}\n"
        
        # Print to console as well
        print(message)
        
        with open(filename, "a", encoding="utf-8") as f:
            f.write(log_entry)
    except Exception as e:
        print(f"FAILED TO LOG: {e}")

def get_access_token():
    log_event("Requesting fresh access token from Microsoft...")
    if not TENANT_ID or not CLIENT_ID or not CLIENT_SECRET:
        log_event("Error: Missing OAuth2 credentials (TENANT_ID, CLIENT_ID, or CLIENT_SECRET)")
        return None

    url = f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token"
    body = {
        'client_id': CLIENT_ID,
        'scope': SCOPE,
        'client_secret': CLIENT_SECRET,
        'grant_type': GRANT_TYPE
    }
    
    try:
        log_event(f"--- DEBUG: MICROSOFT TOKEN REQUEST ---")
        log_event(f"URI: {url}")
        log_event(f"Body: {body}")
        log_event(f"-----------------------------------------")
        data = urllib.parse.urlencode(body).encode('utf-8')
        req = urllib.request.Request(url, data=data, method='POST')
        
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode('utf-8'))
            log_event("Token acquired successfully.")
            return f"Bearer {res['access_token']}"
    except Exception as e:
        log_event(f"Token Acquisition Error: {e}")
        return None

class CCGHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        http.server.SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        log_event(f"Incoming POST request to: {self.path}")
        
        try:
            content_length_header = self.headers.get('Content-Length')
            content_length = int(content_length_header) if content_length_header else 0
            post_data = self.rfile.read(content_length).decode('utf-8')
        except Exception as e:
            log_event(f"Error reading POST data: {e}")
            self.send_response(400)
            self.end_headers()
            return

        # Determine form type from URL
        url_path = urllib.parse.urlparse(self.path).path
        path_parts = [p for p in url_path.split('/') if p]
        form_type = path_parts[-1] if path_parts else "general"
        
        log_event(f"Detected path type: {form_type}")

        # Proxy to Microsoft Graph
        if form_type in ["submit-support", "submit-contact", "submit-eoi", "make-a-referral", "submit-feedback", "submit-complaint", "feedback", "complaint"]:
            # 1. Select the correct List ID
            list_ids = {
                "submit-support": LIST_REQUEST_ID,
                "submit-contact": LIST_ENQUIRY_ID,
                "submit-eoi": LIST_EOI_ID,
                "make-a-referral": LIST_REFERRAL_ID,
                "submit-feedback": LIST_FEEDBACK_COMPLAINT_ID,
                "submit-complaint": LIST_FEEDBACK_COMPLAINT_ID,
                "feedback": LIST_FEEDBACK_COMPLAINT_ID,
                "complaint": LIST_FEEDBACK_COMPLAINT_ID
            }
            list_id = list_ids.get(form_type)
            
            if not list_id or not SITE_ID:
                log_event(f"Error: Missing configuration for {form_type} (SITE_ID or LIST_ID)")
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": f"Server configuration error for {form_type}"}).encode())
                return

            # 2. Get Token
            auth_header = get_access_token()
            
            if not auth_header:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": "Failed to authenticate with Microsoft"}).encode())
                return

            # 3. Forward to Graph
            log_event(f"Forwarding {form_type} to Microsoft Graph API for {SITE_ID} (List: {list_id})...")

            try:
                payload = json.loads(post_data)
                
                # Inject caf_type for feedback/complaint consolidation
                if form_type in ["submit-feedback", "feedback"]:
                    payload['fields']['caf_type'] = "Feedback"
                elif form_type in ["submit-complaint", "complaint"]:
                    payload['fields']['caf_type'] = "Complaint"

                # 4. Handle Attachments for Referrals
                if form_type == "make-a-referral" and "attachments" in payload:
                    attachments = payload.get("attachments", [])
                    log_event(f"Processing {len(attachments)} attachments for referral...")
                    
                    if not DRIVE_ID or not FOLDER_NAME:
                        log_event("Warning: DRIVE_ID or FOLDER_NAME missing from .env. Skipping file uploads.")
                    else:
                        for att in attachments:
                            file_name = att.get("name")
                            file_content_b64 = att.get("content")
                            
                            if not file_name or not file_content_b64:
                                continue
                                
                            try:
                                log_event(f"Uploading file: {file_name}...")
                                # Decode the base64 content
                                file_data = base64.b64decode(file_content_b64)
                                
                                # PUT to Graph
                                upload_url = f"https://graph.microsoft.com/v1.0/sites/{SITE_ID}/drives/{DRIVE_ID}/root:/{FOLDER_NAME}/{urllib.parse.quote(file_name)}:/content"
                                
                                log_event(f"--- DEBUG: MICROSOFT GRAPH UPLOAD (PUT) ---")
                                log_event(f"URI: {upload_url}")
                                log_event(f"-----------------------------------------")
                                
                                upload_req = urllib.request.Request(
                                    upload_url,
                                    data=file_data,
                                    headers={
                                        'Authorization': auth_header,
                                        'Content-Type': 'application/octet-stream'
                                    },
                                    method='PUT'
                                )
                                
                                with urllib.request.urlopen(upload_req) as upload_res:
                                    upload_res_data = json.loads(upload_res.read().decode('utf-8'))
                                    item_id = upload_res_data.get("id")
                                    log_event(f"File uploaded successfully. Item ID: {item_id}")
                                    
                                    # POST check-in
                                    checkin_url = f"https://graph.microsoft.com/v1.0/drives/{DRIVE_ID}/items/{item_id}/checkin"
                                    
                                    log_event(f"--- DEBUG: MICROSOFT GRAPH CHECK-IN (POST) ---")
                                    log_event(f"URI: {checkin_url}")
                                    log_event(f"-----------------------------------------")
                                    
                                    checkin_payload = json.dumps({"comment": "Checked in via Graph upload"})
                                    checkin_req = urllib.request.Request(
                                        checkin_url,
                                        data=checkin_payload.encode('utf-8'),
                                        headers={
                                            'Authorization': auth_header,
                                            'Content-Type': 'application/json'
                                        },
                                        method='POST'
                                    )
                                    
                                    with urllib.request.urlopen(checkin_req) as checkin_res:
                                        log_event(f"File {file_name} checked in successfully.")
                            except Exception as att_err:
                                log_event(f"Error uploading attachment {file_name}: {att_err}")
                                # We continue with other files even if one fails

                graph_url = f"https://graph.microsoft.com/v1.0/sites/{SITE_ID}/lists/{list_id}/items"
                json_payload = json.dumps(payload)

                log_event(f"--- DEBUG: MICROSOFT GRAPH API REQUEST ---")
                log_event(f"URI: {graph_url}")
                log_event(f"Body: {json_payload}")
                log_event(f"-----------------------------------------")
                
                req = urllib.request.Request(
                    graph_url,
                    data=json_payload.encode('utf-8'),
                    headers={
                        'Authorization': auth_header,
                        'Content-Type': 'application/json'
                    },
                    method='POST'
                )
                
                try:
                    with urllib.request.urlopen(req) as response:
                        res_data = response.read().decode('utf-8')
                        log_event(f"Successfully posted {form_type} to SharePoint via Graph API")
                        self.send_response(200)
                        self.send_header('Content-type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps({"status": "success"}).encode())
                        return
                except urllib.error.HTTPError as e:
                    error_body = e.read().decode('utf-8')
                    log_event(f"Graph API HTTP Error {e.code}: {error_body}")
                    self.send_response(e.code)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(error_body.encode())
                    return
            except Exception as e:
                log_event(f"Proxy Error for {form_type}: {e}")
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode())
                return

        # Handle other POST requests (No-op or error)
        self.send_response(404)
        self.end_headers()

    def do_GET(self):
        # Regular file serving
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

if __name__ == "__main__":
    log_event(f"CCG Clinical Backend starting at http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), CCGHandler) as httpd:
        httpd.serve_forever()
