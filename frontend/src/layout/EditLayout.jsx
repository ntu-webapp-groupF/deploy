import { Routes, Route } from "react-router-dom";
import EditPage from '../pages/EditPage';
import UploadPage from '../pages/UploadPage';
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";

import EditLayoutHeader from "../components/EditLayoutHeader";
import { Layout } from "antd";
import { useEffect } from "react";

const { Header, Content } = Layout;

const EditLayout = () => {

    useEffect(() => {
        document.body.style.backgroundImage = `url()`
    }, [])

    return (
        <Layout>
            <Header style={{backgroundColor: '#FECC99', height: '128px'}}>
                <EditLayoutHeader />
            </Header>
            <Content style={{backgroundColor: '#FECC99', minHeight: '100vh', maxHeight: '100%', width: 'full'}}>
                <Routes>
                    <Route path='/' element={<ProfilePage />} />
                    <Route path='/profile' element={<EditPage />} />
                    <Route path='/book' element={<UploadPage />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </Content>
        </Layout>
    )
}

export default EditLayout;