import { useState } from 'react'
import { CreditCardOutlined, FileTextOutlined, TeamOutlined, } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const { Content, Sider } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem('CSV', 'csv', <FileTextOutlined />),
  getItem('Accounts', 'Accounts', <TeamOutlined />),
  getItem('Tickets', 'tickets', <CreditCardOutlined />),
  // getItem('Map','Map',<AimOutlined />),
]

export default function PageLayout() {
  const [selectedKey, setSelectedKey] = useState('')
  const [collapsed, setCollapsed] = useState(true)

  const navigate = useNavigate()
  const onClick = (e) => {
    if (e != null && typeof e.key === 'string') {
      setSelectedKey(e.key)
      navigate(`/${e.key}`)
    }
  }

  return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      {
        <Sider
          collapsible
          collapsed={collapsed}
          style={{
            backgroundColor: '#fff',
            overflow: 'auto',
            height: 'calc(100vh - 64px)',
            position: 'sticky',
            top: 0,
            left: 0,
          }}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu selectedKeys={[`${selectedKey}`]} mode="inline" items={items} onClick={onClick} className="h-full" />
        </Sider>
      }
      <Layout className="site-layout mx-auto w-full max-w-[1440px]">
        <Content>
          <Outlet context={{ setSelectedKey, selectedKey }} />
        </Content>
      </Layout>
    </Layout>
  )
}
