/* eslint-disable react/prop-types */
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import { useAuthContext } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

function AppShell({ children, className, style }) {
  const { user, logout } = useAuthContext()

  return (
    <div className={clsx('flex h-screen flex-col overflow-hidden',className)} style={style}>
      <div className="h-16 border-b shadow-md">
        <div className="flex mx-6 h-full items-center justify-between">
          <div className="font-sans text-2xl tracking-wide text-primary">
            <Link to="/wiseboard">
              {/* <img src={logo} className="w-[150px]" /> */}
              Dashboard
            </Link>
          </div>
          <div className="flex flex-row">
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 'name',
                    icon: <UserOutlined />,
                    label: <Link to="/profile">Profile</Link>,
                  },
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                    onClick: logout,
                  },
                ],
              }}
            >
              <button className="rounded-full bg-dark">
                <Avatar
                  style={{
                    backgroundColor: '#6D6D6D',
                    color: 'white',
                  }}
                >
                  {user?.fullName?.[0].toUpperCase()}
                </Avatar>
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-0">{children}</div>
    </div>
  )
}

export default AppShell;