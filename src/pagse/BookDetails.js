import React, { useEffect, useState } from "react";
import { fetchBookDetails } from "../action/index";
import { Link } from "react-router-dom";
import "../style/BookDetails.css";

const BookDetails = () => {
  const [BookDetails, setBookDetails] = useState([]);
  const [book, setbook] = useState([]);
  const [date, setdate] = useState("");
  let bookisbn = new URLSearchParams(window.location.search).get("bookisbn");
  useEffect(() => {
    const getAllBooks = async () => {
      const books = await fetchBookDetails(bookisbn)();
      setbook(books.data);

      const dateDetails = new Date(book.publishedDate.$date);
      const options = { year: "numeric", month: "long", day: "numeric" };
      setdate(dateDetails.toLocaleDateString("en-US", options));
    };
    getAllBooks();
  }, []);
  console.log(date);
  return (
    <div className="container mx-auto px-6">
      <div className="Details grid grid-cols-5 mx-auto mb-12">
        <div className="BoxImgDetails col-start-1 col-span-2">
          <img src={book.thumbnailUrl} alt="Shoes" />
        </div>
        <div className="BoxTextDetails col-start-3 col-span-3">
          <h1 className="Texttitle mb-4">{book.title} </h1>
          <p className="TextDetails mb-2">authors : {book.authors}</p>
          <p className="TextDetails mb-2">categories : {book.categories}</p>
          <div className="my-7">
            <div className="statusDetails bg-sky-800 px-2">
              <p className="TextDetails mb-2">status</p>
            </div>
            <div className="statusDetails bg-yellow-500	px-2 ml-2">
              <p className="TextDetailsk text-black">{book.status}</p>
            </div>
          </div>

          <div>
            pageCount
            <div className="float-right">{book.pageCount} หน้า</div>
            <hr className="my-3 "></hr>
          </div>
          <div>
            publishedDate
            <div className="float-right">{date}</div>
            <hr className="my-3"></hr>
          </div>
        </div>
      </div>
      <div className="BoxDescription mx-auto mt-12">
        <div className="Texttitle">คำอธิบาย</div>
        <hr className="mb-5"></hr>
        <div className="TextDetailsk">{book.shortDescription}</div>
        <div className="Texttitle mt-12">รายละเอียด</div>
        <hr className="mb-5"></hr>
        <div className="TextDetailsk">{book.longDescription}</div>
      </div>

      
    </div>
  );
};

export default BookDetails;
