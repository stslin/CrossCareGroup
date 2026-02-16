/**
 * Cookie Consent Configuration
 * Uses orestbida/cookieconsent v3
 * Configured for Australian Privacy Act 1988 (APPs) + GDPR compliance
 * 
 * @see https://cookieconsent.orestbida.com/
 */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof CookieConsent === 'undefined') return;

    CookieConsent.run({
        // Auto-detect language from <html lang="...">
        // Falls back to 'en' if not found
        guiOptions: {
            consentModal: {
                layout: 'box inline',
                position: 'bottom left',
                equalWeightButtons: false,
                flipButtons: false
            },
            preferencesModal: {
                layout: 'box',
                position: 'right',
                equalWeightButtons: true,
                flipButtons: false
            }
        },

        categories: {
            necessary: {
                enabled: true,
                readOnly: true
            },
            analytics: {
                enabled: false,
                autoClear: {
                    cookies: [
                        { name: /^_ga/ },
                        { name: '_gid' },
                        { name: '_gat' }
                    ]
                }
            },
            functionality: {
                enabled: false
            }
        },

        // Hook: block GA scripts until analytics consent is granted
        onFirstConsent: function ({ cookie }) {
            // Consent recorded — categories are now set
        },
        onChange: function ({ changedCategories }) {
            // If analytics toggled, reload to apply/remove GA
            if (changedCategories.indexOf('analytics') > -1) {
                window.location.reload();
            }
        },

        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: 'We respect your privacy',
                        description: 'This website uses essential cookies to ensure proper functionality. With your consent, we may also use analytics cookies to understand how you interact with our site. You can change your preferences at any time. For more details, see our <a href="/legal/privacy-policy/" class="cc-link">Privacy Policy</a>.',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Necessary only',
                        showPreferencesBtn: 'Manage preferences'
                    },
                    preferencesModal: {
                        title: 'Cookie Preferences',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Necessary only',
                        savePreferencesBtn: 'Save preferences',
                        closeIconLabel: 'Close',
                        serviceCounterLabel: 'Service|Services',
                        sections: [
                            {
                                title: 'About cookies on this site',
                                description: 'Cross Care Group uses cookies and similar technologies to provide you with the best experience. We are committed to protecting your privacy in accordance with the Australian Privacy Act 1988 and the EU General Data Protection Regulation (GDPR).'
                            },
                            {
                                title: 'Strictly necessary cookies',
                                description: 'These cookies are essential for the website to function correctly. They enable basic features such as page navigation, form submission, and security. These cookies do not collect personal information and cannot be disabled.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Analytics cookies',
                                description: 'These cookies help us understand how visitors interact with our website by collecting anonymous usage data. This information helps us improve our website and services. We use Google Analytics, which may transfer data to servers outside Australia (see our <a href="/legal/privacy-policy/#cross-border" class="cc-link">Privacy Policy</a> for details on cross-border data transfers).',
                                linkedCategory: 'analytics',
                                cookieTable: {
                                    headers: {
                                        name: 'Name',
                                        domain: 'Domain',
                                        description: 'Description',
                                        expiration: 'Expiration'
                                    },
                                    body: [
                                        {
                                            name: '_ga',
                                            domain: 'crosscaregroup.com.au',
                                            description: 'Google Analytics — distinguishes unique users',
                                            expiration: '2 years'
                                        },
                                        {
                                            name: '_ga_*',
                                            domain: 'crosscaregroup.com.au',
                                            description: 'Google Analytics — maintains session state',
                                            expiration: '2 years'
                                        },
                                        {
                                            name: '_gid',
                                            domain: 'crosscaregroup.com.au',
                                            description: 'Google Analytics — distinguishes users (24hr)',
                                            expiration: '24 hours'
                                        }
                                    ]
                                }
                            },
                            {
                                title: 'Functionality cookies',
                                description: 'These cookies enable enhanced features such as remembering your preferences and display settings. They may be set by us or by third-party services (e.g., embedded YouTube videos). If you do not allow these cookies, some features may not function properly.',
                                linkedCategory: 'functionality'
                            },
                            {
                                title: 'More information',
                                description: 'For questions about our cookie policy or your privacy rights, please <a href="/contact/" class="cc-link">contact us</a> or email <a href="mailto:[PRIVACY_OFFICER_EMAIL]" class="cc-link">[PRIVACY_OFFICER_EMAIL]</a>. You may also lodge a complaint with the <a href="https://www.oaic.gov.au/" class="cc-link" target="_blank" rel="noopener">Office of the Australian Information Commissioner (OAIC)</a>.'
                            }
                        ]
                    }
                }
            }
        }
    });
});
