import { Flex, Layout, Button, message, Image, Typography, Spin, Modal } from 'antd';
import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import {
    LeftOutlined, RightOutlined, HomeOutlined
} from '@ant-design/icons';
import sample from '../assets/background.jpg'
import { contentApi } from '../api/content';
import { Buffer } from 'buffer';
import { bookApi } from '../api/book';

const { Header, Content } = Layout

const ReadPage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bookid = searchParams.get('bookId');

    const [ book, setBook ] = useState({
        id: 0,
        bookname: "活了100萬次的貓",
        description: "There was a cat who died a million times and lived a million times, and was loved by a million people. Every time it died, its owner cried very sadly for him, but this cat, which had lived a million times, never cried once. It had never loved anyone. Once, it became a real wild cat, living freely and enjoying the admiration of other cats, until it finally met a white cat that it loved. For the first time, it fell in love with someone else...",
        age: 7,
        price: 1,
        category_list: ["Self-exploration", "life education"],
        profile_image: sample,
        images_list: [],
    });
    const [ currentPageId, setCurrentPageId ] = useState(0);
    const [ leftPage, setLeftPage ] = useState(sample);
    const [ rightPage, setRightPage ] = useState(sample);
    const [ lastPageId, setLastPageId ] = useState(-1);
    const [ messageApi, contextHolder ] = message.useMessage();
    const [ spinning, setSpinning ] = useState(true);

    // Is reserve read page is better?
    const [ cachedContent, setCachedContent ] = useState([]);

    const error = useCallback((error_message) => {
        messageApi.open({
            type: 'error',
            content: error_message,
          });
    }, [messageApi])

    useEffect(() => {

        const fetchBook = async () => {
            const response = await bookApi.getBookById(bookid);
            if( response && response.status === 200 ){
                setBook(response.data);
                setLastPageId(response.data.images_list.length - 1 );
            } else {
                error(response.data);
            }
        }

        if( bookid === undefined || bookid === null ){
            window.location.href = '/books';
        } else {
            fetchBook();
        }
    }, [bookid, error])

    useEffect(() => {
        console.log(book);
        const startPage = async () => {
            let newCached = [];
            if( book.images_list.length > 0 ){
                const response = await contentApi.getBookContent(bookid, book.images_list[0].id);
                if( response && response.status === 200 ){
                    //const url = getImageUrl(response.data);
                    const blob = new Blob([Buffer.from(response.data)]);
                    const url = URL.createObjectURL(blob);
                    
                    setLeftPage(url);
                    newCached.push(url);
                } else {
                    error(response.data);
                }
            }
            if( book.images_list.length > 1 ){
                const response = await contentApi.getBookContent(bookid, book.images_list[1].id);
                if( response && response.status === 200 ){
                    //const url = getImageUrl(response.data);
                    const blob = new Blob([Buffer.from(response.data)]);
                    const url = URL.createObjectURL(blob);
                    
                    setRightPage(url);
                    newCached.push(url);
                } else {
                    error(response.data);
                }
            }
            setCachedContent(newCached);
        }

        if( book ){
            startPage();
            setSpinning(false);
        }
    }, [book])

    const getImageUrl = (image_response) => {
        const blob = new Blob([Buffer.from(image_response.data)]);
        return URL.createObjectURL(blob);
    };

    const clickNextPage = async () => {

        setSpinning(true);
        const target = currentPageId + 2;        
        let image_response, url;

        if (cachedContent.length > target) {
            setLeftPage(cachedContent[target]);
            if (cachedContent.length >= (target + 1)) {
                setRightPage(cachedContent[target + 1]);
            } else {
                setRightPage(null);
            }
            setSpinning(false);
            setCurrentPageId(target);
            return;
        }
        
        let newCached = [...cachedContent];
        if( target < book.images_list.length ){
            image_response = await contentApi.getBookContent(bookid, book.images_list[target].id);
            if (image_response.status === 200) {
                url = getImageUrl(image_response);
                newCached.push(url);
                //setCachedContent([...cachedContent, url]);
                setLeftPage(url);
            } else {
                setLastPageId(currentPageId);
                if (image_response.status === 403) {
                    Modal.confirm({
                        title: 'Free Preview end here',
                        content: 'Please purchase the book to continue reading.',
                        okText: 'Purchase',
                        onOk: () => {
                             window.location.href = `/purchase?bookId=${bookid}`
                        }
                    })
                }
                setSpinning(false);
                return;
            }
        } else{
            url = sample;
            newCached.push(url);
            setLeftPage(url);
        }


        if( target + 1< book.images_list.length) {
            image_response = await contentApi.getBookContent(bookid, book.images_list[target + 1].id);
            setCurrentPageId(target);
            if (image_response.status === 200) {
                url = getImageUrl(image_response);
                newCached.push(url);
                //setCachedContent([...cachedContent, url]);
                setRightPage(url);
            } else {
                setRightPage(null);
                setLastPageId(target);
                if (image_response.status === 403) {
                    error(image_response.data);
                }
                setSpinning(false);
                return;
            }
        } else {
            url = sample;
            newCached.push(url);
            setRightPage(url);
        }

        setCachedContent(newCached);
        setSpinning(false);
        /*
        const prefetch = await contentApi.getBookContent(bookid, target + 2);
        if (prefetch.status !== 200 && prefetch.status !== 403) {
            setLastPageId(target + 1);
        }
        */
    };

    const clickPreviousPage = () => {
        if (currentPageId < 2 || cachedContent.length < currentPageId) {
            return;
        } else {
            setLeftPage(cachedContent[currentPageId - 2]);
            setRightPage(cachedContent[currentPageId - 1]);
            setCurrentPageId(currentPageId - 2);
        }
    };

    return (
        <Layout style={{opacity: 0.9, minHeight: '100vh'}} >
            <Spin spinning={spinning} fullscreen />
            <Header style={{backgroundColor: '#FECC99', height: '128px'}}>
                <Flex justify="space-between" align="center">
                    <Typography.Title level={1} style={{ fontFamily: 'Roboto Condensed', color: '#FC9F42' }}>TaleHug</Typography.Title>
                    <Button type='text' icon={<HomeOutlined style={{ fontSize: 32 }}/>} style={{width: 64, height:64}} onClick={() => window.location.href = '/books/'}/>
                </Flex>
            </Header>
            <Content style={{backgroundColor: '#FECC99', display: 'flex', alignItems: 'center'}}>
                <>
                <Flex wrap='wrap' vertical gap={50} justify='center' align='center' style={{ width: '100%', height: '100%'}}>
                    <Flex gap={20} justify='center' align='center' style={{ width: '100%', height: '95%'}}>
                        <Flex style={{ paddingLeft: '20px' ,width: '585px', height: '585px' }} align="center" justify="center">
                            { leftPage ? (<Image src={leftPage} style={{borderRadius:'10px' , width: '585px', height: '585px'}}/>
                            ) : (<></>)}
                        </Flex>
                        <Flex align="center" justify="center" style={{ paddingRight: '20px', width: '585px', height: '585px' }} >
                            { rightPage ? (<Image src={rightPage} style={{ borderRadius: '10px', width: '585px', height: '585px'}}/>
                            ) : (<></>)}
                        </Flex>
                    </Flex>
                    <Flex wrap='wrap' gap={30} align="center" justify="flex-end" style={{ width: '100%', height: '5%'}}>
                        <Button
                            type='text'
                            icon={<LeftOutlined style={{ fontSize: 75, cursor: 'pointer' }}/>}
                            disabled={currentPageId === 0} style={{width: 100, height:100}}
                            onClick={clickPreviousPage}/>
                        <Button
                            type='text'
                            icon={<RightOutlined style={{ fontSize: 75, cursor: 'pointer' }}/>}
                            disabled={lastPageId !== -1 && (currentPageId + 2) > lastPageId}
                            style={{width: 100, height:100}}
                            onClick={clickNextPage}/>
                    </Flex>
                </Flex>
                {contextHolder}
                </>
            </Content>
        </Layout>
    )
}

export default ReadPage