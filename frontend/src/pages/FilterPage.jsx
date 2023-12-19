import { useEffect, useMemo, useState, useCallback } from "react";
import { bookApi } from "../api/book";
import { contentApi } from '../api/content';
import { Buffer } from 'buffer';
import './MainPage.css';
//import SuggestedBook from "../components/SuggestedBook";
import Section from "../components/Section";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";


// TODO: 底下是如何拿到所有繪本，及怎麼拿到他的封面（第1張照片）的範例，基本上照著參考就會知道怎麼拿其他的頁面了，如果不知道資料的結構的話記得 console.log 看一下
const FilterPage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    const name = searchParams.get('name');
    const [books, setBooks] = useState([]);
    const [spinning, setSpinning] = useState(true);

    const fetchAllBooks = async () => {
        const response = await bookApi.getAllBooks();
        if( response && response.status === 200 ){
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
    // const v7szf8A61f = async () => {
    //     const response = await bookApi.getAllBooks();
    //     if (response && response.status === 200) {
    //         const bookList = [];
    //         for (let i = 0; i < response.data.length; i++) {
    //             const book_id = response.data[i].id;
    //             const image_id = response.data[i].images_list[0].id;

    //             const profile_image_response = await contentApi.getBookContent(book_id, image_id);
    //             if (profile_image_response.status === 200) {
    //                 const profile_image = profile_image_response.data;
    //                 const blob = new Blob([Buffer.from(profile_image)]);
    //                 const profile_image_url = URL.createObjectURL(blob);
    //                 const book = {
    //                     id: response.data[i].id,
    //                     bookname: response.data[i].bookname,
    //                     description: response.data[i].description,
    //                     age: response.data[i].age,
    //                     price: response.data[i].price,
    //                     category_list: response.data[i].category_list,
    //                     profile_image: profile_image_url,
    //                     images_list: response.data[i].images_list,
    //                 }
    //                 bookList.push(book);
    //             }
    //         }
    //         if (bookList.length < 5) {
    //             setBooks(bookList);
    //         } else {
    //             const randomBooks = [];
    //             while (randomBooks.length < 5) {
    //                 const randomIndex = Math.floor(Math.random() * bookList.length);
    //                 const randomBook = bookList[randomIndex];
    //                 if (!randomBooks.includes(randomBook)) {
    //                     randomBooks.push(randomBook);
    //                 }
    //             }
    //             setBooks(randomBooks);
    //         }
    //     }
    // }

    const fetchSearchBooks = useCallback( async () => {
        const response = await bookApi.getAllBooks();
        if( response && response.status === 200 ){
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
            if( name.trim() === '' ) setBooks(bookList);
            else {
                const filteredBooks = bookList.filter((book) => {
                    return book.bookname.toLowerCase().includes(name.toLowerCase());
                });
                setBooks(filteredBooks)
            }
        }
    }, [name])

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
            setBooks(booksList)
        }
    }
    const fetchMyPurchased = async () => {
        const response = await bookApi.getPurchasedBooks();
        
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
            setBooks(booksList)
        }
    }
    const fetchMyUploaded = async () => {
        const response = await bookApi.getUploadedBooks();
        
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
            setBooks(booksList)
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
            setBooks(booksList)
        }
    }

    useEffect(() => {
        if( type === 'search' ){
            fetchSearchBooks();
        } else if( type === 'collection' ) {
            fetchMyCollections();
        } else if( type === 'purchased' ){
            fetchMyPurchased();
        } else if( type === 'uploaded' ) {
            fetchMyUploaded();
        } else if( type === 'recommend' ) {
            fetchRecommended();
            //v7szf8A61f();
        } else {
            fetchAllBooks();
        }
        setSpinning(false);
    }, [fetchSearchBooks, name, type])

    const typeName = useMemo(() => {
        if( type === 'search' ){
            return 'Search Result';
        } else if( type === 'collection' ) {
            return 'My Collection List';
        } else if( type === 'purchased' ){
            return 'My Purchased List';
        } else if( type === 'uploaded' ){
            return 'My Uploaded Book List'  
        } else if( type === 'recommend') {
            return 'Recommend List'
        }   else {
            return 'All Books';
        }
    }, [type])

    return (
        <div className="mainPage">
            <Spin spinning={spinning} fullscreen />
            <Section title={typeName} books={books}/>
        </div>
    )
}

export default FilterPage