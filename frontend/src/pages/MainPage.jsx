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
    const [recommendBooks, setRecommendBooks] = useState([]);
    const [collectionBooks, setCollectionBooks] = useState([]);

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

    const fetchRecommended = async () => {
        const response = await bookApi.getRecommendBooks();
        console.log(response);
        
        if( response && response.status === 200 ){
            const booksList = await Promise.all(response.data.map(async (book) => {
                const image_id = book.book.images_list[0].id;
                const book_id = book.book.id;
                const profile_image_response = await contentApi.getBookContent(book_id, image_id);
                if( profile_image_response.status === 200 ){
                    const profile_image = profile_image_response.data;
                    const blob = new Blob([Buffer.from(profile_image)]);
                    const profile_image_url = URL.createObjectURL(blob);
                    return {
                        id: book.book.id,
                        bookname: book.book.bookname,
                        description: book.book.description,
                        age: book.book.age,
                        price: book.book.price,
                        category_list: book.book.category_list,
                        profile_image: profile_image_url,
                        images_list: book.book.images_list,
                    }
                } else {
                    return book.book;
                }
            }));
            setRecommendBooks(booksList)
        }
    }

    const fetchMyCollections = async () => {
        const response = await bookApi.getCollectionBooks();
        
        if( response && response.status === 200 ){
            const booksList = await Promise.all(response.data.map(async (book) => {
                const image_id = book.book.images_list[0].id;
                const book_id = book.book.id;
                const profile_image_response = await contentApi.getBookContent(book_id, image_id);
                if( profile_image_response.status === 200 ){
                    const profile_image = profile_image_response.data;
                    const blob = new Blob([Buffer.from(profile_image)]);
                    const profile_image_url = URL.createObjectURL(blob);
                    return {
                        id: book.book.id,
                        bookname: book.book.bookname,
                        description: book.book.description,
                        age: book.book.age,
                        price: book.book.price,
                        category_list: book.book.category_list,
                        profile_image: profile_image_url,
                        images_list: book.book.images_list,
                    }
                } else {
                    return book.book;
                }
            }));
            setCollectionBooks(booksList)
        }
    };

    const showFiveBooks = useMemo(() => {
        for (let i = books.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [books[i], books[j]] = [books[j], books[i]];
        }
        if( books.length < 5 ) return (books);
        else {
            return books.slice(0, 5);
        }
    }, [books])

    const showAdventureBooks = useMemo(() => {
        const bookList = [];
        for (let i = 0; i < books.length; i++){
            if(books[i].category_list[0].categoryname == "adventure"){
                bookList.push(books[i]);
            }   
        }
        if( bookList.length < 8 ) return bookList;
        else {
            return bookList.slice(0, 8);
        }
    }, [books])

    const showMandarinBooks = useMemo(() => {
        const bookList = [];
        for (let i = 0; i < books.length; i++){
            if(books[i].category_list[0].categoryname == "mandarin"){
                bookList.push(books[i]);
            }   
        }
        if( bookList.length < 8 ) return bookList;
        else {
            return bookList.slice(0, 8);
        }
    }, [books])

    const showScienceBooks = useMemo(() => {
        const bookList = [];
        for (let i = 0; i < books.length; i++){
            if(books[i].category_list[0].categoryname == "science"){
                bookList.push(books[i]);
            }   
        }
        if( bookList.length < 8 ) return bookList;
        else {
            return bookList.slice(0, 8);
        }
    }, [books])

    useEffect(() => {
        fetchAllBooks();
        fetchRecommended();
        fetchMyCollections();
    }, [])

    return (
        <div className="mainPage">
            <SuggestedBook books={showFiveBooks}/>
            <Section title="RECOMMENDED FOR YOU" books={recommendBooks.length>=1?recommendBooks:showFiveBooks}/>
            <Section title="ADVENTURE" books={showAdventureBooks}/>
            <Section title="MANDARIN" books={showMandarinBooks}/>
            <Section title="SCIENCE" books={showScienceBooks}/>
            {collectionBooks.length >= 1 ? <Section title="MY COLLECTIONS" books={collectionBooks}/> : <></>}
        </div>
    )
}

export default MainPage
