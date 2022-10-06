import React from 'react';
import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

function Cart(props){
    return(
        <div>
    <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
     
</Table>
</div>
    )
}

export default Cart;