/* eslint-disable */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from "react-redux";
import { addCartItem } from "../store";

function ShoeDetail(props) {

    let dispatch = useDispatch()

    const [isEventInfo, setIsEventInfo] = useState(true); 
    const [count, setCount] = useState(0);
    const [tab, setTab] = useState(0);

    const {id} = useParams();
    const shoesList = props.shoes;
    const shoeData = shoesList.find(
        (shoe)=>{
            return shoe.id === Number(id)
        }
    );
    
    if (shoeData == null){
        return <div>Shoe not found</div>
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            setIsEventInfo(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(()=>{
        if (isNaN(count)){
            alert("유효한 숫자를 입력해주세요");
            setCount(0);
        } 
    }, [count]);

    return (
      <div className="container">
        {
            isEventInfo == true ? <EventInfo /> : null
        }
        
        <div className="row">
          <div className="col-md-6">
            <img src={shoeData.img} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{shoeData.title}</h4>
            <p>{shoeData.content}</p>
            <p>{shoeData.price} 원</p>

            {/* <label htmlFor="count">수량 입력 :</label>
            <input type="text" id="count" onChange={(e)=>{
                let v = e.target.value.trim()
                setCount(v);
            }} /> */}

            {/* <br/> */}

            <button className="btn btn-danger" onClick={()=>{
                dispatch(addCartItem({name: shoeData.title}))
            }}>주문하기</button> 
          </div>
        </div>

        <Nav variant="tabs" defaultActiveKey='link0'>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(0)}} eventKey='link0'>버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(1)}} eventKey='link1'>버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(2)}} eventKey='link2'>버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        
        <TabContent tabIdx={tab} tab={tab}/>

      </div> 
    )
  };

function TabContent(props){
    let tabIdx = props.tabIdx;

    const [fade, setFade] = useState('');

    useEffect(()=>{
        let t = setTimeout(()=>{
            setFade('ani-end');
        }, 50);

        return ()=>{
            setFade('');
            clearTimeout(t);
        }        

    }, [props.tab]);

    let result;

    if (tabIdx == 0){
        result = <div>내용0</div>
    }
    if (tabIdx == 1){
        result = <div>내용1</div>
    }
    if (tabIdx == 2){
        result = <div>내용2</div>
    }

    return (
        <div className={"ani-start " + fade} >
            {result}
        </div>
    )

    
};

function EventInfo(props) {
    return (
        <div className="alert alert-warning">
            5초 이내 구매시 할인 !!!
        </div>
    )
};

export default ShoeDetail;