import { Flex, Typography, Input, Button, Checkbox, message } from "antd"
import { useEffect, useState } from "react"
import { userApi } from '../api/user'
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSuccessLogin = () => {
        messageApi.open({
            type: 'success',
            content: 'Login success!'
        });
    }
    const onFailLogin = (error_message) => {
        messageApi.open({
            type: 'error',
            content: error_message
        });
    }
    const onWarningLogin = (warning_message) => {
        messageApi.open({
            type: 'warning',
            content: warning_message
        });
    }

    useEffect(() => {
        const checkLogined = async () => {
            const response = await userApi.getCurrentUser();
            if( response && response.status === 200 ){
                navigate('/books');
            }
        }
        checkLogined();
    }, [navigate])

    const onLogin = async () => {
        const submit_username = username.trim();
        const submit_password = password.trim();
        if( submit_username === '' || submit_password === '' ){
            onWarningLogin('Please fill in all fields!');
            return;
        }
        const response = await userApi.login(submit_username, submit_password);
        if( response.status === 200 ){
            onSuccessLogin();
            // Nagivate to main page
            navigate('/books');
        } else {
            onFailLogin(response.data);
            setUsername('');
            setPassword('');
        }
    }
    return (
        <Flex wrap='wrap' vertical justify="center" align="center" style={{fontWeight:600, width: '50%',backgroundColor: '#FF870EBF'
        , padding: 0, paddingBottom: 0 , borderRadius:'20px'}} gap={30}>
            {contextHolder}
            <Typography.Title level={1} style={{ fontFamily: 'Bungee', color: 'white', fontSize: '64px', fontWeight: 'lighter'}}>SIGN IN</Typography.Title>
            <Flex vertical gap="large" style={{ width: '60%'}}>

                <Input placeholder='user name' value={username} onChange={e => setUsername(e.target.value)} style={{padding:'10px',fontSize:'17px'}}/>
                <Input.Password placeholder='password' value={password} onChange={e => setPassword(e.target.value)} style={{padding:'10px',fontSize:'17px'}} />
                
                <Flex vertical style={{alignItems:'center'}}>
                    <Button onClick={onLogin} type='primary' style={{ width: '60%', borderRadius:'20px', backgroundColor: 'black'}}>Sign In</Button>
                </Flex>

                <Flex wrap='wrap'justify="space-between" align="center">
                        <Checkbox style={{alignItems:'left',fontSize:'large'}}>Remember me</Checkbox>
                        <a href='#' style={{color: 'gray',fontSize:'large'}}>Need help?</a>
                </Flex>
                
            </Flex>
            <Flex style={{ width: '100%' }} align="center" justify="center" gap="small">
                <p style={{fontSize:'large'}}>New to Talehug?</p>
                <a href="/users/register" style={{fontSize:'large'}}>Sign up now.</a>
            </Flex>
        </Flex>
    )
}

export default LoginPage