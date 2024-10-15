import React, { Component, useState, useEffect, useRef } from "react";
import { Navlink, useLocation, Link, Outlet } from "react-router-dom";
import { Space, Table, Tag } from 'antd';
import axios from "axios";

const ListEmployeesNP = () => {

    const employeeColumns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            render: (text) => <Link to="/ViewEmployee" onClick={() => { setEmployeeID(text); getscroll(); }}>{text}</Link>,
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'SN',
            dataIndex: 'SN',
            key: 'SN',
        },
        {
            title: 'EMail',
            dataIndex: 'EMail',
            key: 'EMail',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        }
    ];

    const [employeeDatas, setemployeeDatas] = useState(null);
    const [loading, setLoading] = useState(false);

    const setEmployeeID = (text) => {
        let id = text;
        sessionStorage.setItem('ID', id);
    }

    useEffect(() => {
        setLoading(true);
        sessionStorage.setItem('CurrentPageOfListEmployees', 1);

        axios.get('http://127.0.0.1:8800/test/getAllEmployees')
            .then((response) => {
                response.data.forEach(function (obj) {
                    obj.key = obj.ID;
                    obj.Action = "Update";
                })
                setemployeeDatas(response.data);
                setLoading(false);

            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        var scrollTop = sessionStorage.getItem("ListEmployeeNP_SPos");
        if (scrollTop != null) {
            //console.log("ListEmployeeNP_SPos:" + scrollTop);
            //console.log(employeeDatas);
            refParent.current.scrollTop = scrollTop;
        }

        if (employeeDatas != null) {
            sessionStorage.setItem("ListEmployeeNP_SPos", 0);
        }
    });

    const refParent = useRef();
    const refChild = useRef();
    const getscroll = () => {
        const scroll = Math.abs(refChild.current.getBoundingClientRect().top - refChild.current.offsetTop);
        sessionStorage.setItem("ListEmployeeNP_SPos", scroll);
        //console.log("getscroll:" + scroll);
    };

    return (
        <div ref={refParent}
            style={{
                overflow: 'auto',
                height: '85vh',
            }}>
            <Table ref={refChild}
                columns={employeeColumns}
                dataSource={employeeDatas}
                loading={loading}
                pagination={false}
            />
        </div>
    )

}

export default ListEmployeesNP;