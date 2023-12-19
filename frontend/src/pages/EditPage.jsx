// TODO: 使用者更新資料頁面
import { Avatar, Input, message, Modal } from "antd";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/user.js';

const EditPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => {
        messageApi.open({
          type: 'success',
          content: msg,
        });
    }
    const error = (msg) => {
        messageApi.open({
          type: 'error',
          content: msg,
        });
    }

    const updateUser = async () => {
        const response = await userApi.edit(username, oldPassword, newPassword);
        console.log(response);
        if( response && response.status === 200 ){
            success('Successfully Updated User! Logging out...');
            setTimeout(async () => {
              await userApi.logout();
              setUsername('');
              setOldPassword('');
              setNewPassword('');
              navigate('/');
            }, 3000); // Delay for 3 seconds (5000 milliseconds)
        } else {
            error(response.data);
        }
    }

    const handleSubmit = async () => {
        Modal.confirm({
            title: 'Are you sure you want to update?',
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                await updateUser();
            }
        })
    };

    useEffect(() => {
        const fetchUserData = async () => {
          const response = await userApi.getCurrentUser();
          if (response && response.status===200) {
            setUser(response.data);
          }else{
            navigate('/users/login'); 
          }
        };
        fetchUserData();
    }, [navigate]);

    if (!user ) {
        return <div>Loading...</div>;
    }
    
    return (
      <div style={{display:'flex',justifyContent:'center'}}>
        {contextHolder}
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '70vh',
            backgroundColor: '#F9D5B0',
            width:'60vh'
          }}>

            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              paddingTop: '50px'
            }}>
              <h1>Change Password</h1>
            </div>
      
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
              width: '100%',
              paddingTop: '50px'
            }}>

              {/* Logo container content goes here */}
              <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00', fontSize: '64px' }} size={128} shape='square'>{user ? user.username[0].toUpperCase() : 'W'}</Avatar>

            </div>
      
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '45vh',
              margin: 'auto'
            }}>
              <Input placeholder='user name' style={{
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }} 
              value={username} onChange={(e) => setUsername(e.target.value)}/>

              <Input.Password placeholder="old password" style={{
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>

              <Input.Password placeholder="new password" style={{
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>


              <button type="submit" style={{
                padding: '10px 20px',
                backgroundColor: 'orange',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
    );
}

export default EditPage