/* eslint-disable react/prop-types */
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import { useAuthContext } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

function AppShell({ children, className }) {
  const { logout } = useAuthContext()

  return (
    <div className={clsx('h-screen flex flex-col overflow-hidden',className)}>
        <div className="flex flex-row items-center justify-between py-2 px-4">
          <div className="font-sans text-2xl tracking-wide text-risingGreen">
            <Link to="/dashboard">
              {/* <img src={logo} className="w-[150px]" /> */}
              Dashboard
            </Link>
          </div>
          <div>
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
                  K
                </Avatar>
              </button>
            </Dropdown>
          </div>
        </div>
      <div className="flex-1 overflow-auto p-0">{children}</div>
    </div>
  )
}

export default AppShell;