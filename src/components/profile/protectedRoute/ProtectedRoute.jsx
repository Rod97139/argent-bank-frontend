import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import Profile from '../../../pages/profile/Profile'
import { useEffect } from 'react'

const ProtectedRoute = () => {
  const { userToken, userInfo, loading, searchUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const shouldNavigate = () => {
    if (!userInfo && !loading && searchUser) {
      navigate('/sign-in')
    }
  }

  useEffect(() => {
    if (!userToken) {
      navigate('/sign-in')
    }
    // else 
    if (userToken) {
        shouldNavigate()
    }
  }, [loading])

  // returns child route elements
  return <Profile />
}
export default ProtectedRoute