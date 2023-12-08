import React, { useEffect, useState } from "react";

const Example = () => {
  const [list, setList] = useState([
    { name: "철수" },
    { name: "영희" },
    { name: "민수" },
  ]);

  const addItem = () => {
    setList([{ name: "정국" }, ...list]);
  };

  const delItem = () => {
    setList(list.filter((l) => l.name !== "철수"));
  };

  return (
    <>
      {/* 추가 버튼과 삭제 버튼*/}
      <input type="button" value="추가" onClick={addItem} />
      <input type="button" value="삭제" onClick={delItem} />

      <h2> Show Problem Example</h2>
      {list.map((v, index) => (
        /*  div 태그의 key로 배열의 index 사용*/
        <div key={index}>
          {" "}
          {v.name}, idx: {index} <input type="text" />{" "}
        </div>
      ))}
    </>
  );
};

export default Example;
