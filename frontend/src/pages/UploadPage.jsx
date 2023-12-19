import { Button, message, Flex, Form, Input, InputNumber, Modal, Upload, Typography } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { bookApi } from "../api/book";

//TODO: 這頁也可以拿來參考，基本上我是把上傳繪本的那頁跟功能做完了，基本上改的話就改 CSS 就好了，其他功能如果不清楚最好不要動XD

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const UploadPage = () => {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();

    const handleCancel = () => setPreviewOpen(false);
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const handlePreview = async (file) => {
        if( !file.url && !file.preview ){
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
        setPreviewTitle(file.name)
    }
    const uploadButton = (
        <div>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
            </div>
        </div>
    );

    const onShowModal = () => {
        setOpen(true);
    }

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Successfully Created Book!',
        });
    };
    const error = (error_message) => {
        messageApi.open({
          type: 'error',
          content: error_message,
        });
    };
    const warning = (error_message) => {
        messageApi.open({
          type: 'warning',
          content: error_message,
        });
    }

    const onClickSubmit = async () => {
        const bookname = form.getFieldValue('title');
        const description = form.getFieldValue('introduce');
        const category_name = form.getFieldValue('category_name');
        const age = form.getFieldValue('age');
        const price = form.getFieldValue('price');
        
        if( bookname === undefined || description === undefined || category_name === undefined || age === undefined || price === undefined || fileList.length === 0){
            warning('Please fill in all fields')
            return
        }
        else if( bookname === '' || description === '' || category_name === '' || age === '' || price === '' || fileList.length === 0){
            warning('Please fill in all fields')
            return
        }
        console.log(bookname, description, category_name, age, price)

        const formData = new FormData();
        fileList.forEach((file) => {
            //console.log(file.originFileObj)
            formData.append('images', file.originFileObj);
        });
        const categories = category_name.split(',');
        categories.forEach((category) => {
            formData.append('category_names[]', category.trim());
        });
        formData.append('bookname', bookname);
        formData.append('description', description);
        formData.append('age', age);
        formData.append('price', price);
        //console.log(formData);
        setLoading(true)
        const response = await bookApi.createBooks(formData);
        console.log(response);
        if( response.status === 200 ){
            success();
            form.resetFields();
            setFileList([]);
        } else {
            error(response.data);
        }
        setLoading(false);
    }

    return (
        <>
        <Flex justify="center" align="center" style={{width: 'full', height: 'full'}} gap={64} wrap="wrap">
            <Flex vertical style={{ width: '50%', height: 'full'}} >
                <Typography.Title>Upload Page</Typography.Title>
                <Form form={form} layout='vertical' style={{ width: 'full', height: 'full'}} >
                    <Form.Item label='' name='title'>
                        <Input placeholder='Title name' style={{ height: 64 }} />
                    </Form.Item>
                    <Form.Item label='' name='introduce'>
                        <TextArea rows={15} placeholder="Introduce" />
                    </Form.Item>
                    <Form.Item label='' name='category_name'>
                        <Input placeholder='adventure,mandarin,science' style={{ height: 64 }} />
                    </Form.Item>
                    <Form.Item label='' name='age'>
                        <InputNumber placeholder="Age" style={{ height: 32 }} />
                    </Form.Item>
                    <Form.Item label='' name='price'>
                        <InputNumber placeholder='Price' style={{ height: 32 }} />
                    </Form.Item>
                </Form>
            </Flex>
            <Flex vertical justify='space-evenly' align="center" style={{ width: '35%'}} gap={256} >
                <Button type='primary' style={{ borderRadius: 0, width: 256, height: 96, fontSize: 32 }} onClick={onShowModal}>Upload contents</Button>
                <Button loading={loading} type='primary' danger style={{ borderRadius: 0, width: 256, height: 88, fontSize: 32 }} onClick={onClickSubmit}>Create</Button>
            </Flex>
        </Flex>
        <Modal 
            title="Upload contents"
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
        >
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={(file) => {
                    setFileList([...fileList, file]);
                    return false;
                }}
            >
                {FileList.length >= 10 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                alt="example"
                style={{
                    width: '100%',
                }}
                src={previewImage}
                />
            </Modal>
        </Modal>
        {contextHolder}
        </>
    )
}

export default UploadPage