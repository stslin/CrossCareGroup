# 🔒 Cross Care Group - Security Implementation Guide

## Overview
This document outlines the security measures implemented for the Cross Care Group web application. The architecture is **Static HTML/JS** hosted on SiteGround, connecting directly to Microsoft Power Automate flows for backend processing.

---

## 🛡️ Application Security (Frontend)

### 1. **Client-Side Rate Limiting**
Implemented in `js/forms.js` to prevent accidental double-submissions and basic spam.

- **Limit**: 5 submissions per minute per user session.
- **Mechanism**: In-memory timestamp tracking.
- **Behavior**: Blocks submission button if limit exceeded.

### 2. **Input Sanitization**
All user input is sanitized before processing to prevent XSS attacks.

- **HTML Encoding**: Converts special characters to HTML entities.
- **Pattern Removal**: Strips `javascript:`, `<script>`, `<iframe>`, and event handlers.
- **Length Limits**: Enforced on all text fields (max 5000 chars).

### 3. **File Upload Validation**
Client-side checks ensure only safe files are transmitted to the automation layer.

- **Allowed Extensions**: `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`, `.txt`
- **Max File Size**: 10MB per file.
- **Max Files**: 5 per submission.

### 4. **CSRF Protection**
A client-generated cryptographic token is included in headers for request tracking and future verification.

---

## 🔐 Transport Security & Headers

### 1. **Headers Configuration (.htaccess)**
The following headers are enforced by the Apache server (SiteGround) for all responses:

```apache
# Prevent MIME-type sniffing
Header set X-Content-Type-Options: "nosniff"

# Prevent clickjacking
Header set X-Frame-Options: "DENY"

# Enable XSS filtering
Header set X-XSS-Protection: "1; mode=block"

# Referrer Policy
Header set Referrer-Policy: "strict-origin-when-cross-origin"

# Permissions Policy (deny mostly everything)
Header set Permissions-Policy: "geolocation=(), microphone=(), camera=(), payment=()"
```

### 2. **CORS Configuration**
Cross-Origin Resource Sharing is strictly controlled for static assets.

- **Policy**: Strict Allowlist (No wildcard `*` allowed in production).
- **Production Origin**: `https://crosscaregroup.com.au`
- **Staging Origin**: `https://testing.crosscaregroup.com.au`

### 3. **HSTS (HTTP Strict Transport Security)**
Ensures all connections are upgraded to HTTPS.

```apache
# Max-age: 1 year (31536000 seconds)
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

---

## ☁️ API Security (Power Automate)

The application communicates directly with Microsoft Power Automate flows via HTTP Triggers.

- **Endpoints**: Defined in `js/config.js` (obfuscated as part of the build).
- **Authentication**: Usage of Shared Access Signatures (SAS) in the URL (`sig=` parameter).
- **Threat Protection**: 
  - Microsoft's infrastructure handles DDoS protection and basic rate limiting.
  - No sensitive data is returned in API responses (only success/failure status).
  - Logic Flows validate all inputs server-side before processing.

---

## 🚀 Production Deployment Checklist

### SiteGround Configuration
- [x] **HSTS Enabled**: Verified in `.htaccess`.
- [ ] **SSL Certificate**: Ensure Let's Encrypt or paid SSL is active on the domain.
- [ ] **PHP Version**: N/A (Pure Static), but ensure default is stable (8.x).
- [ ] **Caching**: Enable SiteGround Static Cache for performance.

### Environment Verification
- [ ] **API Endpoints**: Ensure `js/config.js` points to Production Power Automate flows (not Dev/Test).
- [ ] **Robots.txt**: Ensure production `robots.txt` allows indexing (unlike staging).

### Content Validation
- [x] **No Dev Files**: `server.py`, `.env` (if unused locally), and `node_modules` are excluded.
- [ ] **Broken Links**: Run a crawler to verify internal linking structure.

---

## 📞 Support

For security concerns or effective incident response:
- **Hosting Provider**: SiteGround Support (Infrastructure)
- **API Provider**: Microsoft Power Platform (Backend Logic)
- **Developer**: Cross Care Group Tech Team

**Last Updated**: 2026-02-09
**Architecture**: Static S3/Apache + Power Automate
