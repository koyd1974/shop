import React, { useEffect } from 'react';
import {Table} from 'react-bootstrap'   
import { useNavigate } from 'react-router-dom';
import { dbService } from './fbase';

const Comunity = (props) => {
  const navigate = useNavigate()
  
  const onClick = ()=> {
    navigate('/writing')
  }
    return(
      <div>
          <Table>
            <thead>
              <tr>
                <th>순번</th>
                <th> 제목 </th>
                <th>글쓴이</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td>안녕</td>
                <td>안녕</td>
              </tr>
            </tbody>
          </Table>
          <footer>
            <button onClick={onClick}>글 쓰기</button>
          </footer>
      </div>
    )
}
export default Comunity;