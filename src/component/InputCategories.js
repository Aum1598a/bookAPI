import React, { useState, useEffect } from "react";

const InputCategories = (props) => {
  const { categorie } = props;
  

  const categories = () =>{
    console.log("sss");
  }

  return (
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="ประเภทหนัวสือ"
          className="boxdata input input-bordered input-info input-sm w-full "
          defaultValue = {categorie}
          onChange={(e) => categories()}
        />
      </div>
  );
};

export default InputCategories;
