// Import QRCode library from CDN as ES module
import * as QRCodeModule from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm';
import { buildWifiPayload, validateWifiInputs } from './lib/wifi-qr.js';

// Robust QRCode object access
const QRCode = QRCodeModule.default || QRCodeModule;

const form = document.getElementById('wifi-form');
const ssidInput = document.getElementById('ssid');
const passwordInput = document.getElementById('password');
const authSelect = document.getElementById('auth');
const hiddenCheckbox = document.getElementById('hidden');
const sizeInput = document.getElementById('size');
const sizeValue = document.getElementById('size-value');
const errorSelect = document.getElementById('error');
const formatSelect = document.getElementById('format');
const qrCodeContainer = document.getElementById('qrcode');
const downloadLink = document.getElementById('download-link');
const statusEl = document.getElementById('status');
const copyButton = document.getElementById('copy');
const clearButton = document.getElementById('clearapp');
const togglePassword = document.getElementById('toggle-password');

const state = {
    payload: '',
    objectUrl: null
};

/**
 * Update the status message in the UI.
 * Handles cases where statusEl might be missing.
 */
function setStatus(message, isError = false) {
    console.log(`[STATUS] ${isError ? 'ERROR: ' : ''}${message}`);
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.dataset.state = isError ? 'error' : 'info';
    }
}

/**
 * Catch global errors and display them in the status area to aid debugging.
 */
window.addEventListener('error', (event) => {
    setStatus(`App Error: ${event.message}`, true);
});

function revokeObjectUrl() {
    if (state.objectUrl) {
        URL.revokeObjectURL(state.objectUrl);
        state.objectUrl = null;
    }
}

function clearPreview() {
    if (qrCodeContainer) qrCodeContainer.innerHTML = '';
    revokeObjectUrl();
    if (downloadLink) {
        downloadLink.style.display = 'none';
        downloadLink.removeAttribute('href');
        downloadLink.removeAttribute('download');
    }
}

function updateSizeLabel() {
    if (sizeValue && sizeInput) {
        sizeValue.textContent = `${sizeInput.value} px`;
    }
}

function updatePasswordState() {
    if (!authSelect || !passwordInput) return;
    const authType = authSelect.value;
    const requiresPassword = authType !== 'nopass';
    passwordInput.disabled = !requiresPassword;
    passwordInput.required = requiresPassword;
    if (!requiresPassword) {
        passwordInput.value = '';
    }
}

async function renderPng(payload, size, errorLevel) {
    if (!qrCodeContainer) return;
    try {
        const dataUrl = await QRCode.toDataURL(payload, {
            width: size,
            errorCorrectionLevel: errorLevel,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });
        
        const img = document.createElement('img');
        img.src = dataUrl;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        qrCodeContainer.appendChild(img);
        
        return dataUrl;
    } catch (error) {
        throw error;
    }
}

async function renderSvg(payload, size, errorLevel) {
    if (!qrCodeContainer) return;
    try {
        const svgString = await QRCode.toString(payload, {
            type: 'svg',
            width: size,
            errorCorrectionLevel: errorLevel,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });
        
        qrCodeContainer.innerHTML = svgString;
        
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        return url;
    } catch (error) {
        throw error;
    }
}

async function copyPayload() {
    if (!state.payload) {
        setStatus('Generate a QR code first to copy the payload.', true);
        return;
    }

    try {
        await navigator.clipboard.writeText(state.payload);
        setStatus('Payload copied to clipboard.');
    } catch (error) {
        const fallback = document.createElement('textarea');
        fallback.value = state.payload;
        fallback.setAttribute('readonly', '');
        fallback.style.position = 'absolute';
        fallback.style.left = '-9999px';
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand('copy');
        fallback.remove();
        setStatus('Payload copied to clipboard.');
    }
}

function clearapp() {
    if (form) form.reset();
    updateSizeLabel();
    updatePasswordState();
    if (togglePassword) togglePassword.textContent = 'Show';
    if (passwordInput) passwordInput.type = 'password';
    state.payload = '';
    clearPreview();
    setStatus('Enter your Wi-Fi details to generate a QR code.');
}

// Only initialize listeners if the form exists (prevents crashes on other pages)
if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const ssid = ssidInput.value.trim();
        const password = passwordInput.value;
        const authType = authSelect.value;
        const hidden = hiddenCheckbox.checked;

        const validation = validateWifiInputs({ ssid, password, authType });
        if (!validation.ok) {
            setStatus(validation.message, true);
            return;
        }

        const payload = buildWifiPayload({ ssid, password, authType, hidden });
        state.payload = payload;
        clearPreview();

        const size = Number(sizeInput.value);
        const errorLevel = errorSelect.value;
        const format = formatSelect.value;

        try {
            setStatus('Generating QR code...');
            
            const url = format === 'svg'
                ? await renderSvg(payload, size, errorLevel)
                : await renderPng(payload, size, errorLevel);

            if (downloadLink) {
                if (format === 'svg') {
                    revokeObjectUrl();
                    state.objectUrl = url;
                    downloadLink.href = url;
                } else {
                    downloadLink.href = url;
                }
                downloadLink.download = `wifi-qr.${format}`;
                downloadLink.style.display = 'inline-flex';
            }
            setStatus('QR code ready. Scan or download the file.');
        } catch (error) {
            console.error('Error generating QR code:', error);
            setStatus('Unable to generate QR code: ' + error.message, true);
        }
    });

    if (sizeInput) sizeInput.addEventListener('input', updateSizeLabel);
    if (authSelect) authSelect.addEventListener('change', updatePasswordState);
    if (copyButton) copyButton.addEventListener('click', copyPayload);
    if (clearButton) clearButton.addEventListener('click', clearapp);

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            togglePassword.textContent = isHidden ? 'Hide' : 'Show';
        });
    }

    // Initialize UI
    updateSizeLabel();
    updatePasswordState();
    console.log('Wi-Fi QR Generator script initialized successfully.');
} else {
    console.log('Wi-Fi form not found. Generator logic skipped for this page.');
}

// Export functions for potential external use (like console)
window.clearapp = clearapp;
window.generateQR = () => {
    if (form) form.dispatchEvent(new Event('submit'));
    else console.warn('Cannot generate QR: Form not found.');
};
