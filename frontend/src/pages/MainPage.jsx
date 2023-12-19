import { useEffect, useMemo, useState } from "react";
import { bookApi } from "../api/book";
import { contentApi } from '../api/content';
import { Buffer } from 'buffer';
import './MainPage.css';
import SuggestedBook from '../components/SuggestedBook';
import Section from "../components/Section";


// TODO: 底下是如何拿到所有繪本，及怎麼拿到他的封面（第1張照片）的範例，基本上照著參考就會知道怎麼拿其他的頁面了，如果不知道資料的結構的話記得 console.log 看一下
const MainPage = () => {

    const [books, setBooks] = useState([]);
    const fetchAllBooks = async () => {
        const response = await bookApi.getAllBooks();
        if (response.status === 200) {
            const bookList = [];
            for (let i = 0; i < response.data.length; i++) {
                const book_id = response.data[i].id;
                const image_id = response.data[i].images_list[0].id;
                
                const profile_image_response = await contentApi.getBookContent(book_id, image_id);
                if (profile_image_response.status === 200) {
                    const profile_image = profile_image_response.data;
                    const blob = new Blob([Buffer.from(profile_image)]);
                    const profile_image_url = URL.createObjectURL(blob);
                    const book = {
                        id: response.data[i].id,
                        bookname: response.data[i].bookname,
                        description: response.data[i].description,
                        age: response.data[i].age,
                        price: response.data[i].price,
                        category_list: response.data[i].category_list,
                        profile_image: profile_image_url,
                        images_list: response.data[i].images_list,
                    }
                    bookList.push(book);
                }
            }
            setBooks(bookList);
        }
    }

    const showFiveBooks = useMemo(() => {
        if( books.length < 5 ) return books;
        else {
            return books.slice(0, 5);
        }
    }, [books])

    useEffect(() => {
        fetchAllBooks();
    }, [])

    return (
        <div className="mainPage">
            <SuggestedBook books={showFiveBooks}/>
            <Section title="CONTINUE READING" books={books}/>
            <Section title="THEME" books={books}/>
            <Section title="MY LIST" books={books}/>
            {/*{books.length >= 1 ? <img src={books[0].profile_image} /> : <></>}*/}
        </div>
    )
}

export default MainPage
