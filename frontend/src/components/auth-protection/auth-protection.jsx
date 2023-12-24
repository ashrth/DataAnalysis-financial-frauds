import { useAuthContext } from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types';

AuthProtection.propTypes = {
  children: PropTypes.node.isRequired
};

export default function AuthProtection({ children }) {
  const location = useLocation()

  const { user } = useAuthContext()

  if (user) {
    return children
  }

  return <Navigate to={{ pathname: '/login', search: `redirectTo=${location.pathname}` }} />
}
