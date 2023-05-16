import React, { useState } from "react";
import { DeleteBook } from "../action/index";
const DelBook = (id) => {
  const [bookid, setBookid] = useState();
  console.log(id);
  const idbook = () => {
    console.log("ss"+bookid);
    // DeleteBook(bookid)();
  };
  function myFunction(data) {
    setBookid(data);
  }
  return (
    <div>
      <label
        htmlFor="my-modal-6"
        className="btn btn-sm btn-error"
        onClick={(e) => myFunction(id.id)}
      >
        ลบ
      </label>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to use Wikipedia for free!
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
  );
};

export default DelBook;
