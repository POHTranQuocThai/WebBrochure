import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  Space,
  Switch,
  Table,
  Typography,
  message,
} from "antd";

import {
  isStaffLoggedIn,
  listStaffCustomers,
  setVoucherUsed,
  staffLogin,
  staffLogout,
} from "../api/staff";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

type StaffPageProps = {
  embedded?: boolean;
  onLogout?: () => void;
};

type CustomerRow = {
  _id: string;
  name?: string;
  phone?: string;
  voucher?: string;
  voucherUsed?: boolean;
};

function normalizePhone(value: unknown) {
  return String(value || "").replace(/\D/g, "");
}

export default function StaffPage({ embedded = false, onLogout }: StaffPageProps) {
  const screens = useBreakpoint();
  const [loggedIn, setLoggedIn] = useState(isStaffLoggedIn());
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [query, setQuery] = useState("");

  const [loginForm] = Form.useForm();

  async function refresh() {
    setLoading(true);
    try {
      const data = await listStaffCustomers();
      setCustomers(Array.isArray(data) ? (data as CustomerRow[]) : []);
    } catch (err: any) {
      if (err?.status === 401) {
        staffLogout();
        setLoggedIn(false);
        if (onLogout) onLogout();
      }
      message.error("Không tải được danh sách khách hàng");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loggedIn) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const filteredCustomers = useMemo(() => {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return customers;

    const qPhone = normalizePhone(q);

    return customers.filter((c) => {
      const name = String(c?.name || "").toLowerCase();
      const voucher = String(c?.voucher || "").toLowerCase();
      const phone = normalizePhone(c?.phone || "");

      if (name.includes(q)) return true;
      if (voucher.includes(q)) return true;
      if (qPhone && phone.includes(qPhone)) return true;
      return false;
    });
  }, [customers, query]);

  const columns = useMemo(
    () => [
      { title: "Tên", dataIndex: "name", key: "name" },
      { title: "SĐT", dataIndex: "phone", key: "phone" },
      { title: "Voucher", dataIndex: "voucher", key: "voucher" },
      {
        title: "Trạng thái",
        key: "voucherUsed",
        render: (_: any, record: CustomerRow) => (
          <Space>
            <Text type={record?.voucherUsed ? undefined : "secondary"}>
              {record?.voucherUsed ? "Đã sử dụng" : "Chưa sử dụng"}
            </Text>
            <Switch
              checked={Boolean(record?.voucherUsed)}
              checkedChildren="Đã dùng"
              unCheckedChildren="Chưa"
              disabled={Boolean(record?.voucherUsed)}
              onChange={async (checked) => {
                if (!checked) {
                  message.info("Không thể gạt ngược lại");
                  return;
                }
                setLoading(true);
                try {
                  await setVoucherUsed(record._id, checked);
                  message.success("Đã cập nhật trạng thái");
                  await refresh();
                } catch (err: any) {
                  if (err?.status === 401) {
                    staffLogout();
                    setLoggedIn(false);
                    if (onLogout) onLogout();
                    message.error("Phiên đăng nhập hết hạn");
                  } else if (err?.status === 409) {
                    message.warning("Voucher đã được sử dụng");
                  } else if (err?.status === 403) {
                    message.error("Không có quyền");
                  } else {
                    message.error("Cập nhật thất bại");
                  }
                } finally {
                  setLoading(false);
                }
              }}
            />
          </Space>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refresh]
  );

  async function onLogin(values: any) {
    setLoading(true);
    try {
      await staffLogin(values);
      message.success("Đăng nhập thành công");
      setLoggedIn(true);
    } catch (err: any) {
      const msg = String(err?.message || "");
      if (msg.toUpperCase() === "FORBIDDEN") {
        message.error("Tài khoản không có quyền staff");
      } else if (msg.toLowerCase().includes("invalid credentials")) {
        message.error("Sai tài khoản hoặc mật khẩu");
      } else {
        message.error("Sai tài khoản hoặc mật khẩu");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!loggedIn) {
    if (embedded) return null;
    return (
      <div style={{ maxWidth: 420, margin: "24px auto", padding: 16 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Staff Login
        </Title>
        <Text type="secondary">Đăng nhập để xem danh sách voucher</Text>
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
    <div
      style={{
        maxWidth: 1000,
        margin: embedded ? 0 : "24px auto",
        padding: embedded ? 0 : 16,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Staff: Danh sách Customer
        </Title>

        {!embedded && (
          <div style={{ width: screens.sm ? "auto" : "100%" }}>
            <Button
              block={!screens.sm}
              onClick={() => {
                staffLogout();
                setLoggedIn(false);
                if (onLogout) onLogout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>

      <div style={{ height: 16 }} />

      <Input
        placeholder="Search theo tên / SĐT / voucher"
        allowClear
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div style={{ height: 12 }} />

      <Table
        rowKey={(r: any) => r._id}
        loading={loading}
        columns={columns as any}
        dataSource={filteredCustomers}
        scroll={{ x: 650 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
