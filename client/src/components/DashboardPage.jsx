import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tabs,
  Table,
  Typography,
  message,
} from "antd";

import { createAccount, deleteAccount, listAccounts, updateAccount } from "../api/admin";

import AdminPage from "./AdminPage";
import StaffPage from "./StaffPage.tsx";

const { Title, Text } = Typography;

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function safeJson(res) {
  return res
    .json()
    .catch(() => null);
}

function decodeJwtPayload(token) {
  try {
    const parts = String(token || "").split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "===".slice((base64.length + 3) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getStoredRole() {
  return localStorage.getItem("dashboardRole") || "";
}

function setStoredRole(role) {
  if (role) localStorage.setItem("dashboardRole", role);
  else localStorage.removeItem("dashboardRole");
}

function getRoleFromStorage() {
  const adminToken = localStorage.getItem("adminToken") || "";
  const staffToken = localStorage.getItem("staffToken") || "";

  if (adminToken) return "admin";
  if (staffToken) return "staff";
  return "";
}

function clearAllTokens() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("staffToken");
  setStoredRole("");
}

async function loginRequest({ username, password }) {
  const res = await fetch(`${API_BASE_URL}/api/accounts/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await safeJson(res);

  if (!res.ok) {
    const err = new Error(data?.error || `HTTP_${res.status}`);
    err.status = res.status;
    throw err;
  }

  return data;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(() => getRoleFromStorage() || getStoredRole());

  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [loginForm] = Form.useForm();
  const [accountForm] = Form.useForm();

  const loggedIn = useMemo(() => {
    if (role === "admin") return Boolean(localStorage.getItem("adminToken"));
    if (role === "staff") return Boolean(localStorage.getItem("staffToken"));
    // fallback
    return Boolean(localStorage.getItem("adminToken") || localStorage.getItem("staffToken"));
  }, [role]);

  useEffect(() => {
    // if tokens cleared elsewhere, sync state
    const current = getRoleFromStorage() || getStoredRole();
    if (current && current !== role) setRole(current);
    if (!current && role) setRole("");
  }, [role]);

  function handleLogout() {
    clearAllTokens();
    setRole("");
  }

  async function refreshAccounts() {
    setAccountsLoading(true);
    try {
      const data = await listAccounts();
      setAccounts(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err?.status === 401) {
        handleLogout();
        message.error("Phiên đăng nhập hết hạn");
      } else if (err?.status === 403) {
        message.error("Không có quyền");
      } else {
        message.error("Không tải được danh sách account");
      }
    } finally {
      setAccountsLoading(false);
    }
  }

  async function onLogin(values) {
    setLoading(true);
    try {
      const data = await loginRequest(values);
      const token = data?.token;
      if (!token) throw new Error("LOGIN_FAILED");

      const payload = decodeJwtPayload(token);
      const resolvedRole = String(data?.role || payload?.role || "").toLowerCase();
      const normalizedRole = resolvedRole === "admin" ? "admin" : "staff";

      // ensure only one token type is present
      if (normalizedRole === "admin") {
        localStorage.setItem("adminToken", token);
        localStorage.removeItem("staffToken");
      } else {
        localStorage.setItem("staffToken", token);
        localStorage.removeItem("adminToken");
      }

      setStoredRole(normalizedRole);
      setRole(normalizedRole);
      message.success("Đăng nhập thành công");

      if (normalizedRole === "admin") {
        await refreshAccounts();
      }
    } catch (err) {
      const msg = String(err?.message || "");
      if (msg.toLowerCase().includes("invalid credentials")) {
        message.error("Sai tài khoản hoặc mật khẩu");
      } else {
        message.error("Đăng nhập thất bại");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (role === "admin" && Boolean(localStorage.getItem("adminToken"))) {
      refreshAccounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 420, margin: "24px auto", padding: 16 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Dashboard Login
        </Title>
        <Text type="secondary">Đăng nhập để quản lí theo quyền (admin/staff)</Text>
        <div style={{ height: 16 }} />
        <Form form={loginForm} layout="vertical" onFinish={onLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Nhập username" }]}
          >
            <Input autoComplete="username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Nhập password" }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng nhập
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: 16 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            Dashboard
          </Title>
          <Text type="secondary">Role: {role || "(unknown)"}</Text>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </Space>

      <div style={{ height: 16 }} />

      {role === "admin" ? (
        <>
          <Tabs
            items={[
              {
                key: "customers",
                label: "Quản lí Customer",
                children: <AdminPage embedded onLogout={handleLogout} />,
              },
              {
                key: "accounts",
                label: "Quản lí Account",
                children: (
                  <>
                    <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
                      <Title level={4} style={{ margin: 0 }}>
                        Quản lí Account
                      </Title>
                      <Button
                        type="primary"
                        onClick={() => {
                          setEditingAccount(null);
                          accountForm.resetFields();
                          accountForm.setFieldsValue({ role: "staff" });
                          setAccountModalOpen(true);
                        }}
                      >
                        Thêm account
                      </Button>
                    </Space>

                    <div style={{ height: 12 }} />

                    <Table
                      rowKey={(r) => r.id}
                      loading={accountsLoading}
                      dataSource={accounts}
                      pagination={{ pageSize: 10 }}
                      scroll={{ x: 650 }}
                      columns={[
                        { title: "Username", dataIndex: "username", key: "username" },
                        { title: "Role", dataIndex: "role", key: "role" },
                        {
                          title: "Hành động",
                          key: "actions",
                          render: (_, record) => (
                            <Space>
                              <Button
                                size="small"
                                onClick={() => {
                                  setEditingAccount(record);
                                  accountForm.setFieldsValue({
                                    username: record.username,
                                    role: record.role,
                                    password: "",
                                  });
                                  setAccountModalOpen(true);
                                }}
                              >
                                Sửa
                              </Button>
                              <Popconfirm
                                title="Xoá account?"
                                okText="Xoá"
                                cancelText="Huỷ"
                                onConfirm={async () => {
                                  setAccountsLoading(true);
                                  try {
                                    await deleteAccount(record.id);
                                    message.success("Đã xoá");
                                    await refreshAccounts();
                                  } catch (err) {
                                    const msg = String(err?.message || "").toLowerCase();
                                    if (err?.status === 409 && msg.includes("last admin")) {
                                      message.error("Không thể xoá admin cuối cùng");
                                    } else if (err?.status === 409 && msg.includes("self")) {
                                      message.error("Không thể xoá tài khoản đang đăng nhập");
                                    } else if (err?.status === 401) {
                                      handleLogout();
                                      message.error("Phiên đăng nhập hết hạn");
                                    } else {
                                      message.error("Xoá thất bại");
                                    }
                                  } finally {
                                    setAccountsLoading(false);
                                  }
                                }}
                              >
                                <Button danger size="small">
                                  Xoá
                                </Button>
                              </Popconfirm>
                            </Space>
                          ),
                        },
                      ]}
                    />

                    <Modal
                      title={editingAccount ? "Sửa account" : "Thêm account"}
                      open={accountModalOpen}
                      onCancel={() => {
                        setAccountModalOpen(false);
                        setEditingAccount(null);
                        accountForm.resetFields();
                      }}
                      okText="Lưu"
                      cancelText="Huỷ"
                      confirmLoading={accountsLoading}
                      onOk={() => accountForm.submit()}
                    >
                      <Form
                        form={accountForm}
                        layout="vertical"
                        onFinish={async (values) => {
                          const payload = {
                            username: String(values.username || "").trim(),
                            password: String(values.password || "").trim(),
                            role: values.role,
                          };

                          setAccountsLoading(true);
                          try {
                            if (editingAccount?.id) {
                              const updatePayload = {
                                role: payload.role,
                              };
                              if (payload.password) updatePayload.password = payload.password;
                              await updateAccount(editingAccount.id, updatePayload);
                              message.success("Đã cập nhật");
                            } else {
                              await createAccount(payload);
                              message.success("Đã tạo account");
                            }

                            setAccountModalOpen(false);
                            setEditingAccount(null);
                            accountForm.resetFields();
                            await refreshAccounts();
                          } catch (err) {
                            const msg = String(err?.message || "").toLowerCase();
                            if (err?.status === 409 && msg.includes("username")) {
                              message.error("Username đã tồn tại");
                            } else if (err?.status === 409 && msg.includes("last admin")) {
                              message.error("Không thể bỏ quyền admin của admin cuối cùng");
                            } else if (err?.status === 401) {
                              handleLogout();
                              message.error("Phiên đăng nhập hết hạn");
                            } else if (err?.status === 403) {
                              message.error("Không có quyền");
                            } else {
                              message.error("Lưu thất bại");
                            }
                          } finally {
                            setAccountsLoading(false);
                          }
                        }}
                      >
                        <Form.Item
                          label="Username"
                          name="username"
                          rules={[{ required: true, message: "Nhập username" }]}
                        >
                          <Input disabled={Boolean(editingAccount)} autoComplete="username" />
                        </Form.Item>

                        <Form.Item
                          label={editingAccount ? "Password mới (bỏ trống nếu không đổi)" : "Password"}
                          name="password"
                          rules={editingAccount ? [] : [{ required: true, message: "Nhập password" }]}
                        >
                          <Input.Password
                            autoComplete={editingAccount ? "new-password" : "current-password"}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Role"
                          name="role"
                          rules={[{ required: true, message: "Chọn role" }]}
                        >
                          <Select
                            options={[
                              { label: "Staff", value: "staff" },
                              { label: "Admin", value: "admin" },
                            ]}
                          />
                        </Form.Item>
                      </Form>
                    </Modal>
                  </>
                ),
              },
            ]}
          />
        </>
      ) : (
        <Tabs
          items={[
            {
              key: "customers",
              label: "Danh sách Customer",
              children: <StaffPage embedded onLogout={handleLogout} />,
            },
          ]}
        />
      )}
    </div>
  );
}
