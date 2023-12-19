import { Flex, Typography, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { userApi } from '../api/user';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSuccessRegister = () => {
        messageApi.open({
            type: 'success',
            content: 'Registration successful! You can now sign in.',
        });
    };

    const onFailRegister = (error_message) => {
        messageApi.open({
            type: 'error',
            content: error_message,
        });
    };

    const onWarningRegister = (warning_message) => {
        messageApi.open({
            type: 'warning',
            content: warning_message,
        });
    };

    const onRegister = async () => {
        const submit_username = username.trim();
        const submit_password = password.trim();

        if (submit_username === '' || submit_password === '') {
            onWarningRegister('Please fill in all fields!');
            return;
        }

        // Assuming you have a user registration API function
        const response = await userApi.register(submit_username, submit_password);

        if (response.status === 200) {
            onSuccessRegister();
            // Redirect to login page after successful registration
            // Auto Login
            const response = await userApi.login(submit_username, submit_password);
            if( response && response.status === 200 ){
                navigate('/member');
            }
            else {
                navigate('/users/login');
            }
        } else {
            onFailRegister(response.data);
            setUsername('');
            setPassword('');
        }
    };

    useEffect(() => {
        const checkLogined = async () => {
            const response = await userApi.getCurrentUser();
            if( response && response.status === 200 ){
                navigate('/books');
            }
        }
        checkLogined();
    }, [navigate])

    return (
        <Flex
            vertical
            justify="center"
            align="center"
            style={{
                fontWeight: 600,
                width: '50%',
                backgroundColor: '#FF870EBF',
                borderRadius: '20px',
                padding: '50px',
                boxSizing: 'border-box',
            }}
            gap={30}
        >
            {contextHolder}
            <Flex direction="column" align="center" justify="center" gap={10}>
                <Typography.Title level={2} style={{ textAlign: 'center', color: 'white', fontSize: '40px', margin: '0' }}>
                    Create a password to start your membership
                </Typography.Title>
            </Flex>

            <Flex direction="column" align="center" justify="center" gap={10}>
                <Typography.Text style={{ textAlign: 'center', color: 'white', fontSize: '20px', margin: '0' }}>
                    {"Just a few more steps and you're done! We hate paperwork, too."}
                </Typography.Text>
            </Flex>
                    <Input
                        placeholder="user name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            margin: '10px 0',
                            width: '30vw',
                        }}
                    />
                    <Input.Password
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            margin: '10px 0',
                            width: '30vw',
                        }}
                    />
                <Flex vertical style={{width: '60%', alignItems:'center'}}>
                    <Button
                        onClick={onRegister}
                        type="primary"
                        style={{
                            fontSize: '16px',
                            borderRadius: '5px',
                            width: '60%',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'black',
                        }}
                    >Next
                    </Button>
                </Flex>
        </Flex>
    );
};

export default RegisterPage;