import React from 'react';

const Footer = () => {
    return (
        <div id="footer">
            <div id="footer-info">
                <div className='inner'>
                    <div>
                        <h5>무통장 입금계좌</h5>
                        <p>카카오뱅크</p>
                        <p>123-456-789</p>
                        <p>KOREA IT 아카데미</p>
                    </div>
                    <div>
                        <h5>고객센터</h5>
                        <p>영업시간 이외에는 문의 게시판을 이용해주시면 담당자 확인 후 빠른 답변 도와드리겠습니다.</p>
                        <p>02-123-123</p>
                    </div>
                    <div>
                   
                    </div>
                </div>
            </div>
            <div id="footer-copy">
                <div id="copyright">
                    <div className='inner'>
                        상호 : KOREA IT  주소 : 서울특별시 서대문구 신촌 어딘가<br/>
                        대표전화 : 02-123-1234 대표이사 : 코리아 <br/>  
                        개인정보관리자 : 아이티 사업자 등록번호 : 1234-44-123
                        {/* <footer>{`Copyright © Upbeat Code ${year}`}</footer>; */}
                    </div>      
                    
                </div>
            </div>
        </div>
    );
};

export default Footer;