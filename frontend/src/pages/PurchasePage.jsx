import { FloatButton, Typography, message } from "antd";
import { bookApi } from '../api/book.js';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined
} from '@ant-design/icons';
import { Buffer } from "buffer";
import { useState, useCallback, useEffect } from "react";
import sample from '../assets/background.jpg';
import { contentApi } from "../api/content.js";

const PurchasePage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bookid = searchParams.get('bookId');
    const [messageApi, contextHolder] = message.useMessage();

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
    const [imageSrc, setImageSrc] = useState(sample);

    const error = useCallback((error_message) => {
        messageApi.open({
            type: 'error',
            content: error_message,
          });
    }, [messageApi])
    const success = useCallback((success_message) => {
        messageApi.open({
            type: 'success',
            content: success_message,
          });
    }, [messageApi])

    useEffect(() => {
        const fetchBook = async () => {
            const response = await bookApi.getBookById(bookid);
            if( response && response.status === 200 ){
                setBook(response.data);
                const imageResponse = await contentApi.getBookContent(bookid, response.data.images_list[0].id);
                if( imageResponse && imageResponse.status === 200 ){
                  const blob = new Blob([Buffer.from(imageResponse.data)]);
                  const url = URL.createObjectURL(blob);
                  setImageSrc(url)
                }
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

    const onPurchase = async () => {
      const response = await bookApi.purchasedBooks(bookid);
      if (response && response.status === 200) {
        success('Purchase Success! Redirecting to main page after 3 seconds...');

        setTimeout(() => {
          window.location.href = '/books/';
        }, 3000); // Delay for 3 seconds (5000 milliseconds)
      } else {
        error(response.data);
      }
    };

    return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}} >
        <FloatButton onClick={() => navigate('/books/')} icon={<HomeOutlined />} style={{ width: '64px', height: '64px', right: 100 }} />
        {contextHolder}
          <div>
            <img src={imageSrc} alt={book.bookname} style={{ width: '300px',height:'300px', borderRadius: '5px' }} />
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center'}}>
                <h3 style={{fontSize:40,margin:0}}>{book.bookname}</h3>
                <p>{book.description}</p>
                <Typography.Text style={{fontSize: 18}}>NT${book.price}</Typography.Text>
            </div>
            <button onClick={onPurchase} style={{ width: '100%', padding: '10px', backgroundColor: '#ff4500', border: 'none', borderRadius: '5px', color: 'white' ,cursor:'pointer'}}>
              Purchase
            </button>
        </div>
      </div>
    )
}

export default PurchasePage