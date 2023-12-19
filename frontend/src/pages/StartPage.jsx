import { Flex } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const MyComponent = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/users/login');
    }

    return (
        <button 
            style={{ fontSize: '50px', fontWeight: '900', color: 'black',cursor:'pointer' }}
            onClick={navigateToLogin}
            >
            +
        </button>
    )
}

const StartPage = () => {

    useEffect(() => {
        document.body.style.backgroundImage = `url("/src/assets/background.jpg")`
    }, [])

    return (
        <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', }}>
            <Flex style={{ flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '70vw', height: '40vw',boxSizing: 'border-box' }} gap={30}>
                <div style={{ fontSize: '50px', fontWeight: '900', color: 'black' }}>
                    {"WHO's READING"}
                </div>
            <MyComponent/>
            </Flex>
        </Flex>
    )
}

export default StartPage