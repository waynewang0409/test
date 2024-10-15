import React, { Component, useState, useEffect } from "react";
import { Col, Divider, Row } from 'antd';

const Home = () => {

    const [token, setToken] = useState("");
    const [tokenExpiration, setTokenExpiration] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("token") != null) {
            setToken(sessionStorage.getItem("token"));

            const tmpToken = JSON.parse(atob(sessionStorage.getItem("token").split(".")[1]));
            const timestamp = tmpToken.exp;
            const expiration = new Date(timestamp * 1000).toLocaleString();
            setTokenExpiration(expiration);
        }
    }, []);

    return (
        <div>
            This is Page Home.
            <p />
            This is table sample :
            <Row>
                <Col flex={2}>2 / 5</Col>
                <Col flex={3}>3 / 5</Col>
            </Row>
            <Row>
                <Col flex="200px">a</Col>
                <Col flex="auto"></Col>
            </Row>
            <Row>
                <Col flex="200px">100px</Col>
                <Col flex="auto">Fill Rest</Col>
            </Row>

            <p />
            Current Token : {token} <p />
            Token Expiretion Time : {tokenExpiration}
        </div>

    )
}

export default Home;