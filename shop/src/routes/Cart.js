/* eslint-disable */

import { Table } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, changeUser, removeCartItem } from '../store';
import Button from 'react-bootstrap/Button';

function Cart(props){

    let cartItems = useSelector((state)=>{return state.cartItems});
    // let userInfo =useSelector((state)=>{return state.user});

    let dispatch = useDispatch();

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>수량 변경</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map((item, i)=>{
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                    <td>
                                        <Button onClick={()=>{
                                            let info = {
                                                id: item.id,
                                                count: item.count + 1
                                            }
                                            dispatch(setCartItems(info))
                                        }} >+</Button>{' '}

                                        <Button onClick={()=>{
                                            let info = {
                                                id: item.id,
                                                count: item.count - 1
                                            }
                                            if (item.count <= 0){
                                                return;
                                            } else {
                                                dispatch(setCartItems(info));
                                            }

                                        }} >-</Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={()=>{
                                            dispatch(removeCartItem({id: item.id}))
                                        }}>
                                            항목제거
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
};

export default Cart;