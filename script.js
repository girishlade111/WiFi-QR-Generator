import { buildWifiPayload, validateWifiInputs } from './lib/wifi-qr.js';

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

// Map error correction level letters to qrcode-generator constants
const EC_LEVELS = { L: 'L', M: 'M', Q: 'Q', H: 'H' };

/**
 * Update the status message in the UI.
 */
function setStatus(message, isError = false) {
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.dataset.state = isError ? 'error' : 'info';
    }
}

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

/**
 * Create a QR code model using the qrcode-generator library.
 * Auto-selects the smallest type number that fits the data.
 */
function createQR(payload, errorLevel) {
    const ecl = EC_LEVELS[errorLevel] || 'M';
    // typeNumber 0 = auto-detect
    const qr = qrcode(0, ecl);
    qr.addData(payload);
    qr.make();
    return qr;
}

/**
 * Render QR code onto a canvas and return the data URL.
 */
function renderPng(payload, size, errorLevel) {
    if (!qrCodeContainer) return Promise.reject(new Error('QR container not found'));

    try {
        const qr = createQR(payload, errorLevel);
        const moduleCount = qr.getModuleCount();
        const cellSize = size / moduleCount;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // Draw modules
        ctx.fillStyle = '#000000';
        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (qr.isDark(row, col)) {
                    ctx.fillRect(
                        Math.round(col * cellSize),
                        Math.round(row * cellSize),
                        Math.ceil(cellSize),
                        Math.ceil(cellSize)
                    );
                }
            }
        }

        qrCodeContainer.innerHTML = '';
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
        qrCodeContainer.appendChild(canvas);

        return Promise.resolve(canvas.toDataURL('image/png'));
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Render QR code as SVG and return a blob URL for download.
 */
function renderSvg(payload, size, errorLevel) {
    if (!qrCodeContainer) return Promise.reject(new Error('QR container not found'));

    try {
        const qr = createQR(payload, errorLevel);
        const moduleCount = qr.getModuleCount();
        const cellSize = size / moduleCount;

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
        svg += `<rect width="${size}" height="${size}" fill="#ffffff"/>`;

        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (qr.isDark(row, col)) {
                    const x = Math.round(col * cellSize);
                    const y = Math.round(row * cellSize);
                    const s = Math.ceil(cellSize);
                    svg += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#000000"/>`;
                }
            }
        }

        svg += '</svg>';

        qrCodeContainer.innerHTML = svg;
        const svgEl = qrCodeContainer.querySelector('svg');
        if (svgEl) {
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
        }

        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        return Promise.resolve(url);
    } catch (error) {
        return Promise.reject(error);
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

// Only initialize listeners if the form exists
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
} else {
    console.log('Wi-Fi form not found. Generator logic skipped for this page.');
}

// Export functions for potential external use
window.clearapp = clearapp;
window.generateQR = () => {
    if (form) form.dispatchEvent(new Event('submit'));
    else console.warn('Cannot generate QR: Form not found.');
};
