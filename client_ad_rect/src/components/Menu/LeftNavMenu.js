import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, TeamOutlined, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, KeyOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';

import { NavLink, useLocation, withRouter } from 'react-router-dom';

const { Sider } = Layout;


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
    setNavItem(<NavLink to="/">Home</NavLink>, "/", <HomeOutlined />),
    { type: 'divider' },
    setNavItem("Employee", "Employee", <UserOutlined />, [
        setNavItem(<NavLink to="/ListEmployeesNP">No Pagination</NavLink>, "/ListEmployeesNP"),
        setNavItem(<NavLink to="/ListEmployeesCP">Client Pagination</NavLink>, "/ListEmployeesCP"),
        setNavItem(<NavLink to="/ListEmployeesSP">Server Pagination</NavLink>, "/ListEmployeesSP"),
    ]),
    setNavItem("Laptop", "Laptop", <LaptopOutlined />),
    setNavItem("JWT", "JWT", <KeyOutlined />, [
        setNavItem(<NavLink to="/JwtLogin">取得 token</NavLink>, "/JwtLogin"),
        setNavItem(<NavLink to="/VerifyJwtToken">驗證 token</NavLink>, "/VerifyJwtToken"),
    ]),
]

const LeftNavMenu = (props) => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return (
        <Sider
            width={200}
            style={{
                background: colorBgContainer,
                overflow: 'auto',
                height: '89vh',
            }}
            trigger={null}
            collapsible collapsed={props.collapsed}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={['/ListEmployeesCP']}
                defaultOpenKeys={['Employee']}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={NavItems}
            />
        </Sider>

    );
}

export default LeftNavMenu;