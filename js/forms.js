/**
 * Cross Care Group - Standardised Form Submission Engine
 * Features: Global event delegation, modal feedback, and explicit redirection blocking.
 */

(function () {
  console.log("CCG Form Engine: Initializing scorched-earth redirection block...");

  /**
   * Configuration for field mapping and API endpoints
   */
  const CONFIG = {
    'submit-support': {
      endpoint: '/submit-support',
      title: 'Support Request',
      successMessage: 'Your request has been received. Our clinical team will be in touch shortly.'
    },
    'submit-contact': {
      endpoint: '/submit-contact',
      title: 'General Enquiry',
      successMessage: 'Thank you for your enquiry. Our team will respond within one business day.'
    },
    'submit-eoi': {
      endpoint: '/submit-eoi',
      title: 'Expression of Interest',
      successMessage: 'Your interest has been registered. Our recruitment team will review your details and reach out.'
    },
    'make-a-referral': {
      endpoint: '/make-a-referral',
      title: 'Medical Referral',
      successMessage: 'Referral submitted successfully. Our clinical team will process this shortly.'
    },
    'submit-feedback': {
      endpoint: '/submit-feedback',
      title: 'Feedback Submission',
      successMessage: 'Thank you for your feedback. Our management team will review your comments.'
    },
    'submit-complaint': {
      endpoint: '/submit-complaint',
      title: 'Complaint Submission',
      successMessage: 'Your complaint has been received. Our quality team will investigate and contact you.'
    }
  };

  /**
   * Determine API Base URL
   * If running via file://, fallback to localhost:8001 for development
   */
  const getBaseUrl = () => {
    if (window.location.protocol === 'file:') return 'http://localhost:8001';
    return ''; // Relative to current host
  };

  /**
   * UI Helper: Show Premium Modal
   */
  function showModal(type, title, message) {
    // Remove existing modal if present
    const existing = document.getElementById('ccg-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'ccg-modal-overlay';
    overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 59, 92, 0.4); backdrop-filter: blur(8px);
            display: flex; align-items: center; justify-content: center;
            z-index: 9999; opacity: 0; transition: opacity 0.4s ease;
        `;

    const modal = document.createElement('div');
    modal.style.cssText = `
            background: white; width: 90%; max-width: 500px;
            padding: 3rem; border-radius: 2rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1);
            text-align: center; transform: translateY(20px); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        `;

    let iconHtml = '';
    let buttonHtml = '';

    if (type === 'loading') {
      iconHtml = `
            <div style="width: 80px; height: 80px; background: #0096A115; color: #0096A1; border-radius: 2rem; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center;">
                <svg class="animate-spin" style="width: 40px; height: 40px;" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        `;
      buttonHtml = ''; // No button for loading
    } else {
      const isSuccess = type === 'success';
      const iconColor = isSuccess ? '#0096A1' : '#EF4444';
      const iconSvg = isSuccess
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';

      iconHtml = `
            <div style="width: 80px; height: 80px; background: ${iconColor}15; color: ${iconColor}; border-radius: 2rem; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 40px; height: 40px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">${iconSvg}</svg>
            </div>
        `;
      buttonHtml = `
            <button id="ccg-modal-close" style="background: #003B5C; color: white; border: none; padding: 1rem 2.5rem; border-radius: 100px; font-weight: 700; font-size: 0.875rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 10px 15px -3px rgba(0, 59, 92, 0.2);">
                Dismiss
            </button>
        `;
    }

    modal.innerHTML = `
            ${iconHtml}
            <h2 style="color: #003B5C; font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem;">${title}</h2>
            <p style="color: #64748B; font-size: 1rem; line-height: 1.6; margin-bottom: 2.5rem;">${message}</p>
            ${buttonHtml}
        `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      modal.style.transform = 'translateY(0)';
    });

    // Close logic (only for non-loading)
    if (type !== 'loading') {
      const close = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'translateY(20px)';
        setTimeout(() => {
          overlay.remove();
          if (type === 'success') {
            window.location.reload();
          }
        }, 400);
      };

      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      const closeBtn = document.getElementById('ccg-modal-close');
      if (closeBtn) closeBtn.addEventListener('click', close);
    }
  }

  /**
   * Global Event Listener: Intercept ALL Form Submissions
   */
  document.addEventListener('submit', async function (e) {
    const form = e.target;
    const formType = form.getAttribute('data-ccg-form');

    console.log(`CCG Form Engine: Detected submit on form with data-ccg-form="${formType}"`);

    // If it's a CCG form, we MUST prevent default behavior immediately
    if (formType && CONFIG[formType]) {
      console.log(`CCG Form Engine: Intercepted ${formType}. Blocking native redirect.`);

      // Industrial-strength event blocking
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const config = CONFIG[formType];
      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.btn');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

      try {
        console.log(`CCG Form Engine: Starting submission for ${formType}...`);

        // UI: Processing Modal
        showModal('loading', 'Processing Request', 'Please wait while we securely transmit your details...');

        // UI: Button State
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <svg class="animate-spin" style="width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Processing...</span>
                        </div>
                    `;
        }

        // Data Collection & Sanitisation
        const fields = {};
        const checkboxGroups = {};

        console.log("CCG Form Engine: Collecting fields...");
        for (const element of form.elements) {
          if (!element.name) continue;

          // Skip internal/redundant keys
          if (element.name === 'Source' || element.name === 'form-name' || element.name === '_redirect') continue;

          if (element.type === 'checkbox') {
            const group = form.querySelectorAll(`input[name="${element.name}"][type="checkbox"]`);
            if (group.length > 1) {
              if (!checkboxGroups[element.name]) checkboxGroups[element.name] = [];
              if (element.checked) checkboxGroups[element.name].push(element.value);
            } else {
              fields[element.name] = element.checked;
            }
          } else if (element.type === 'radio') {
            if (element.checked) fields[element.name] = element.value;
          } else if (element.type !== 'submit' && element.type !== 'button' && element.type !== 'file') {
            fields[element.name] = element.value;
          }
        }

        for (const [name, values] of Object.entries(checkboxGroups)) {
          fields[name] = values.join(', ');
        }

        // File Processing (Base64)
        let attachments = [];
        const fileInput = form.querySelector('input[type="file"]');
        if (fileInput && fileInput.files.length > 0) {
          console.log(`CCG Form Engine: Processing ${fileInput.files.length} files...`);

          const processFiles = Array.from(fileInput.files).map((file, index) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                let finalName = file.name;

                // Specific Logic for Medical Referral Attachments
                if (formType === 'make-a-referral') {
                  const referrerName = (fields['Title'] || 'Referrer').replace(/[^a-z0-9]/gi, '_');
                  const dateToday = new Date().toISOString().split('T')[0].replace(/-/g, '');
                  const ext = file.name.split('.').pop();
                  finalName = `${referrerName}_${dateToday}_${index + 1}.${ext}`;
                }

                resolve({
                  name: finalName,
                  content: event.target.result.split(',')[1] // Just the B64 string
                });
              };
              reader.readAsDataURL(file);
            });
          });

          attachments = await Promise.all(processFiles);

          // Map attachment names to specific field for Referral
          if (formType === 'make-a-referral') {
            fields['ref_attachement'] = attachments.map(a => a.name).join('; ');
          }
        }

        const url = getBaseUrl() + config.endpoint;
        console.log(`CCG Form Engine: Posting to ${url}`);
        console.log(`CCG Form Engine: Payload:`, { fields, attachmentCount: attachments.length });

        // API Request
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields, attachments })
        });

        console.log(`CCG Form Engine: Server response status: ${response.status}`);

        if (response.ok) {
          console.log("CCG Form Engine: Submission successful.");
          showModal('success', 'Submission Successful', config.successMessage);
          form.reset();
        } else {
          const errorDetails = await response.text();
          console.error("CCG Form Engine: Submission failed:", errorDetails);
          throw new Error(`Server responded with ${response.status}: ${errorDetails}`);
        }

      } catch (err) {
        console.error("CCG Form Engine Error:", err);
        showModal('error', 'Submission Failed', 'We encountered an error while processing your request. Please try again or contact us directly at 1300 591 861.');
      } finally {
        // Reset UI State
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }

      return false; // Final block
    }
  }, true); // Use capture phase for maximum interception priority

  console.log("CCG Form Engine: Active.");
})();
