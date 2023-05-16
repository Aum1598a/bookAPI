import React, { useEffect, useState } from "react";
import { fetchAllBook } from "../action/index";
import EditCard from "../component/EditCard";
import Pagination from "../component/pagination";

function Editbook() {
  const [book, setbook] = useState([]);
  const [count, setcount] = useState(0);
  const [page, setpage] = useState(1);
  let limit = 20;
  const pagenumber = Math.ceil(count / limit);
  //console.log(pagenumber);
  useEffect(() => {
    const getAllBooks = async () => {
      const books = await fetchAllBook()();
      setbook(books.data);
      setcount(books.data.length);
    };
    getAllBooks();
  }, []);
  useEffect(() => {}, [page]);
  // book.map ((book) => console.log(book));
  // const Buttonpagebook = [];
  // const pagebook = [];
  // let nonumber = 0;
  // let num1 = 0;
  // let num2 = 20;
  // do {
  //   nonumber++;
  //   pagebook.push(book.slice(num1, num2));
  //   num1 = num1 + 20;
  //   num2 = num2 + 20;
  //   // console.log(pagebook);
  // } while (nonumber < pagenumber);

  // for (let Buttonpage = 1; Buttonpage <= pagenumber; Buttonpage++) {
  //   Buttonpagebook.push( {Buttonpage} );
  // }
  return (
    <div className="container mx-auto  px-4">
      {/* <div className="mb-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"></div> */}
      <div className="mb-12 grid xl:grid-cols-5 gap-1">
        <EditCard page={page} limit={limit} databook={book} />
      </div>
      <Pagination pageAll={pagenumber} pageStart={page} setpage={setpage} />
    </div>
  );
}

export default Editbook;
