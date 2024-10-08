/* eslint-disable */

import {useEffect, useState} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SHOE_INFO, WATCH_INFO} from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import ShoeDetail from './routes/ShoeDetail';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Cart from './routes/Cart';

function App() {

  const [shoes, setShoes] = useState(SHOE_INFO);
  const [moreCount, setMoreCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const navigate = useNavigate();

  let tempWatched = [];

  // 최초 local storage 세팅
  useEffect(()=>{
    if (!localStorage.getItem('watched')){
      localStorage.setItem('watched', JSON.stringify([]))
    } else {
      let watchedItems = JSON.parse(localStorage.getItem('watched'))
      if (watchedItems.length == 0){
        setIsWatched(false);
      } else {
        tempWatched = watchedItems
        setIsWatched(true);
      }
    }
  }, []);


  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeStore</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ ()=>{navigate('/')} }>Home</Nav.Link>
            <Nav.Link onClick={ ()=>{navigate('/detail')} } >Detail</Nav.Link>
            <Nav.Link onClick={ ()=>{navigate('/cart')} } >Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' >
              {
                isWatched == true ? <WatchedPopup isWatched={isWatched} setIsWatched={setIsWatched}/> : null
              }
            </div>
            <Container>
              <Row>
                {
                  shoes.map((item, i)=>{
                    return (
                      <ShoeItem item={item} key={i} isWpopup={setIsWatched}/>
                    );
                  })
                }
              </Row>
            </Container>

            {
              isLoading == true
              ? <LoadingSpinner />
              : null
            }

            <button onClick={()=>{

              setIsLoading(true);

              let mCount = moreCount;
              mCount = mCount + 1;

              axios.get('https://codingapple1.github.io/shop/data' + mCount + '.json')
              .then((ret)=>{
                let beforeShoesData = [...shoes];
                let newShoesData = ret.data
                newShoesData.map((item)=>{
                  let idx = item.id + 1
                  item['img'] = `https://codingapple1.github.io/shop/shoes${idx}.jpg`
                });

                let afterShoesData = [...beforeShoesData, ...newShoesData];
                setShoes(afterShoesData);
                setMoreCount(mCount);
              })
              .catch((e)=>{
                // alert(`실패함 !!! ${e.message}`);
                alert('추가 데이터가 없습니다.');
              });
              
              setIsLoading(false);

            }}>더 보기</button>


          </>
        } />

        

        <Route path='/detail/:id' element={<ShoeDetail shoes={shoes}/>} />

        <Route path='/cart' element={<Cart />}/>


        <Route path='/about' element={<ShoeDetail />} />

        
        
        <Route path='/*' element={<div>404</div>} />
      </Routes>


      {/* <button onClick={ ()=>{
          let temp = [...shoes];
          temp.sort((a, b) => a.title.localeCompare(b.title));  // 제목을 기준으로 알파벳순 정렬
          setShoes(temp);
        } }>상품정렬</button> */}

      
     

    </div>
  );
}

function LoadingSpinner(props) {
  return (
    <div>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

function ShoeItem(props){

  const navigate = useNavigate(); 
  const handleClick = () => {
    
    let befWatchItems = localStorage.getItem('watched')
    befWatchItems = JSON.parse(befWatchItems)

    let tempItem = befWatchItems.find((item)=>{
      return item.id === props.item.id
    })

    if (tempItem == null){
      befWatchItems.push({
        id: props.item.id,
        name: props.item.title
      })
    }

    if (befWatchItems.length > 5) {
      befWatchItems = befWatchItems.slice(-5); // 맨 뒤 5개만 남김
    }

    localStorage.setItem('watched', JSON.stringify(befWatchItems))
    props.isWpopup(true)
    navigate(`/detail/${props.item.id}`); 
  };

  return (
    <Col sm={6} md={4}>
      <img src={props.item.img} width="80%" onClick={handleClick} style={{cursor: 'pointer'}}/>
      <h4>{props.item.title}</h4> 
      <p>{props.item.content}</p>
      <p>{props.item.price}</p>
    </Col>
  );
};

function WatchedPopup(props){

  const [fade, setFade] = useState('');

  useEffect(()=>{
    let t = setTimeout(()=>{
        setFade('ani-end');
    }, 50);

    return ()=>{
        setFade('');
        clearTimeout(t);
    }        

  }, [props.isWatched]);

  let wItems = localStorage.getItem('watched')
  wItems = JSON.parse(wItems)

  return (
    <div className={"ani-start " + fade} >
      <div className="watched-modal">
        <h4>최근 본 상품</h4>
          <p></p>
          <div style={{ textAlign: 'left', paddingLeft: '40px' }}>
            {
              wItems.map((item, i)=>{
                return <p key={i}>{item.name}</p>
              })
            }
          </div>
          <button onClick={()=>{
            localStorage.setItem('watched', JSON.stringify([]))
            props.setIsWatched(false)
          }}>항목 삭제</button>
      </div>
    </div>
  )
}

export default App;
