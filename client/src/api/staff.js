const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function getToken() {
  return localStorage.getItem("staffToken") || "";
}

function setToken(token) {
  if (token) localStorage.setItem("staffToken", token);
  else localStorage.removeItem("staffToken");
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

export async function staffLogin({ username, password }) {
  const res = await request("/api/accounts/login", {
    method: "POST",
    body: { username, password },
  });

  if (!res?.token) {
    throw new Error("LOGIN_FAILED");
  }

  // Backward compatible: older backend may not return `role`.
  if (res?.role && res?.role !== "staff" && res?.role !== "admin") {
    throw new Error("FORBIDDEN");
  }

  setToken(res.token);
  return res;
}

export function staffLogout() {
  setToken("");
}

export function isStaffLoggedIn() {
  return Boolean(getToken());
}

export async function listStaffCustomers() {
  return await request("/api/staff/customers");
}

export async function setVoucherUsed(id, voucherUsed) {
  return await request(`/api/staff/customers/${encodeURIComponent(id)}/voucher-used`, {
    method: "PATCH",
    body: { voucherUsed },
  });
}
