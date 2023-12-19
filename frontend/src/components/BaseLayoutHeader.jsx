
import { useNavigate } from "react-router-dom"
import { Layout, Typography, Row, Col, Tooltip, Modal, Button, Input } from 'antd';
import { SearchOutlined, BookOutlined, UserOutlined, ArrowUpOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { userApi } from "../api/user";
import { useState } from "react";

const { Header } = Layout;
const { Title } = Typography;

const Upload = () => {
    const navigate = useNavigate();

    const handleUpload = async () => {
      const response = await userApi.getCurrentUser();
      if( response && response.status === 200 ){
        console.log(response.data);
        if( response.data.permission > 1 ){
          navigate('/edit/book');
        } 
        else {
          Modal.error({
            title: 'Error',
            content: 'Please Join as an member to upload books.',
            okText: 'Join Member',
            cancelText: 'Cancel',
            closable: "true",
            onOk: () => {
              navigate('/member');
            }
          })
        }
      } else {
        Modal.error({
          title: 'Error',
          content: response.data,
        })
      }
    };

    return (
      <Tooltip title="Upload Book">
        <Button onClick={handleUpload} type='text' icon={<ArrowUpOutlined style={{ fontSize: '20px'}} />} size='large' />
      </Tooltip>
    );
};
const User = () => {
    const navigate = useNavigate();

    const handleUser = () => {
      navigate('/edit/');
    };

    return (
      <Tooltip title="View Profile">
        <Button onClick={handleUser} type='text' icon={<UserOutlined style={{ fontSize: '20px'}} />} size='large' />
      </Tooltip>
    );
};



const BaseLayoutHeader = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const onClickSearch = () => {
    setOpen(true);
  }
  const onClickCollections = () => {
    navigate('/books/filter?type=collection')
  }
  const onClickPurchased = () => {
    navigate('/books/filter?type=purchased')
  }
  

  return (
    <Header style={{ backgroundColor: '#FFCC99', display: 'flex', justifyContent: 'space-between', paddingLeft: 0, paddingTop: 30, alignItems: 'center' }}>
      <Modal
        title="Search by book's name"
        open={open}
        okText="Search"
        cancelText="Cancel"
        closable={true}
        onOk={() => {navigate(`/books/filter?type=search&name=${searchValue}`); setOpen(false)}}
        onCancel={() => setOpen(false)}
      >
        <Input placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
      </Modal>
      <Row align="middle" justify="start" gutter={16}>
        <Col>
          <Title level={1} style={{ color: '#FC9F42', margin:'auto',marginBottom:'10px'}}>TaleHug</Title>
        </Col>
        <Col>
          <Button onClick={() => navigate('/books/')} type='text' icon={<HomeOutlined style={{ fontSize: '20px'}} />} size='large' />
          
        </Col>
      </Row>
      <Row align="middle" gutter={32}>
        <Col>
          <Tooltip title="TODO">
            <Button onClick={onClickSearch} type='text' icon={<SearchOutlined style={{ fontSize: '20px'}} />} size='large' />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="View Collections">
            <Button onClick={onClickCollections} type='text' icon={<BookOutlined style={{ fontSize: '20px'}} />} size='large' />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="View Purchased Books">
            <Button onClick={onClickPurchased} type='text' icon={<ShoppingCartOutlined style={{ fontSize: '20px'}} />} size='large' />
          </Tooltip>
        </Col>
        <Col>
            <Upload/>
        </Col>
        <Col>
            <User />
        </Col>
      </Row>
    </Header>
  );
};

export default BaseLayoutHeader;