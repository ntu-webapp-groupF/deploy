/* eslint react/prop-types: 0 */

import { Card, Flex } from "antd"
import BookFrame from "./BookFrame"
import { useState } from "react";
import sample from '../assets/background.jpg';

const SuggestedBook = ({ books }) => {

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
    <Flex gap={64} style={{ paddingLeft: 128 }} wrap="wrap">
      <BookFrame open={open} setOpen={setOpen} book={book} recommendBooks={books} openBook={openBook}/>
      {
        books.map((book, index) => (
          <Card onClick={() => openBook(book)}  key={index} style={{ width: 200, height: 300 }} hoverable cover={<img alt={book.name} src={book.profile_image} />} />
        ))
      }
    </Flex>
  )
}

export default SuggestedBook