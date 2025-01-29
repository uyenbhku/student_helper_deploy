import React, { useState, useEffect } from "react";
import { Button, Layout, Menu } from "antd";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { CloseOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

export const LayoutWrapper = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const checkWindowSize = () => {
    if (window.innerWidth > 599) {
      setMenuVisible(true)
      setMenuMode("horizontal");
    } else {
      setMenuMode("inline");
    }
  };

  const [menuMode, setMenuMode] = useState("horizontal");
  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [checkWindowSize]);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo on the left */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            reloadDocument
            to="/"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={"../../static/img/logo.svg"}
              alt="Logo"
              style={{ height: "40px" }}
            />{" "}
            {/* Adjust size as needed */}
          </Link>
        </div>
        {!menuVisible && (
          <Button
            icon={<MenuUnfoldOutlined />}
            onClick={() => setMenuVisible(true)}
          />
        )}
        {menuVisible && (
          <Menu
            theme="dark"
            mode={menuMode}
            selectedKeys={[currentPath]}
            style={
              menuMode == "inline"
                ? {
                    width: "70vw",
                    position: "absolute",
                    top: 10,
                    height: "100vh",
                    zIndex: 1000,
                    right: 0,
                  }
                : { width: "auto", flex: 1, justifyContent: "flex-end" }
            }
            items={[
              {
                key: "close",
                label: <CloseOutlined />,
                onClick: () => setMenuVisible(false),
                style: {
                  textAlign: "right",
                  display: menuMode === "inline" ? "block" : "none",
                },
              },
              {
                key: "/",
                label: (
                  <Link reloadDocument to="/">
                    Trang chủ
                  </Link>
                ),
              },
              {
                key: "/about",
                label: (
                  <Link reloadDocument to="/about">
                    Giới thiệu
                  </Link>
                ),
              },
              {
                key: "/contact",
                label: (
                  <Link reloadDocument to="/contact">
                    Liên hệ
                  </Link>
                ),
              },
            ]}
            onClick={() => setMenuVisible(false)}
          ></Menu>
        )}
      </Header>
      <Content style={{ padding: "20px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        App ©2025 Created with React Flask
      </Footer>
    </Layout>
  );
};
