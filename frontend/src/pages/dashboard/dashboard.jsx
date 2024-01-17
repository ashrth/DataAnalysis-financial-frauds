import React from "react";
import {
  DollarCircleOutlined,
  AlertOutlined,
  ExceptionOutlined, 
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import DatamapsIndia from 'react-datamaps-india';

function TableDemo() {
  const cardStyle = {
    width: 250, // Adjust the width as needed
    marginBottom:21,
  };

  return (
    <div>
      <Space size={16}>
        {/* Cards */}
        <Card style={cardStyle}>
          <Statistic
            title="Money transferred last hour"
            value={112893}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<DollarCircleOutlined />}
          />
        </Card>

        <Card style={cardStyle}>
          <Statistic
            title="Alert"
            value={356}
            valueStyle={{ color: "#1890ff" }}
            prefix={<AlertOutlined/>}
          />
        </Card>

        <Card style={cardStyle}>
          <Statistic
            title="Pending reports"
            value={8}
            valueStyle={{ color: "#faad14" }}
            prefix={<ExceptionOutlined/>}
          />
        </Card>

        <Card style={cardStyle}>
          <Statistic
            title="reports_verified"
            value={1287}
            valueStyle={{ color: "#52c41a" }}
            prefix={<UserOutlined />}
          />
        </Card>
      </Space>

      {/* Add spacing/margin */}
      <div style={{ margin: '20px 0' }} />
      {/* Additional content goes here, if needed */}
    </div>
  );
}

export default TableDemo;
