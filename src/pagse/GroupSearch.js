import React, { useEffect, useState } from "react";
import { fetchAllBook } from "../action/index";
import Card from "../component/card";
import Pagination from "../component/pagination";
import { Link } from "react-router-dom";

function GroupSearch() {
  const [book, setbook] = useState([]);
  const [page, setpage] = useState(1);
  let limit = 20;
  let categories = new URLSearchParams(window.location.search).get(
    "categories"
  );
  useEffect(() => {
    const getAllBooks = async () => {
      const books = await fetchAllBook()();
      setbook(books.data);
    };
    getAllBooks(book);
  }, []);

  const filteredArr = book
    .filter((item) => item.categories.includes(categories))
    .map((item) => item);

  const pagenumber = Math.ceil(filteredArr.length / limit);

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
  //   var fruits = ["banana", "orange", "apple", "mango"];
  //   var fruit = book.categories.find(element => element === "apple");
  //   console.log(fruit);

  return (
    <div className="container mx-auto  px-4">
      {/* <div className="mb-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"></div> */}
      <div className="mb-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1">
        <Card page={page} limit={limit} databook={filteredArr} />
      </div>
      <Pagination pageAll={pagenumber} pageStart={page} setpage={setpage} />
    </div>
  );
}

export default GroupSearch;
