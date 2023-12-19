import { Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { userApi } from '../api/user';
import './MemberPage.css';

// TODO: 會員的頁面
const MemberPage = () => {
    const [user, setUser] = useState(null)
    const [messageApi, contextHolder] = message.useMessage();
    const [isFreeBoxClicked, setIsFreeBoxClicked] = useState(false);
    const [isPremiumBoxClicked, setIsPremiumBoxClicked] = useState(true);
    const handleFreeBoxClick = () => {
        if(!isFreeBoxClicked){
            setIsFreeBoxClicked(!isFreeBoxClicked);
            setIsPremiumBoxClicked(false);
        }
    };

    const handlePremiumBoxClick = () => {
        if(!isPremiumBoxClicked){
            setIsFreeBoxClicked(false);
            setIsPremiumBoxClicked(!isPremiumBoxClicked);
        }
    };

    useEffect(() => {
      const fetchUser = async () => {
        const response = await userApi.getCurrentUser();
        if( response && response.status === 200 ){
          setUser(response.data);
        } else {
          window.location.href = '/users/login';
        }
      }
      fetchUser();
    }, [])

    useEffect(() => {
      document.body.style.backgroundImage = `url()`;
    }, [])

    

    const handleNextClick = () => {
      if (isFreeBoxClicked) {
        Modal.confirm({
          title: 'Are you sure you want to join as free member?',
          okText: 'Yes',
          cancelText: 'No',
          async onOk() {
            window.location.href = '/books';
          }
        })
      } else if (isPremiumBoxClicked) {
        Modal.confirm({
          title: 'Are you sure you want to join as premium member?',
          okText: 'Yes',
          cancelText: 'No',
          async onOk() {
            if( user !== null ){
              const response = await userApi.joinMember(user.id ? user.id : user.data.id);
              if( response && response.status === 200 ){
                messageApi.success({
                  content: 'Join as premium member successfully! Redirecting to main page after 3 seconds....',
                })
                setTimeout(() => {
                  window.location.href = '/books/';
                }, 3000); // Delay for 3 seconds (5000 milliseconds)
              } else {
                messageApi.error({
                  content: response.data,
                })
              }
            }
          }
        })
      }
      // Add other conditions if needed
    };
    return (
        <>
            {contextHolder}
            <div id="memberPage" >
            <div id="title2">Choose the plan that’s right for you</div>
            <div id="freeBox"  onClick={handleFreeBoxClick} style={{ backgroundColor: isFreeBoxClicked ? '#FF870E' : 'rgba(255, 135, 14, 0.30)' }}/>
            <div id="premiumBox" onClick={handlePremiumBoxClick}  style={{ backgroundColor: isPremiumBoxClicked ? '#FF870E' : 'rgba(255, 135, 14, 0.30)' }}/>
            <div onClick={handleFreeBoxClick} style={{width: 92, height: 49, left: 645, top: 375, position: 'absolute', color: 'white', fontSize: 40, fontFamily: 'Optima', fontWeight: '900', wordWrap: 'break-word',cursor: 'pointer'}}>Free</div>
            <div onClick={handlePremiumBoxClick}style={{width: 224, height: 52, left: 944, top: 373, position: 'absolute', color: 'white', fontSize: 40, fontFamily: 'Optima', fontWeight: '900', wordWrap: 'break-word',cursor: 'pointer'}}>Premium</div>
            <div style={{width: 274, height: 49, left: 64, top: 578, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Optima', fontWeight: '400', wordWrap: 'break-word'}}>Monthly price</div>
            <div style={{width: 274, height: 49, left: 64, top: 721, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Optima', fontWeight: '400', wordWrap: 'break-word'}}>Book quality</div>
            <div style={{width: 90, height: 49, left: 642, top: 721, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Optima', fontWeight: '400', wordWrap: 'break-word'}}>Low</div>
            <div style={{width: 90, height: 49, left: 1000, top: 578, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Optima', fontWeight: '400', wordWrap: 'break-word'}}>$70</div>
            <div style={{width: 90, height: 49, left: 642, top: 581, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Optima', fontWeight: '400', wordWrap: 'break-word'}}>Free</div>
            <div style={{width: 90, height: 49, left: 1000, top: 721, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Optima', fontWeight: '400', wordWrap: 'break-word'}}>High</div>
            <div style={{width: 1348, height: 0, left: 36, top: 681, position: 'absolute', border: '1px rgba(0, 0, 0, 0.60) solid'}}></div>
            <div style={{width: 1348, height: 0, left: 36, top: 807, position: 'absolute', border: '1px rgba(0, 0, 0, 0.60) solid'}}></div>
            <div onClick={handleNextClick}  style={{width: 298, height: 87, padding: 10, left: 720, top: 861, position: 'absolute', background: '#FF870E', borderRadius: 2, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex',cursor: 'pointer'}}>
                <div style={{textAlign: 'center', color: 'white', fontSize: 40, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 27.50, wordWrap: 'break-word'}}>Next</div>
            </div>
            <div style={{width: 78, height: 74, left: 64, top: 274, position: 'absolute', background: '#FF870E'}}></div>
            <div style={{width: 78, height: 74, left: 64, top: 367, position: 'absolute', background: '#FF870E'}}></div>
            <div style={{left: 175, top: 404, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Roboto Condensed', fontWeight: '700', wordWrap: 'break-word'}}>Recommendations just for you.</div>
            <div style={{left: 175, top: 297, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Roboto Condensed', fontWeight: '700', wordWrap: 'break-word'}}>Change or cancel your plan anytime.</div>
            </div>
        </>
    )
}

export default MemberPage