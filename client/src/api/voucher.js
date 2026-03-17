const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

async function safeReadJson(res) {
    try {
        return await res.json();
    } catch {
        return null;
    }
}

/**
 * Fetch voucher by normalized phone (digits only).
 *
 * Returns:
 * - string: voucher code
 * - null: not found / not applied
 * Throws on network/server errors.
 */
export async function getVoucherByPhone(normalizedPhone) {
    if (!normalizedPhone) {
        throw new Error("PHONE_REQUIRED");
    }

    const res = await fetch(
        `${API_BASE_URL}/api/customers/by-phone/${encodeURIComponent(normalizedPhone)}/voucher`
    );

    if (res.ok) {
        const data = await safeReadJson(res);
        return data?.voucher ?? "";
    }

    if (res.status === 404) {
        return null;
    }

    const body = await safeReadJson(res);
    const message = body?.error || `HTTP_${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
}
