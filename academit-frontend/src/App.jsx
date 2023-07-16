import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import VideoUploader from "./components/videos/videoUploader";
//TODO: los componentes stateless

const Home = () => <h2>Home</h2>;
const Nav1 = () => <h2>Nav 1</h2>;
const Nav2 = () => <h2>Nav 2</h2>;
const Nav3 = () => <h2>Nav 3</h2>;

const layoutStyle = {
  minHeight: "100vh", // Establecer la altura mínima para ocupar toda la pantalla
  width: "100%", // Establecer el ancho para ocupar toda la pantalla
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={layoutStyle}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to="/">nav 1</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to="/nav1">nav 2</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <Link to="/nav2">nav 3</Link>,
              },
              {
                key: "4",
                icon: <VideoCameraOutlined />,
                label: <Link to="/nav3">Cargar Videos</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {/* TODO: la navegacion esta construida con la ultioma version de react Router*/}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nav1" element={<Nav1 />} />
              <Route path="/nav2" element={<Nav2 />} />
              <Route path="/nav3" element={<VideoUploader />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
