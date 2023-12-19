/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from "react";
import sample from '../assets/background.jpg';
import { Buffer } from "buffer";
import { Button, Card, Flex, Modal, Typography, message } from "antd";
import {
    PlusOutlined,
    CaretRightOutlined,
    ShoppingCartOutlined,
    DislikeOutlined,
    LikeOutlined,
    LikeFilled,
    DislikeFilled
} from '@ant-design/icons';
import { contentApi } from "../api/content";
import { bookApi } from "../api/book";



const BookFrame = ({ open, setOpen, book, recommendBooks, openBook }) => {
    //const navigate = useNavigate();
    const [contents, setContents] = useState([sample, sample, sample, sample, sample])
    
    const [dislike, setDislike] = useState(false);
    const [like, setLike] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchContent = async () => {
            const newContents = [];
            for(let i = 0 ;i < 4;i++){
                if( i >= book.images_list.length ){
                    // no image behind
                    newContents.push(sample);
                    continue;
                }
                const image_inst = book.images_list[i];
                const response = await contentApi.getBookContent(book.id, image_inst.id);
                const image_blob = new Blob([Buffer.from(response.data)]);
                const image_url = URL.createObjectURL(image_blob);
                newContents.push(image_url)
            }
            setContents(newContents)
        }

        fetchContent();
    }, [book])

    const BookContent = ({ content = sample, width = '100%', height = '100%' }) => {
        return (
            <div>
                <img src={content} style={{ borderRadius: '30px', width: width, height: height }} />
            </div>
        )
    }

    const addColletionList = async () => {
        const response = await bookApi.addBookToCollections(book.id);
        if( response && response.status === 200 ){
            messageApi.success('Added to your list successfully!');
        } else {
            messageApi.error(response.data);
        }
    }

    const readBook = () => {
        window.location.href = `/reads?bookId=${book.id}`
    }
    const buyBook = () => {
        window.location.href = `/purchase?bookId=${book.id}`
    }

    const dislikeBook = () => {
        if (like) {
            setLike(false);
        }
        setDislike(!dislike);
        messageApi.success('You dislike this book!');
    }

    const likeBook = () => {
        if (dislike) {
            setDislike(false);
        }
        setLike(!like);
        messageApi.success('You like this book!');
    }

    const LikeButton = () => {

        if (!like) {
            return (
                <Button
                    type='text'
                    icon={<LikeOutlined style={{ fontSize: 50, cursor: 'pointer' }} />}
                    style={{ width: 100, height: 100 }}
                    onClick={likeBook}
                />)
        } else {
            return (
                <Button
                    type='text'
                    icon={<LikeFilled style={{ fontSize: 50, cursor: 'pointer' }} />}
                    style={{ width: 100, height: 100 }}
                    onClick={likeBook}
                />)
        }
    }

    const DislikeButton = () => {

        if (!dislike) {
            return (
                <Button
                    type='text'
                    icon={<DislikeOutlined style={{ fontSize: 50, cursor: 'pointer' }} />}
                    style={{ width: 100, height: 100 }}
                    onClick={dislikeBook}
                />)
        } else {
            return (
                <Button
                    type='text'
                    icon={<DislikeFilled style={{ fontSize: 50, cursor: 'pointer' }} />}
                    style={{ width: 100, height: 100 }}
                    onClick={dislikeBook}
                />)
        }
    }

    return (
        <Modal open={open} footer={null} closable={true} onCancel={() => setOpen(false)} width={1200} styles={{ body: { 
            backgroundColor: '#FECC99',
        }}}>
            {contextHolder}
            <Flex vertical gap={50} justify='center' align='center' style={{ width: '100%', height: '100%', backgroundColor: 'inherit', paddingTop: 50 }}>
                <Flex gap={20} justify='center' align='flex-start' style={{ width: '90%', height: '60%' }}>
                    <Flex gap={10} vertical justify='center' align='center' style={{ width: '50%', height: '100%' }}>
                        <Flex gap={20} justify='center' align='center' style={{ width: '100%', height: '70%' }}>
                            <BookContent content={book.profile_image} />
                        </Flex>
                        <Flex gap={20} justify='center' align='center' style={{ width: '100%', height: '30%' }}>
                            <BookContent content={contents.length === 4 ? contents[0] : sample} width="100px" height="100px" />
                            <BookContent content={contents.length === 4 ? contents[1] : sample} width="100px" height="100px" />
                            <BookContent content={contents.length === 4 ? contents[2] : sample} width="100px" height="100px" />
                            <BookContent content={contents.length === 4 ? contents[3] : sample} width="100px" height="100px" />
                        </Flex>
                    </Flex>
                    <Flex gap={20} vertical justify='center' align='flex-start' style={{ width: '50%', height: '100%' }}>
                        <Flex vertical gap={20} justify='center' align='flex-start' style={{ width: '100%', height: '70%' }}>
                            <Flex vertical justify='center' align='center' style={{ width: '100%', height: '70%' }}>
                                <Typography.Title
                                    level={3}
                                    style={{ textShadow: "4px 4px #000000", fontFamily: 'Playfair Diasplay SC', color: 'white', fontSize: '5vw', fontWeight: 800 }}>
                                    {book.bookname}
                                </Typography.Title>
                                <Typography.Text
                                    style={{ fontFamily: 'optima' }}>
                                    {book.description}
                                </Typography.Text>
                            </Flex>
                            <Flex vertical justify='center' align='center' style={{ width: '100%', height: '30%' }}>
                                <Typography.Text
                                        style={{ fontFamily: 'optima' }}>
                                        #Age: {book.age}
                                </Typography.Text>
                                <Flex gap={10} align='center' justify='center' style={{ width: '100%' }}>
                                    <Typography.Text style={{ fontFamily: 'optima' }}>
                                        #This book is: 
                                    </Typography.Text>
                                    <Flex>
                                    {
                                        book.category_list.map((category, index) => (
                                            <React.Fragment key={index}>
                                                <Typography.Text style={{ fontFamily: 'optima' }}>
                                                    {category.categoryname}
                                                    {index < book.category_list.length - 1 && '/'}
                                                </Typography.Text>
                                            </React.Fragment>
                                        ))
                                    }
                                    </Flex>
                                </Flex>
                                {
                                    /*
                                <Typography.Text
                                        style={{ fontFamily: 'optima' }}>
                                        #List: {book.category_list.map((category, index) => (
                                            <React.Fragment key={index}>
                                                {category}
                                                {index < book.category_list.length - 1 && '/'}
                                            </React.Fragment>
                                        ))}
                                </Typography.Text>
                                */
                                }
                                <Flex gap={10} align='center' justify='center' style={{ width: '50%' }}>
                                    <Flex vertical align='center'>
                                        <Button
                                            type='text'
                                            icon={<PlusOutlined style={{ fontSize: 50, cursor: 'pointer' }} />}
                                            style={{ width: 100, height: 100 }}
                                            onClick={addColletionList}
                                        />
                                        MyList
                                    </Flex>
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{ backgroundColor: "#FF870E", height: "auto" }}
                                        icon={<CaretRightOutlined style={{ fontSize: 50 }} />}
                                        onClick={readBook}
                                        block>
                                        <Typography.Text style={{ fontFamily: 'optima', fontSize: '40px', color: 'white', fontWeight: '800' }}>Play</Typography.Text>
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{ backgroundColor: "#FF870E", height: "auto" }}
                                        icon={<ShoppingCartOutlined style={{ fontSize: 50 }} />}
                                        onClick={buyBook}
                                        block>
                                        <Typography.Text style={{ fontFamily: 'optima', fontSize: '40px', color: 'white', fontWeight: '800' }}>Buy</Typography.Text>
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            gap={20}
                            justify='center'
                            align='center'
                            style={{ width: '100%', height: '30%', backgroundColor: "#FF870E4D", borderRadius: '20px' }}
                        >
                            <DislikeButton />
                            <LikeButton />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex vertical gap={18} align="flex-start" justify="center" style={{ width: '90%', height: '40%' }}>
                    <Typography.Title
                        level={3}
                        style={{ fontFamily: 'Bungee', color: 'white', fontSize: '30px', fontWeight: 'lighter' }}>
                        YOU MAY ALSO LIKE...
                    </Typography.Title>
                    <Flex gap={32} align="center" justify="center" style={{paddingBottom: 50}}>
                        <Card style={{width: 250, height: 200}} hoverable cover={<img alt={recommendBooks && recommendBooks[0] ? recommendBooks[0].bookname : 's1'} src={recommendBooks && recommendBooks[0] && recommendBooks[0].profile_image ? recommendBooks[0].profile_image : sample} style={{ width: 250, height: 200 }} />} onClick={recommendBooks && recommendBooks[0] ? () => {setOpen(false); openBook(recommendBooks[0])} : () => console.log('NONE')} />
                        <Card style={{width: 250, height: 200}} hoverable cover={<img alt={recommendBooks && recommendBooks[1] ? recommendBooks[1].bookname : 's2'} src={recommendBooks && recommendBooks[1] && recommendBooks[1].profile_image ? recommendBooks[1].profile_image : sample} style={{ width: 250, height: 200 }} />} onClick={recommendBooks && recommendBooks[1] ? () => {setOpen(false); openBook(recommendBooks[1])} : () => console.log('NONE')} />
                        <Card style={{width: 250, height: 200}} hoverable cover={<img alt={recommendBooks && recommendBooks[2] ? recommendBooks[2].bookname : 's3'} src={recommendBooks && recommendBooks[2] && recommendBooks[2].profile_image ? recommendBooks[2].profile_image : sample} style={{ width: 250, height: 200 }} />} onClick={recommendBooks && recommendBooks[2] ? () => {setOpen(false); openBook(recommendBooks[2])} : () => console.log('NONE')} />
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    )
}

export default BookFrame