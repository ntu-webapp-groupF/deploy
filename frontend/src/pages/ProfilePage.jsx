import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, BookOutlined, HeartOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import { userApi } from '../api/user.js';
import { Avatar, Button, Flex, Typography, Modal } from 'antd';


const ProfileComponent = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  const onLogout = async () => {
    Modal.confirm({
        title: 'Are you sure you want to log out?',
        okText: 'Yes',
        cancelText: 'No',
        async onOk() {
            const response = await userApi.logout();
            if( response && response.status === 200 ){
                navigate('/');
            } else {
                console.log(response);
            }
        }
    })
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await userApi.getCurrentUser();

      if (response && response.status===200) {
        console.log(response.data)
        setUser(response.data);
      }else{
        navigate('/users/login'); 
      }
    };
    fetchUserData();
  }, [navigate]);
  
  if (!user) {
    return <div>Loading...</div>;
  }

  //解構出 username
   const { username } = user;

   const onClickCollections = () => {
    navigate('/books/filter?type=uploaded')
   }
   const onClickPurchased = () => {
    navigate('/books/filter?type=purchased')
   }
   const onClickLike = () => {
    navigate('/books/filter?type=recommend')
   }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h1 style={{ fontSize: '50px' }}>Profile</h1>
      </div>

      <div style={{ fontSize: '20px' }}>Username: {username}</div>
      <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00', fontSize: '64px' }} size={128} shape='square'>{username[0].toUpperCase()}</Avatar>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '40%', fontSize: '30px', height: '45vh' }}>
        <Button style={{ height: '72px' }} type='text' onClick={() => navigate('/edit/profile')}>
            <Flex gap="large" align='center'>
                <EditOutlined style={{fontSize: '48px'}}/>
                <Typography.Text style={{fontSize: '24px'}}>CHANGE PASSWORD</Typography.Text>
            </Flex>
        </Button>
        <Button onClick={onClickCollections} style={{ height: '72px' }} type='text' >
            <Flex gap="large" align='center'>
                <BookOutlined style={{fontSize: '48px'}} />
                <Typography.Text style={{fontSize: '24px'}}>VIEW UPLOADED BOOKS</Typography.Text>
            </Flex>
        </Button>
        <Button onClick={onClickPurchased} style={{ height: '72px' }} type='text' >
            <Flex gap="large" align='center'>
                <ShoppingCartOutlined style={{fontSize: '48px'}}/>
                <Typography.Text style={{fontSize: '24px'}}>VIEW PURCHASED BOOKS</Typography.Text>
            </Flex>
        </Button>
        <Button onClick={onClickLike} style={{ height: '72px' }} type='text' >
            <Flex gap="large" align='center'>
                <HeartOutlined style={{fontSize: '48px'}}/>
                <Typography.Text style={{fontSize: '24px'}}>VIEW RECOMMEND BOOKS</Typography.Text>
            </Flex>
        </Button>
        <Button style={{ height: '72px' }} type='text' onClick={onLogout} >
            <Flex gap="large" align='center'>
                <LogoutOutlined style={{fontSize: '48px'}}/>
                <Typography.Text style={{fontSize: '24px'}}>LOGOUT</Typography.Text>
            </Flex>
        </Button>
      </div>
    </div>
  );
};

export default ProfileComponent