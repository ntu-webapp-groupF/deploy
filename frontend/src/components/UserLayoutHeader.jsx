import { Button, Flex, Typography } from "antd"
import {
    HomeOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const UserLayoutHeader = () => {

    const navigate = useNavigate();

    const onClickHome = () => {
        navigate('/');
    }

    return (
        <Flex justify="space-between" align="center">
            <Typography.Title level={1} style={{ fontFamily: 'Roboto Condensed', color: '#FC9F42' }}>TaleHug</Typography.Title>
            <Button type='text' icon={<HomeOutlined style={{ fontSize: 32 }}/>} style={{width: 64, height:64}} onClick={onClickHome}/>
        </Flex>
    )
}

export default UserLayoutHeader
