import logo from './ReactSymbol.png';
import './App.css';

import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, TeamOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Space } from 'antd';
import { Col, Divider, Row } from 'antd';

import { NavLink, useLocation, withRouter, Link } from 'react-router-dom';
import RouteContent from './components/routeContent/routeContent';

import TopNavMenu from './components/Menu/TopNavMenu';
import LeftNavMenu from './components/Menu/LeftNavMenu';

const { Header, Content, Sider } = Layout;


function setNavItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const NavItems = [
  setNavItem("Employee", "Employee", <UserOutlined />, [
    setNavItem(<NavLink to="/">Home</NavLink>, "/"),
    setNavItem(<NavLink to="/ListEmployeesNP">No Pagination</NavLink>, "/ListEmployeesNP"),
    setNavItem(<NavLink to="/ListEmployeesCP">Client Pagination</NavLink>, "/ListEmployeesCP"),
    setNavItem(<NavLink to="/ListEmployeesSP">Server Pagination</NavLink>, "/ListEmployeesSP"),
  ]),
  setNavItem("Laptop", "Laptop", <LaptopOutlined />),
]

const App = () => {

  console.log("App");

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  console.log(new Date().toLocaleString() + " " + location.pathname);

  const MenuClick = (selectedKeys) => {
    console.log("MenuClick:" + selectedKeys);
  }

  return (
    <Layout style={{
      padding: '0 0 0 0',
    }}>

      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0',
          position: 'sticky',
          zIndex: 1,
          top: 0,
        }}
      >
        <div style={{ width: '40px' }}>
          <Button
            onClick={toggleCollapsed}
            style={{
              margin: 0,
              border: "none"
            }}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            ghost
          />
        </div>
        <div style={{ width: '160px' }}>
          <Link to='/'>
            <img src={logo} width="125px" height="70px" style={{ display: 'block', margin: 'auto', }} />
          </Link>
        </div>
        <TopNavMenu />

      </Header>

      <Layout>
        <LeftNavMenu collapsed={collapsed} />
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              
              height: '89vh',
            }}
          >
            <RouteContent />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
