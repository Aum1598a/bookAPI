import api from "../api";

export const fetchAllBook = () => async () => {
  const res = await api.get("/books");
  return res;
};

export const fetchBookDetails = (isbn) => async () => {
  const res = await api.get("/books/" + isbn);
  return res;
};

export const CreateBook = (myObj, data) => async () => {
  const res = await api.post("/books", {
    isbn: data.isbn,
    title: data.title,
    pageCount: +data.pageCount,
    publishedDate: {
      $date: data.publishedDate,
    },
    shortDescription: data.shortDescription,
    longDescription: data.longDescription,
    authors: myObj.authors,
    thumbnailUrl: myObj.imgURL,
    categories: myObj.categories,
    status: data.status,
  });
  return res;
};

export const DeleteBook = (isbn) => async () => {
  console.log(isbn);
  const res = await api.delete("/books/" + isbn);
  return res;
};

export const UpdateBook = (myObj) => async () => {
  console.log(myObj);
  const res = await api.put("/books/" + myObj.bookisbn ,{
    isbn: myObj.bookisbn,
    title: myObj.title,
    pageCount: +myObj.pageCount,
    publishedDate: {
      $date: myObj.publishedDate,
    },
    shortDescription: myObj.shortDescription,
    longDescription: myObj.longDescription,
    authors: myObj.authors,
    thumbnailUrl: myObj.thumbnailUrl,
    categories: myObj.categories,
    status: myObj.status,
  });
  return res;
};
