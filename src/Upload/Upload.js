import React, { useCallback } from 'react'
//import useInput from '@/hooks/useInput'
import { Form, Divider, Input, InputNumber, Button, List } from 'antd';
import '../scss/upload.css';
import 'antd/dist/antd.css';
import { useState } from 'react';

const Upload = (props) => {

  
    var file = null
    
    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);
        const handler = (event) => {
          setValue(event.target.value);
        };
        return [value, handler];
      }


    const [form] = Form.useForm();


    const [imgupload, setImgUpload] = useInput('');
    const [seller, setSeller] = useInput('');
    const [name, setName] = useInput('');
    const [price, setPrice] = useInput('')
    const [description, setDescription] = useInput('')
  

    
    const onChangeImage = ((event) => {
        
        file = event.target.files[0];
        console.log("file", file)

    })


    const onsubmitForm = useCallback(({ imgUpload, seller , name, price, description }) => {
       /*
        const value = {
            seller: seller,
            name: name,
            price: price,
            description: description   
          }
         */
        var formData = new FormData()
    
        
        formData.append( "seller", seller)
        formData.append( "name", name)
        formData.append( "price", price)
        formData.append( "description", description)
        formData.append(  "file", file  )
       
        
        for(  let str  of formData ) {
            console.log( str   )
        }

        // 파이어베이스? -> formData 넘겨줌 ->  파이어베이스 응답 ->  응답에 따라 처리(성공/실패) -> 성공 : 상세페이지로 이동 / 메인페이지로 이동 
        //                                                                                      -> 실패 : 무슨문젠지 알림 
        
      

    })
 
 
    
    return (
        <div id="upload-container" className='inner'>
            

            <Form name="productUpload" onFinish={onsubmitForm} form={form}>


                <Form.Item name="imgUpload"
                    label={<div className='upload-label'>상품사진</div>}>
                    <div id="upload-img-placeholder">
                        <img src="images/icons/camera.png" alt="" />
                        <span>이미지를 업로드 해주세요.</span>
                        <input type={"file"}  onChange={onChangeImage} />
                    </div>
                </Form.Item>
                <Divider/>
                <Form.Item name="seller" 
                    label={<div className='upload-label'>판매자명</div>}>
                    <Input className="nameUpload" size='large'
                    placeholder='판매자 이름을 입력하세요'/>
                </Form.Item>
                <Divider/>
                <Form.Item name="name"
                label={<div className='upload-label'>상품이름</div>}>
                    <Input
                        className='upload-name'
                        size='large'
                        placeholder='상품 이름을 입력해주세요'/>
                </Form.Item>
                <Divider/>
                <Form.Item name="price"
                label={<div className='upload-label'>상품가격</div>}>
                    <InputNumber defaultValue={0} size="large"/>
                </Form.Item>
                <Divider/>
                <Form.Item name="description"
                label={<div className='upload-label'>상품소개</div>}>
                <Input.TextArea
                    size='large'
                    id = "product-description"
                    maxLength={300}
                    placeholder="상품 소개를 적어주세요"
                />
                </Form.Item>
                <Form.Item>
                    <Button id="submit-button" size="large" htmlType='submit'>
                        상품등록하기
                    </Button>
                    
                </Form.Item>
            </Form>
        </div>
    );
};

export default Upload;