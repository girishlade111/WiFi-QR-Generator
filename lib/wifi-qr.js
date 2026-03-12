const ESCAPE_PATTERN = /([\\;,:\"])/g;

export function escapeWifiValue(value) {
    return value.replace(ESCAPE_PATTERN, '\\$1');
}

export function buildWifiPayload({ ssid, password, authType, hidden }) {
    const escapedSsid = escapeWifiValue(ssid);
    const escapedPassword = escapeWifiValue(password || '');
    
    // Standard format: WIFI:S:<SSID>;T:<TYPE>;P:<PASSWORD>;H:<HIDDEN>;;
    // Note: T:nopass is not standard, use empty or omit for open networks.
    let payload = `WIFI:S:${escapedSsid};`;
    
    if (authType !== 'nopass') {
        payload += `T:${authType};`;
        payload += `P:${escapedPassword};`;
    }
    
    if (hidden) {
        payload += 'H:true;';
    }
    
    payload += ';';
    return payload;
}

export function validateWifiInputs({ ssid, password, authType }) {
    if (!ssid) {
        return { ok: false, message: 'SSID is required.' };
    }

    if (ssid.length > 32) {
        return { ok: false, message: 'SSID must be 32 characters or fewer.' };
    }

    if (authType === 'nopass') {
        return { ok: true, message: '' };
    }

    if (!password) {
        return { ok: false, message: 'Password is required for secured networks.' };
    }

    if (authType === 'WPA') {
        if (password.length < 8 || password.length > 63) {
            return { ok: false, message: 'WPA passwords must be 8 to 63 characters.' };
        }
    }

    if (authType === 'WEP') {
        const wepLengths = new Set([5, 13, 10, 26]);
        if (!wepLengths.has(password.length)) {
            return { ok: false, message: 'WEP passwords must be 5 or 13 ASCII chars, or 10 or 26 hex chars.' };
        }
    }

    return { ok: true, message: '' };
}
