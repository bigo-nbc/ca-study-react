/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const blog_title = "React BLOG";
  // const [subject, setSubject] = useState('강남 우동 맛집');
  const [subject, setSubject] = useState(['강남 우동 맛집 1', '강남 우동 맛집 2', '강남 우동 맛집 3']);
  const [hit, setHit] = useState([0, 0, 0]);

  const [isModal, setModal] = useState(false);

  function incHit(){
    setHit(hit + 1);
  };

  function updateSubject(){
    let temp = [...subject];
    temp[0] = '노원 우동 맛집 1';
    setSubject(temp);
  };

  function sortSubject(){
    let temp = [...subject];
    // let sortType = "desc";
    temp.sort();
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
              <h4 onClick={ ()=>{setModal(!isModal)} }>
                {item} 
                <span onClick={ ()=>{ handleHit(i) }}> 👍 </span>
                {hit[i]}
                <p>2 month 17 day create</p>
              </h4>
            </div>
          )
        })
      }

      {/* Detail */}
      {
        isModal == true ? <Modal subject={subject} setSubject={updateSubject}/> : null
      }

    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.subject[0]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={ ()=>{props.setSubject()} }>글수정</button>
    </div>
  )
};

export default App;
