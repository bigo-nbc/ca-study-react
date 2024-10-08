/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';




function App() {

  const blog_title = "React BLOG";
  const [subject, setSubject] = useState(['강남 우동 맛집 1', '강남 우동 맛집 2', '강남 우동 맛집 3']);

  let hitItem = [];
  hitItem = subject.map(()=>{
    return 0;
  })
  const [hit, setHit] = useState(hitItem);
  const [addList, setaddList] = useState('');


  const [isModal, setModal] = useState(false);

  const [modalIdx, setModalIdx] = useState(0);

  function updateSubject(){
    let temp = [...subject];
    temp[0] = '노원 우동 맛집 1';
    setSubject(temp);
  };

  function handleHit(i){
    let temp = [...hit];
    temp[i] += 1;
    setHit(temp)
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
            <div className="list" key={i}>
              <h4 onClick={ ()=>{
                setModal(!isModal);
                setModalIdx(i);
              } }>
                {item} 
                <span onClick={ (e)=>{ 
                  e.stopPropagation();
                  handleHit(i); 
                  }}> 👍 </span>
                {hit[i]}
                <p>2 month 17 day create</p>
              </h4>
              <button className='delete-btn' onClick={()=>{
                let temp = [...subject];
                temp.splice(i, 1);
                setSubject(temp);

                let hitItem = [...hit];
                hitItem.splice(i, 1);
                setHit(hitItem);
              }}>삭제</button>
            </div>
          )
        })
      }

      {/* Detail */}
      {
        isModal == true ? <Modal subject={subject} setSubject={updateSubject} modaldx={modalIdx}/> : null
      }

      <input onChange={(e)=>{ setaddList(e.target.value) }}></input>
      <button className='add-btn' onClick={()=>{

        if (addList.trim() == ''){
          alert('게시글 내용이 없습니다. ')
          return;
        } 

        let temp = [...subject];
        temp.push(addList);
        setSubject(temp);
        let hitItem = [...hit];
        hitItem.push(0);
        setHit(hitItem);

      }}>추가</button>


    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.subject[props.modaldx]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
};

export default App;
