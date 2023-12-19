import { Button, Flex } from "antd"
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const EditLayoutHeader = () => {

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate('/books');
    }

    return (
        <Flex justify="flex-start" align="center">
            <div>
                <Button onClick={onClickBack} type='text' style={{ width: '48px', height: '48px'}} icon={<ArrowLeftOutlined style={{fontSize: '48px'}} />} />
            </div>
        </Flex>
    )
}

export default EditLayoutHeader