import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/card.css";
import { DeleteBook, UpdateBook } from "../action/index";
const EditCard = (props) => {
  const { page, limit, databook } = props;
  const [bookid, setBookid] = useState();

  const idbook = () => {
    DeleteBook(bookid)();
  };
  function myFunction(data) {
    setBookid(data);
  }

  const idbookupdate = () => {
    UpdateBook(bookid)();
  };
  const render = () => {
    const endIndex = limit * page;
    const startIndex = endIndex - limit;

    return databook.slice(startIndex, endIndex).map((book) => {
      // console.log(book.isbn)
      return (
        <div key={book.id} className="justify-self-center mb-8">
          <div key={book.id} className="rectangle">
            <div className="BoxImg">
              <img src={book.thumbnailUrl} alt="Shoes" />
            </div>

            <div className="content">
              <h4 className="my-heading">{book.title}</h4>
              <p className="TextCard pl-2.5 py-0.5">{book.authors[0]}</p>
              <div className="ButCategory">
                <p className="TextCard">{book.categories}</p>
              </div>

              <span className="grid justify-items-end">
                <div className="ButtonEdit">
                  <div className="px-1">
                    <label
                      htmlFor="my-modal-6"
                      className="btn btn-sm btn-error"
                      onClick={(e) => myFunction(book.isbn)}
                    >
                      ลบ
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal-6"
                      className="modal-toggle"
                    />
                    <div className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">
                          คุณต้องลบหนังสือเล่มนี้หรือไม่
                        </h3>
                        <p className="py-4">
                          ถ้าต้องการลบให้คลิกยืนยัน ไม่ต้องการลบให้กดยกเลิก
                        </p>
                        <div className="modal-action">
                          <label
                            htmlFor="my-modal-6"
                            className="btn btn-accent"
                            onClick={(e) => idbook()}
                          >
                            ยืนยัน
                          </label>
                          <label htmlFor="my-modal-6" className="btn btn-error">
                            ยกเลิก
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-1">
                    <Link to={`/EditBookid/?bookisbn=${book.isbn}`}>
                      <label className="btn btn-sm btn-warning">แก้ไข</label>
                    </Link>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return <>{render()}</>;
};

export default EditCard;
