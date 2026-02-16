/**
 * Application Configuration
 * 
 * WARNING: This file is visible to the client. 
 * Do NOT store secrets (client_secret, API keys) here.
 * 
 * SECURITY NOTE: API endpoint URLs are encoded to prevent casual inspection
 * and automated scraping. Origin validation is enforced at runtime.
 * For production, consider migrating to a server-side proxy (e.g., PHP/Node).
 */

(function () {
    'use strict';

    // --- Origin Validation ---
    // Only allow requests from approved domains
    var ALLOWED_ORIGINS = [
        'https://crosscaregroup.com.au',
        'https://www.crosscaregroup.com.au',
        'https://testing.crosscaregroup.com.au'
    ];

    // Allow localhost in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        ALLOWED_ORIGINS.push(window.location.origin);
    }

    function isAllowedOrigin() {
        return ALLOWED_ORIGINS.indexOf(window.location.origin) !== -1;
    }

    // --- Simple Encoding/Decoding ---
    // Base64 encoding to prevent plain-text exposure of endpoint URLs in source.
    // This is NOT encryption — it deters casual inspection and automated scraping only.
    function _d(encoded) {
        try {
            return atob(encoded);
        } catch (e) {
            console.error('Config: Failed to decode endpoint.');
            return '';
        }
    }

    // Encoded API endpoint base and signatures
    var _BASE = 'aHR0cHM6Ly9kZWZhdWx0NjIzODdjODFiNzhhNDI5N2E5OGFiNTYxY2ZiMWZhLjliLmVudmlyb25tZW50LmFwaS5wb3dlcnBsYXRmb3JtLmNvbTo0NDMvcG93ZXJhdXRvbWF0ZS9hdXRvbWF0aW9ucy9kaXJlY3Qvd29ya2Zsb3dzLw==';
    var _TRIGGER = 'L3RyaWdnZXJzL21hbnVhbC9wYXRocy9pbnZva2U/YXBpLXZlcnNpb249MSZzcD0lMkZ0cmlnZ2VycyUyRm1hbnVhbCUyRnJ1biZzdj0xLjAmc2lnPQ==';

    // Workflow IDs and signatures (separated to avoid full URL strings in source)
    var _ENDPOINTS = {
        SUPPORT:  { wf: 'M2YwNTczMDFmNjMxNGRiYWFmMzBhODgzZmRkZDZhZTQ=', sig: 'WkpPV19MRk10dV9PVjdaR3VsNDlEd0dZUjVNcTNBaXk5THNjWVR4SGVMcw==' },
        ENQUIRY:  { wf: 'NDY2OTY0ZTdlNGI2NGFmMjkxM2RhZTU5Y2UzNzNiZGY=', sig: 'Mm1nQnpiQk5hdDBnbUFwdXJNV2ppMElacl9LaHBnb0xoN01rWnFxVFpQaw==' },
        EOI:      { wf: 'ZmRmZTQ3MWNkZjQzNDU1NzkwNTk0NTFlZGQzYWMxZGY=', sig: 'TTRxeUtrWmIxdGlWb3Vqa0RON0dJQ29ZX1poejhrTE56eTVCVk9YZkl6TQ==' },
        REFERRAL: { wf: 'NTE0Yjk3N2ViMTE2NGE3OWE0MTE0YTczYzQ3NTllZGY=', sig: 'TFNZckI2a3ZjTUt5VnFod2lHMS1TUzBoN1FPelIzaEQ4MVBJOENQNUZ3aw==' },
        FEEDBACK: { wf: 'YWFmZjY2ODE2ZDkxNGNiYTliNzc5NmE1NmEwMzcwM2E=', sig: 'RllrLTIxUEdKT2RMazR1NkRGMGx4bkx0TGQ3d3FLM3l1YzE0WDZURGVZQQ==' }
    };

    /**
     * Resolves the full API URL for a given endpoint key.
     * Validates origin before returning the URL.
     */
    function resolveEndpoint(key) {
        if (!isAllowedOrigin()) {
            console.error('Config: Blocked — origin not in allowlist: ' + window.location.origin);
            return '';
        }
        var ep = _ENDPOINTS[key];
        if (!ep) return '';
        return _d(_BASE) + _d(ep.wf) + _d(_TRIGGER) + _d(ep.sig);
    }

    var CONFIG = {
        // API Endpoints — resolved lazily via resolveEndpoint()
        API: {
            get SUPPORT()  { return resolveEndpoint('SUPPORT'); },
            get ENQUIRY()  { return resolveEndpoint('ENQUIRY'); },
            get EOI()      { return resolveEndpoint('EOI'); },
            get REFERRAL() { return resolveEndpoint('REFERRAL'); },
            get FEEDBACK() { return resolveEndpoint('FEEDBACK'); }
        },

        // Auth Configuration (OIDC) - Placeholders for now
        AUTH: {
            AUTHORITY: 'https://your-idp.com',
            CLIENT_ID: 'your-client-id',
            REDIRECT_URI: window.location.origin + '/callback.html',
            SCOPE: 'openid profile email',
        },

        // Security Settings
        SECURITY: {
            MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
            ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
            MAX_FILES: 5,
            ALLOWED_ORIGINS: ALLOWED_ORIGINS
        }
    };

    // Freeze non-getter properties to prevent tampering
    Object.freeze(CONFIG.AUTH);
    Object.freeze(CONFIG.SECURITY);
    Object.freeze(CONFIG);

    // Expose to global scope as WINDOW_CONFIG safely
    Object.defineProperty(window, 'WINDOW_CONFIG', {
        value: CONFIG,
        writable: false,
        configurable: false
    });
})();
