import React from "react";
import { Link } from "react-router-dom";
import "../style/card.css";

const Card = (props) => {
  const { page, limit, databook } = props;
  const render = () => {
    const endIndex = limit * page;
    const startIndex = endIndex - limit;

    return databook.slice(startIndex, endIndex).map((book) => {
      // console.log(book.categories);
      return (
        <div key={book.id} className="justify-self-center mb-8">
          <div key={book.id} className="rectangle">
            <div className="BoxImg">
              <img src={book.thumbnailUrl} alt="Shoes" />
            </div>

            <div className="content">
              <Link
                to={`/BookDetails/?bookisbn=${book.isbn}`}
              >
                <h4 className="my-heading">{book.title}</h4>
              </Link>
              {/* <h4 className="my-heading">{book.title}</h4> */}
              <p className="TextCard pl-2.5 py-2">{book.authors[0]}</p>
              
              {book.categories.map((item) => {
                return (
                  <div className="ButCategory">
              <Link
                to={`/GroupSearch/?categories=${item}`}
              >
                <p className="TextCard">{item}</p>
              </Link>
                
              </div>
                )
              })}
              
            </div>
            {/* <Link className="btn w-12 h-12" 
            to={`/BookDetails/?bookisbn=${book.isbn}`}
            >
            รายละเอียด
            </Link> */}
          </div>
        </div>
      );
    });
  };

  return <>{render()}</>;
};

export default Card;
