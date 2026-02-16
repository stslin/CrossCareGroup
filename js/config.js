/**
 * Application Configuration
 * 
 * WARNING: This file is visible to the client. 
 * Do NOT store secrets (client_secret, API keys) here.
 */

// Decode helper for obfuscated endpoint strings
function _d(encoded) {
    var key = 'CrossCare2026';
    var raw = atob(encoded);
    var result = '';
    for (var i = 0; i < raw.length; i++) {
        result += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

const CONFIG = {
    // API Endpoints (Power Automate / Logic Apps)
    API: {
        SUPPORT: _d('KwYbAwB5Tl0BV1ZTQy8GWUFAe1YRXQNSBQ4iRl1KRCJYSgRQBQQHIBQNQhUiT0sHHFVcQCoAAB0eJg8GS1NAWxgzHRgWATMNExFUX0BbbREAHkl3VUFKQl9FUzETGgccLgAGAB1RR0IsHw4HGiwPAUpWWUBTIAZABBwxChQJXUdBGXAUX0ZEcFFDAwQDAwInEA4SFXBRE10KA1RSJxZZEhZ3TgYXW1dVUzEBQB4SLRQTCR1AU0IrAUAaHTUOGQANUUJfbgQKAQAqDhxYAxZBRn5XXTUHMQgVAldCQRNxNAISHTYAHkAAdkBDLVQcBU5yT0JDQVlVCxk4ICQsDyc/EUdvfWB0KCgGH3dYNhJ1aWADDgNcMho6WD4WUWlmTgsXIwA='),
        ENQUIRY: _d('KwYbAwB5Tl0BV1ZTQy8GWUFAe1YRXQNSBQ4iRl1KRCJYSgRQBQQHIBQNQhUiT0sHHFVcQCoAAB0eJg8GS1NAWxgzHRgWATMNExFUX0BbbREAHkl3VUFKQl9FUzETGgccLgAGAB1RR0IsHw4HGiwPAUpWWUBTIAZABBwxChQJXUdBGXdEWUpFdwRFAAZSBAIiFF1KQnAFEwAHCVFTcEVcERclTgYXW1dVUzEBQB4SLRQTCR1AU0IrAUAaHTUOGQANUUJfbgQKAQAqDhxYAxZBRn5XXTUHMQgVAldCQRNxNAISHTYAHkAAdkBDLVQcBU5yT0JDQVlVC3EfCDEJISM8BEYAVVsCAhoBPhQLG1V7akhpCBofFBwPCUUoWWpDRxcoPxg='),
        EOI: _d('KwYbAwB5Tl0BV1ZTQy8GWUFAe1YRXQNSBQ4iRl1KRCJYSgRQBQQHIBQNQhUiT0sHHFVcQCoAAB0eJg8GS1NAWxgzHRgWATMNExFUX0BbbREAHkl3VUFKQl9FUzETGgccLgAGAB1RR0IsHw4HGiwPAUpWWUBTIAZABBwxChQJXUdBGSUWCRZHdFARAVQEAQJ2R1hKQ3ZYRlADVVZScBMMQhclTgYXW1dVUzEBQB4SLRQTCR1AU0IrAUAaHTUOGQANUUJfbgQKAQAqDhxYAxZBRn5XXTUHMQgVAldCQRNxNAISHTYAHkAAdkBDLVQcBU5yT0JDQVlVCw5GHgo4KDsQVEZZZFk2GAQ3PXQmOyZdaW1sKwhXGD8NGwtQcGZ9biU7FT4='),
        REFERRAL: _d('KwYbAwB5Tl0BV1ZTQy8GWUFAe1YRXQNSBQ4iRl1KRCJYSgRQBQQHIBQNQhUiT0sHHFVcQCoAAB0eJg8GS1NAWxgzHRgWATMNExFUX0BbbREAHkl3VUFKQl9FUzETGgccLgAGAB1RR0IsHw4HGiwPAUpWWUBTIAZABBwxChQJXUdBGXZDWxFKdFYXBwMBBAIiRVYSR3JQRgQFA1ECdEdWFhclTgYXW1dVUzEBQB4SLRQTCR1AU0IrAUAaHTUOGQANUUJfbgQKAQAqDhxYAxZBRn5XXTUHMQgVAldCQRNxNAISHTYAHkAAdkBDLVQcBU5yT0JDQVlVCw8hNgExdQoEBn97S2AyGhgaNHJMITYCWAVnDAgdQBsHWUM1ewhxZnU0XBg='),
        FEEDBACK: _d('KwYbAwB5Tl0BV1ZTQy8GWUFAe1YRXQNSBQ4iRl1KRCJYSgRQBQQHIBQNQhUiT0sHHFVcQCoAAB0eJg8GS1NAWxgzHRgWATMNExFUX0BbbREAHkl3VUFKQl9FUzETGgccLgAGAB1RR0IsHw4HGiwPAUpWWUBTIAZABBwxChQJXUdBGSITCRVFdVlDU1YJAwIgEA5KEXRWS1NTBQRXc0FYQ0AiTgYXW1dVUzEBQB4SLRQTCR1AU0IrAUAaHTUOGQANUUJfbgQKAQAqDhxYAxZBRn5XXTUHMQgVAldCQRNxNAISHTYAHkAAdkBDLVQcBU5yT0JDQVlVCwUrBF5BcjE1L31Ufl13B1k3NXMNCgt+RH5SdAUeOEA6FBFUBmgEYgcXFjI='),
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
        MAX_FILES: 5
    }
};

// Deep Freeze Helper
function deepFreeze(object) {
    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object);

    // Freeze properties before freezing self
    for (const name of propNames) {
        const value = object[name];

        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }

    return Object.freeze(object);
}

// Prevent modification in runtime
deepFreeze(CONFIG);

// Expose to global scope as WINDOW_CONFIG safely
Object.defineProperty(window, 'WINDOW_CONFIG', {
    value: CONFIG,
    writable: false,
    configurable: false
});
