import { Routes, Route } from "react-router-dom";
import MainPage from '../pages/MainPage';
import FilterPage from '../pages/FilterPage';
import ErrorPage from "../pages/ErrorPage";

import BaseLayoutHeader from "../components/BaseLayoutHeader";
import { Layout } from "antd";
import { useEffect } from "react";
const { Header, Content } = Layout;

const BaseLayout = () => {

    useEffect(() => {
        document.body.style.backgroundImage = `url()`
    }, [])

    return (
        <Layout>
            <Header style={{backgroundColor: '#FECC99', height: '128px'}}>
                <BaseLayoutHeader />
            </Header>
            <Content style={{backgroundColor: '#FECC99', minHeight: '100vh', maxHeight: '100%'}}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/filter' element={<FilterPage />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </Content>
        </Layout>
    )
}

export default BaseLayout;