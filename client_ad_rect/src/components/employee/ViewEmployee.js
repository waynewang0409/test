import React, { Component, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Space, Table, Tag, Button } from 'antd';
import axios from "axios";

const ViewEmployee = () => {
    const [id, setID] = useState(null);
    const [Name, setName] = useState(null);
    const [Page, setPage] = useState(null);

    useEffect(() => {
        setID(sessionStorage.getItem('ID'));
        setPage(sessionStorage.getItem('CurrentPageOfListEmployees'));
        axios.get('http://127.0.0.1:8800/test/getEmployee?id=' + sessionStorage.getItem('ID'))
            .then((response) => {
                setName(response.data[0].Name);
                //console.log(response.data[0].Name);
            })
            .catch((error) => console.log(error));
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            Page:{Page}, View ID:{id}, Name:{Name}
            <p />
            <Button type="primary" onClick={() => navigate(-1)}>OK</Button>
        </div>
    )
}

export default ViewEmployee;