/* eslint react/prop-types: 0 */
import { Button, Flex, Typography } from 'antd';
import BookFrame from './BookFrame';
import { useState } from 'react';
import sample from '../assets/background.jpg'

//TODO: Modal
const Section = ({ title, books }) => {

    const [open, setOpen] = useState(false);
    const [book, setBook] = useState(
        {
          id: 0,
          bookname: "活了100萬次的貓",
          description: "There was a cat who died a million times and lived a million times, and was loved by a million people. Every time it died, its owner cried very sadly for him, but this cat, which had lived a million times, never cried once. It had never loved anyone. Once, it became a real wild cat, living freely and enjoying the admiration of other cats, until it finally met a white cat that it loved. For the first time, it fell in love with someone else...",
          age: 7,
          price: 1,
          category_list: ["Self-exploration", "life education"],
          profile_image: sample,
          images_list: [],
        }
    );

    const openBook = (targetBook) => {
        setBook(targetBook);
        setOpen(true);
    }


    return (
        <Flex vertical gap="small" style={{ paddingLeft: 24 }}>
            <BookFrame open={open} setOpen={setOpen} book={book} recommendBooks={books} openBook={openBook}/>
            <Typography.Title level={3}>{title}</Typography.Title>
            <Flex gap={32} wrap='wrap'>
                {books.map((book, index) => (
                    <Button onClick={() => openBook(book)} shape='circle' key={index}  style={{ width: '128px', height: '128px', backgroundImage: `url(${book.profile_image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} />
                ))}
            </Flex>
        </Flex>
    )
}

export default Section;