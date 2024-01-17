import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title:'pancard details',
    dataIndex: 'pan',
    key:'pan',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Status',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if(tag=='low')
          {
            color='green';
          }
          if (tag === 'high') {
            color = 'volcano';
          }
          if(tag==='med')
          {
            color='yellow';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Report {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
  {
    title: 'Bank_details',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link to="/track-account">analyze</Link>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'abdul',
    age: 32,
    pan :'ATX34344343',
    address: '-',
    tags: ['high'],
  },
  {
    key: '1',
    name: 'sumit kumar',
    age: 32,
    pan :'ATX34344336',
    address: 'Chopasni Housing Board, Jodhpur, Rajasthan 342008,',
    tags: ['med'],
  },
  
  {
    key: '2',
    name: 'ayush gautam',
    age: 42,
    pan :'ATX54211243',
    address: 'Station Rd, Jodhpur, Rajasthan 342001, India',
    tags: ['high'],
  },
  {
    key: '3',
    name: 'puja singh',
    age: 32,
    pan :'AT433543213',
    address: "A-54A3, Golf Link Road, Arvind Nagar, Air Force Area,rajasthan",
    tags: ['low'],
  },
  {
    key: '3',
    name: 'ananya kar',
    age: 32,
    pan :'DSASFTX3434',
    address: 'Not available',
    tags: ['med'],
  },
  {
    key: '3',
    name: 'shalu roy',
    age: 32,
    pan :'GHTX3434343',
    address: '53,Ashok Nagar,jaipur, Rajasthan 342001, India',
    tags: ['high'],
  },
  {
    key: '3',
    name: 'sana seth',
    age: 32,
    pan :'5TX343343565',
    address: 'D-9107 akshar bhawan ,Jaipur, Rajasthan 302021, India',
    tags: ['low'],
  },
];
const App = () => <Table columns={columns} dataSource={data} />;
export default App;