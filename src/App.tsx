import "./App.css";

import * as React from "react";

import useConfig from "./components/useConfig";
import 'antd/dist/antd.css';
import { Space, Table, Tag } from 'antd';

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      // render: (_, { tags }) => (
      //   <>
      //     {tags.map((tag) => {
      //       let color = tag.length > 5 ? 'geekblue' : 'green';
  
      //       if (tag === 'loser') {
      //         color = 'volcano';
      //       }
  
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: 'Action',
      key: 'action',
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //     <a>Delete</a>
      //   </Space>
      // ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div className="App">
      <div className="centralized">
        <div className="header">
          <span className="header-airport-name">London</span>
        </div>
        <div className="content">
          <Table columns={columns} dataSource={data} size='small' />
        </div>
      </div>
    </div>
  );
}
