import { useSelector } from 'react-redux'
import { NavLink, useNavigate} from 'react-router-dom'
import Profile from '../../../pages/profile/Profile'
import { useEffect } from 'react'

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate('/sign-in')
    }
  }, [userToken])

  // returns child route elements
  return <Profile />
}
export default ProtectedRoute