const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function getToken() {
    return localStorage.getItem("adminToken") || "";
}

function setToken(token) {
    if (token) localStorage.setItem("adminToken", token);
    else localStorage.removeItem("adminToken");
}

async function safeJson(res) {
    try {
        return await res.json();
    } catch {
        return null;
    }
}

async function request(path, { method = "GET", body } = {}) {
    const headers = {
        "Content-Type": "application/json",
    };

    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (res.ok) {
        return await safeJson(res);
    }

    const data = await safeJson(res);
    const message = data?.error || `HTTP_${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
}

export async function adminLogin({ username, password }) {
    const res = await request("/api/accounts/login", {
        method: "POST",
        body: { username, password },
    });

    if (!res?.token) {
        throw new Error("LOGIN_FAILED");
    }

    // Backward compatible: older backend may not return `role`.
    if (res?.role && res?.role !== "admin") {
        throw new Error("FORBIDDEN");
    }

    setToken(res.token);
    return res;
}

export function adminLogout() {
    setToken("");
}

export function isAdminLoggedIn() {
    return Boolean(getToken());
}

export async function listCustomers() {
    return await request("/api/admin/customers");
}

export async function createCustomer(payload) {
    return await request("/api/admin/customers", {
        method: "POST",
        body: payload,
    });
}

export async function updateCustomer(id, payload) {
    return await request(`/api/admin/customers/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: payload,
    });
}

export async function deleteCustomer(id) {
    return await request(`/api/admin/customers/${encodeURIComponent(id)}`, {
        method: "DELETE",
    });
}

export async function getVoucherFormat() {
    return await request("/api/admin/voucher-format");
}

export async function updateVoucherFormat(format) {
    return await request("/api/admin/voucher-format", {
        method: "PUT",
        body: { format },
    });
}

export async function listAccounts() {
    return await request("/api/admin/accounts");
}

export async function createAccount(payload) {
    return await request("/api/admin/accounts", {
        method: "POST",
        body: payload,
    });
}

export async function updateAccount(id, payload) {
    return await request(`/api/admin/accounts/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: payload,
    });
}

export async function deleteAccount(id) {
    return await request(`/api/admin/accounts/${encodeURIComponent(id)}`, {
        method: "DELETE",
    });
}
