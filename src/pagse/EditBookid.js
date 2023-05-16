import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UpdateBook, fetchBookDetails } from "../action";
import "../style/BookCreate.css";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EditBookid = () => {
  const { register, handleSubmit } = useForm();
  const [book, setbook] = useState([]);
  const [title, settitle] = useState("");
  const [pageCount, setpageCount] = useState("");
  const [publishedDate, setpublishedDate] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [longDescription, setlongDescription] = useState("");
  const [thumbnailUrl, setthumbnailUrl] = useState("");
  const [status, setstatus] = useState("");
  const [categories, setCategories] = useState("");
  const [authors, setAuthors] = useState("");
  const [resultImg, setResultImg] = useState();
  const [progress, setprogress] = useState(0);

  let bookisbn = new URLSearchParams(window.location.search).get("bookisbn");
  useEffect(() => {
    const getAllBooks = async () => {
      const books = await fetchBookDetails(bookisbn)();
      setbook(books.data);
    };
    getAllBooks();
  }, []);

  const onSubmit = (data) => {
    dataset(data);
    dataarrset(data);
    dataimgset(data);
  };

  const dataset = (data) => {
    settitle(data?.title ? data.title : book.title);
    setpageCount(data?.pageCount ? data.pageCount : book.pageCount);
    setpublishedDate(
      data?.publishedDate ? data.publishedDate : book.publishedDate.$date
    );
    setshortDescription(
      data?.shortDescription ? data.shortDescription : book.shortDescription
    );
    setlongDescription(
      data?.longDescription ? data.longDescription : book.longDescription
    );
    // setthumbnailUrl(
    //   data?.setthumbnailUrl ? data.setthumbnailUrl : book.setthumbnailUrl
    // );
    setstatus(data?.status ? data.status : book.status);
  };

  const dataarrset = (data) => {
    const category = [];
    const author = [];
    const category11 = book?.categories[0] ? book.categories[0] : "";
    const category12 = book?.categories[1] ? book.categories[1] : "";
    const category13 = book?.categories[2] ? book.categories[2] : "";
    const authors11 = book?.authors[0] ? book.authors[0] : "";
    const authors12 = book?.authors[1] ? book.authors[1] : "";
    const authors13 = book?.authors[2] ? book.authors[2] : "";
    category.push(data?.categories1 ? data.categories1 : category11);
    category.push(data?.categories2 ? data.categories2 : category12);
    category.push(data?.categories3 ? data.categories3 : category13);
    author.push(data?.authors1 ? data.authors1 : authors11);
    author.push(data?.authors2 ? data.authors2 : authors12);
    author.push(data?.authors3 ? data.authors3 : authors13);
    const category1 = category.filter((item) => item.trim() !== "");
    const author1 = author.filter((item) => item.trim() !== "");
    setCategories(category1);
    setAuthors(author1);
  };

  const dataimgset = async (data) => {
    if (data.thumbnailUrl.length === 1) {
      const filse = document.querySelector("input[id=myFileInput]").files[0];
      const userID = "001";
      const timestamp = Math.floor(Date.now() / 1000);
      const newName = userID + "_" + timestamp;

      const storageRef = ref(storage, "images/" + newName);
      const uploadTask = uploadBytesResumable(storageRef, filse);

      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(uploadProgress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setthumbnailUrl(downloadURL);
          });
        }
      );
    } else if (data.thumbnailUrl.length !== 1) {
      setthumbnailUrl(book.thumbnailUrl);
    }
  };
  useEffect(() => {
    const myObj = {
        bookisbn,
        title,
        pageCount,
        publishedDate,
        shortDescription,
        longDescription,
        thumbnailUrl,
        status,
        categories,
        authors,
      };
      UpdateBook(myObj)();
  }, [thumbnailUrl]);
  return (
    <div className="container mx-auto px-36">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputbook">
          <p> ชื่อหนังสือ </p>
          <input
            type="text"
            {...register("title")}
            placeholder="ชื่อหนังสือ"
            className="boxdata input input-bordered input-info input-sm w-full max-w-md"
            defaultValue={book?.title ? book.title : null}
          />
        </div>
        <div className="inputbook">
          <p> จำนวนหน้า </p>
          <input
            type="number"
            {...register("pageCount")}
            placeholder="จำนวนหน้า"
            className="boxdata input input-bordered input-info input-sm w-full max-w-md"
            defaultValue={book?.pageCount ? book.pageCount : null}
          />
        </div>
        <div className="inputbook">
          <p> วันตีพิม </p>
          <input
            type="date"
            {...register("publishedDate")}
            placeholder="วันตีพิม"
            className="boxdata input input-bordered input-info input-sm w-full max-w-md"
          />
        </div>
        <div className="inputbook">
          <p> คำอธิบายสั้น </p>
          <textarea
            {...register("shortDescription")}
            placeholder="คำอธิบายสั้น"
            className="textarea textarea-info textarea-sm w-full max-w-md boxdata"
            defaultValue={book?.shortDescription ? book.shortDescription : null}
          ></textarea>
        </div>
        <div className="inputbook">
          <p> คำอธิบายยาว </p>
          <textarea
            {...register("longDescription")}
            placeholder="คำอธิบายยาว"
            className="textarea textarea-info textarea-sm w-full max-w-md boxdata"
            defaultValue={book?.longDescription ? book.longDescription : null}
          ></textarea>
        </div>

        <div className="inputbook">
          <p> รายชื่อผู้แต่ง </p>
          <div className="w-full max-w-md">
            <div className="pb-5">
              <input
                type="text"
                {...register("authors1")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
                defaultValue={book?.authors ? book.authors[0] : null}
              />
            </div>
            <div className="pb-5">
              <input
                type="text"
                {...register("authors2")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
                defaultValue={book?.authors ? book.authors[1] : null}
              />
            </div>
            <div>
              <input
                type="text"
                {...register("authors3")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
                defaultValue={book?.authors ? book.authors[2] : null}
              />
            </div>
          </div>
        </div>
        <div className="inputbook">
          <p> รูปภาพ </p>
          <input
            type="file"
            id="myFileInput"
            {...register("thumbnailUrl")}
            placeholder="authors"
            className="boxdata file-input file-input-bordered file-input-info w-full max-w-md"
          />
        </div>
        <div className="inputbook">
          <p> ประเภทหนัวสือ </p>
          <div className="w-full max-w-md">
            <div className="pb-5">
              <input
                type="text"
                {...register("categories1")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
                defaultValue={book?.categories ? book.categories[0] : null}
              />
            </div>
            <div className="pb-5">
              <input
                type="text"
                {...register("categories2")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
                defaultValue={book?.categories ? book.categories[1] : null}
              />
            </div>
            <div className="pb-5">
              <input
                type="text"
                {...register("categories3")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
                defaultValue={book?.categories ? book.categories[2] : null}
              />
            </div>
          </div>
        </div>
        <div className="inputbook">
          <p> สถานะ </p>
          <select
            {...register("status")}
            className="boxdata select select-info select-sm w-full max-w-md"
          >
            <option value="">{book?.status ? book.status : null}</option>
            <option value="PUBLISH">PUBLISH</option>
            <option value="MEAP">MEAP</option>
          </select>{" "}
        </div>
        <div className="inputbook">
          <p> </p>
          <button
            className="btn btn-outline btn-success w-18 h-12"
            type="submit"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditBookid;
