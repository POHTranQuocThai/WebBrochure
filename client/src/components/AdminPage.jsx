import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from "antd";

import {
  adminLogin,
  adminLogout,
  createCustomer,
  deleteCustomer,
  getVoucherFormat,
  isAdminLoggedIn,
  listCustomers,
  updateVoucherFormat,
  updateCustomer,
} from "../api/admin";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "");
}

export default function AdminPage() {
  const screens = useBreakpoint();
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [voucherFormat, setVoucherFormat] = useState("VOUCHER");

  const [loginForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function refresh() {
    setLoading(true);
    try {
      const data = await listCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err?.status === 401) {
        adminLogout();
        setLoggedIn(false);
      }
      message.error("Không tải được danh sách khách hàng");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      refresh();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) return;

    (async () => {
      try {
        const data = await getVoucherFormat();
        if (data?.format) setVoucherFormat(String(data.format));
      } catch {
        // ignore
      }
    })();
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
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "SĐT",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Voucher",
        dataIndex: "voucher",
        key: "voucher",
      },
      {
        title: "Hành động",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button
              size="small"
              onClick={() => {
                setEditing(record);
                editForm.setFieldsValue({
                  name: record.name,
                  phone: record.phone,
                  voucher: record.voucher,
                });
                setModalOpen(true);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Xoá khách hàng?"
              okText="Xoá"
              cancelText="Huỷ"
              onConfirm={async () => {
                try {
                  await deleteCustomer(record._id);
                  message.success("Đã xoá");
                  await refresh();
                } catch (err) {
                  message.error("Xoá thất bại");
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
    ],
    [editForm]
  );

  async function onLogin(values) {
    setLoading(true);
    try {
      await adminLogin(values);
      message.success("Đăng nhập thành công");
      setLoggedIn(true);
    } catch (err) {
      message.error("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  }

  async function onSave(values) {
    const payload = {
      name: values.name?.trim(),
      phone: normalizePhone(values.phone),
    };

    if (editing?._id) {
      payload.voucher = values.voucher?.trim();
    }

    setLoading(true);
    try {
      if (editing?._id) {
        await updateCustomer(editing._id, payload);
        message.success("Đã cập nhật");
      } else {
        await createCustomer(payload);
        message.success("Đã thêm mới");
      }
      setModalOpen(false);
      setEditing(null);
      editForm.resetFields();
      await refresh();
    } catch (err) {
      if (err?.status === 409) {
        const msg = String(err?.message || "").toLowerCase();
        if (msg.includes("name")) message.error("Tên đã tồn tại");
        else if (msg.includes("phone")) message.error("SĐT đã tồn tại");
        else if (msg.includes("voucher")) message.error("Voucher đã tồn tại");
        else message.error("Dữ liệu bị trùng");
      } else if (err?.status === 401) {
        adminLogout();
        setLoggedIn(false);
        message.error("Phiên đăng nhập hết hạn");
      } else {
        message.error("Lưu thất bại");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 420, margin: "24px auto", padding: 16 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Admin Login
        </Title>
        <Text type="secondary">Đăng nhập để quản lí khách hàng</Text>
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
          Quản lí Customer
        </Title>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            width: screens.sm ? "auto" : "100%",
          }}
        >
          <Button
            block={!screens.sm}
            onClick={() => {
              adminLogout();
              setLoggedIn(false);
            }}
          >
            Logout
          </Button>
          <Button
            type="primary"
            block={!screens.sm}
            onClick={() => {
              setEditing(null);
              editForm.resetFields();
              setModalOpen(true);
            }}
          >
            Thêm Customer
          </Button>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <Space style={{ width: "100%" }} wrap>
        <Input
          style={{ width: screens.sm ? 360 : "100%" }}
          placeholder="Voucher format (vd: VOUCHER-0000)"
          value={voucherFormat}
          onChange={(e) => setVoucherFormat(e.target.value)}
        />
        <Button
          block={!screens.sm}
          onClick={async () => {
            const fmt = String(voucherFormat || "").trim();
            if (!fmt) {
              message.error("Nhập voucher format");
              return;
            }
            setLoading(true);
            try {
              const res = await updateVoucherFormat(fmt);
              setVoucherFormat(res?.format || fmt);
              message.success("Đã lưu voucher format");
            } catch (err) {
              if (err?.status === 401) {
                adminLogout();
                setLoggedIn(false);
                message.error("Phiên đăng nhập hết hạn");
              } else {
                message.error("Lưu format thất bại");
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          Lưu format
        </Button>
      </Space>

      <div style={{ height: 12 }} />

      <Input
        placeholder="Search theo tên / SĐT / voucher"
        allowClear
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div style={{ height: 12 }} />

      <Table
        rowKey={(r) => r._id}
        loading={loading}
        columns={columns}
        dataSource={filteredCustomers}
        scroll={{ x: 650 }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editing ? "Sửa Customer" : "Thêm Customer"}
        open={modalOpen}
        width={screens.sm ? 520 : "100%"}
        style={screens.sm ? undefined : { top: 12 }}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
          editForm.resetFields();
        }}
        onOk={() => editForm.submit()}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form form={editForm} layout="vertical" onFinish={onSave}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[{ required: true, message: "Nhập số điện thoại" }]}
          >
            <Input inputMode="tel" />
          </Form.Item>
          <Form.Item
            label="Voucher"
            name="voucher"
            rules={editing ? [{ required: true, message: "Nhập mã voucher" }] : []}
          >
            <Input disabled={!editing} placeholder={editing ? undefined : "(tự sinh theo format)"} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
