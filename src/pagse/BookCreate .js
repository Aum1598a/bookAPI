import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CreateBook } from "../action";
import "../style/BookCreate.css";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const BookCreate = () => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState();
  const [categories, setCategories] = useState();
  const [authors, setAuthors] = useState();
  const [imgURL, setImgURL] = useState(``);

  const onSubmit = (data) => {
    const filse = document.querySelector("input[id=myFileInput]").files[0];
    setResultImg(filse);
    uploadFileFirebase(filse);
    console.log(data);
    categorie(data);
    setResult(data);
  };
  const categorie = (data) => {
    const category = [];
    const author = [];
    category.push(data.categories1);
    category.push(data.categories2);
    category.push(data.categories3);
    author.push(data.authors1);
    author.push(data.authors2);
    author.push(data.authors3);
    const category1 = category.filter((item) => item.trim() !== "");
    const author1 = author.filter((item) => item.trim() !== "");
    setCategories(category1);
    setAuthors(author1);
  };
  const [resultImg, setResultImg] = useState();
  const [progress, setprogress] = useState(0);

  const uploadFileFirebase = async (file) => {
    const userID = "001";
    const timestamp = Math.floor(Date.now() / 1000);
    const newName = userID + "_" + timestamp;

    const storageRef = ref(storage, "images/" + newName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(uploadProgress);
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
        });
      }
    );
  };
  useEffect(() => {
    const myObj = {
      categories,
      authors,
      imgURL,
    };
    console.log(myObj);
    CreateBook(myObj, result)();
  }, [imgURL]);

  return (
    <div className="container mx-auto px-36">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputbook">
          <p> id </p>
          <input
            type="text"
            {...register("isbn")}
            placeholder="id"
            className="boxdata input input-bordered input-info input-sm w-full max-w-md"
          />
        </div>
        <div className="inputbook">
          <p> ชื่อหนังสือ </p>
          <input
            type="text"
            {...register("title")}
            placeholder="ชื่อหนังสือ"
            className="boxdata input input-bordered input-info input-sm w-full max-w-md"
          />
        </div>
        <div className="inputbook">
          <p> จำนวนหน้า </p>
          <input
            type="number"
            {...register("pageCount")}
            placeholder="จำนวนหน้า"
            className="boxdata input input-bordered input-info input-sm w-full max-w-md"
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
          ></textarea>
        </div>
        <div className="inputbook">
          <p> คำอธิบายยาว </p>
          <textarea
            {...register("longDescription")}
            placeholder="คำอธิบายยาว"
            className="textarea textarea-info textarea-sm w-full max-w-md boxdata"
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
              />
            </div>
            <div className="pb-5">
              <input
                type="text"
                {...register("authors2")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
              />
            </div>
            <div>
              <input
                type="text"
                {...register("authors3")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
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
              />
            </div>
            <div className="pb-5">
              <input
                type="text"
                {...register("categories2")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
              />
            </div>
            <div className="pb-5">
              <input
                type="text"
                {...register("categories3")}
                placeholder="ประเภทหนัวสือ"
                className="boxdata input input-bordered input-info input-sm w-full "
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
            <option value="">สถานะ</option>
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
export default BookCreate;
