import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, TeamOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';

import { NavLink, useLocation, withRouter } from 'react-router-dom';

const TopNavMenu = (props) => {
    

    return (
        <Menu theme="dark" mode="horizontal" style={{ marginLeft: 'auto', minWidth: '250px' }}>
            <Menu.Item key="/Login">
                <NavLink to="/Login">
                    <span>Login</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/Logout">
                <NavLink to="/Logout">
                    <span>Logout</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/About">
                <NavLink to="/About">
                    <span>About</span>
                </NavLink>
            </Menu.Item>
        </Menu>
    );
}

export default TopNavMenu;