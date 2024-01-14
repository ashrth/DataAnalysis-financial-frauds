import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const AddTicketForm = () => {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <Button type='primary' className='bg-primary max-w-[120px]' onClick={() => setModal2Open(true)}>
        Add Ticket
      </Button>
      <Modal
        title="Add Ticket"
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
        okButtonProps={{
          className: 'bg-primary',
        }}
        okText="Submit"
      >
        <Form
          className='my-10'
          autoComplete='off'
          initialValues={{remember: true}}
        >
          <Form.Item
            name='account_no'
            rules={[
              {
                required: true,
                message: 'Please enter Account No'
              }
            ]}
          >
            <Input placeholder='Account No' />
          </Form.Item>

          <Form.Item
            name='title'
            rules={[
              {
                required: true,
                message: 'Please enter title'
              }
            ]}
          >
            <Input placeholder='Title' />
          </Form.Item>

          <Form.Item
            name='description'
            rules={[
              {
                required: true,
                message: 'Please enter description'
              }
            ]}
          >
            <TextArea rows={3} placeholder='Description' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddTicketForm;