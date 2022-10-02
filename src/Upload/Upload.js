import { Form, Divider, Input, Button } from 'antd';
// import '../scss/upload.css';
import 'antd/dist/antd.min.css';
import { useState } from 'react';
import { dbService } from '../fbase'
import { storageService } from '../fbase'



const Upload = ({userObj}) => {

    const [form] = Form.useForm();
    // 서버로 전달하기위해 하나의 input값으로 지정 textData
    const [input, setInput] = useState({
        seller: '',
        name: '',
        price: '',
        description: '',
        fileName : ''
    }) 
    const {seller, name, price, description} = input

    var [file, setFile] = useState(null); //storge에 넣기위한 변수.
    
    
    
    const onChangeImage = ((event) => {
        file = event.target.files[0];
        setFile(file);
    }) //  
    
    const onChange = (e)=> {
        const {target: {name, value}} = e
        setInput({
            ...input,
            [name]: value
        })
    } //input갑에 저장하기 위한 함수

    const onClick = async () => {

        const questions = window.confirm(`이 상품을 올리시겠습니까?`)
        
        if (questions) {
            input.fileName = file.name; 
            
            await dbService.collection("goodsInfo").add({
                text: input,
                createdAt: Date.now(),
                creatorId: userObj.email // userObj: props로 넘겨준 login한 user 정보
            });
       
            storageService.ref()
                            .child('dogimg/' + file.name )
                            .put(file);
            setInput("")
            setFile(null)
            
        }
      };
 
    return (
        <div id="upload-container" className='inner'>      
            <Form name="productUpload"  form={form}>  
                <Form.Item name="imgUpload"
                    label={<div className='upload-label'>상품사진</div>}>
                    <div id="upload-img-placeholder">
                        <img src="images/icons/camera.png" alt="" />
                        <span>이미지를 업로드 해주세요.</span>
                        <input type={"file"}  onChange={onChangeImage}  />
                    </div>
                </Form.Item>
                <Divider/>
                <Form.Item name="seller" 
                    label={<div className='upload-label'>판매자명</div>}>
                    <Input  value={seller} onChange={onChange} className="nameUpload" size='large'
                    placeholder='판매자 이름을 입력하세요 ' name="seller" />
                </Form.Item>
                <Divider/>
                <Form.Item name="name"
                label={<div className='upload-label'>상품이름</div>}>
                    <Input
                         value={name}
                         onChange={onChange}
                        className='upload-name'
                        size='large'
                        placeholder='상품 이름을 입력해주세요'
                        name="name"/>
                </Form.Item>
                <Divider/>
                <Form.Item name="price"
                label={<div className='upload-label'>상품가격</div>}>
                    <Input type='number' onChange={onChange} value={price} defaultValue={0} size="large" name="price"/>
                </Form.Item>
                <Divider/>
                <Form.Item name="description"
                label={<div className='upload-label'>상품소개</div>}>
                <Input.TextArea
                     value={description}
                     onChange={onChange}
                    size='large'
                    id = "product-description"
                    name="description"
                    maxLength={300}
                    placeholder="상품 소개를 적어주세요"
                />
                </Form.Item>
                <Form.Item>
                    <Button id="submit-button" size="large" htmlType='submit' onClick={onClick} >
                        상품등록하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Upload;