import { Image, Typography } from "antd"
// Don't modify this file
const ErrorPage = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography.Title level={1}>404 PAGE NOT FOUND</Typography.Title>
            <Image src='https://http.cat/404' width={710} height={512} />
        </div>
    )
}

export default ErrorPage