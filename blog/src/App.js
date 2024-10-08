/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

let LIST_ITEM = [
  {
    title: "메모 1",
    hit_count: 0,
    create_at: "2024-01-01"
  },
  {
    title: "메모 2",
    hit_count: 0,
    create_at: "2024-01-01"
  },
  {
    title: "메모 3",
    hit_count: 0,
    create_at: "2024-01-01"
  }
]

let EMPTY_ITEM_FORM = {
  title: "",
  hit_count: 0,
  create_at: ""
}


function App() {

  const blog_title = "React BLOG";
  const [subject, setSubject] = useState(LIST_ITEM);
  const [isModal, setIsModal] = useState(false);
  const [selectItem, setSelectItem] = useState(0);
  const [addItem, setAddItem] = useState(EMPTY_ITEM_FORM);

  function increaseHit(i){
    let temp = [...subject];
    temp[i].hit_count += 1;
    setSubject(temp);
  };

  function preListItem(v){
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0'); 
    let day = String(now.getDate()).padStart(2, '0'); 
    let formattedDate = `${year}-${month}-${day}`;
    
    let addItem = {
      title: v,
      hit_count: 0,
      create_at: formattedDate 
    }
    setAddItem(addItem);
  };

  function addListItem(){
    if (addItem.title.trim() == "") {
      alert('게시글 내용이 없습니다. ')
      return;
    }

    let tempSubject = [...subject];
    tempSubject.push(addItem);
    setSubject(tempSubject);
  };

  function deleteListItem(i){
    let tempSubject = [...subject];
    tempSubject.splice(i, 1);
    setSubject(tempSubject);
  };

  return (
    <div className="App">

      {/* Title */}
      <div className="black-nav">
        <h4>{blog_title}</h4>
      </div>

      {/* List */}
      {
        subject.map((item, i)=>{
          return (
            <div className='list' key={i}>
              <h4
                onClick={()=>{
                  setSelectItem(i);
                  setIsModal(!isModal);
                }}
              >{item.title}
                <span 
                  onClick={(e)=>{
                    e.stopPropagation();
                    increaseHit(i);
                  }}
                > 👍 </span>
                <span>{item.hit_count}</span>
                <p>{item.create_at}</p>
              </h4>

              {/* Delete List Item */}
              <button className='delete-btn' onClick={()=>{ deleteListItem(i); }}>삭제</button>
            </div>
          );
        })
      }

      {/* Detail */}
      {
       isModal == true ? <Modal modalIndex={selectItem} listItem={subject} /> : null
      }

      {/* Add List Item */}
      <input onChange={(e)=>{ preListItem(e.target.value); }} />
      <button className='add-btn' onClick={()=>{ addListItem(); }}> 추가 </button>
    </div>
  );
}

function Modal(props) {
  let idx = props.modalIndex
  let item = props.listItem[idx]

  return (
    <div className="modal">
      <h4>{item.title}</h4>
      <p>{item.create_at}</p>
      <span>👍</span>
      <span>{item.hit_count}</span>
    </div>
  )
};

export default App;
