import React, { useState } from 'react'
import axios from 'axios'
import { Button, Checkbox, Form, Input } from 'antd';

const JwtLogin = (props) => {

    const [formLogin] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const SubmitLogin = () => {

        console.log("SubmitLogin");

        const loginID = formLogin.getFieldValue("userName")
        const password = formLogin.getFieldValue("password")

        console.log(loginID,password,'登入');

        if (loginID === '') {
            alert('請輸入帳號')
            return false
        } else if (password === '') {
            alert('請輸入密碼')
            return false
        } else {
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:8800/test/authentication',
                data: {
                    login: loginID,
                    password: password
                }
            }
            ).then((response) => {
                console.log(response.data);
                console.log(response.data.success);

                if (response.data.success === true) {
                    sessionStorage.setItem('userName', response.data.userName)
                    sessionStorage.setItem('token', response.data.token)
                    sessionStorage.setItem('loginID', response.data.loginID)
                    // 跳轉
                    alert('登入成功')
                    window.location.href = `${window.location.origin}`
                }

                if (response.data.login_check === false) {
                    alert('帳號有誤')
                    return false
                }

                if (response.data.password_check === false) {
                    alert('密碼有誤')
                    return false
                }
            })
        }
    }

    return (
        <Form form={formLogin}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="userName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" onClick={SubmitLogin}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );


}

export default JwtLogin;