import { useSelector } from 'react-redux'
import { Outlet, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedRoute = () => {
  
  const { userToken, userInfo, loading, isSearchingUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()


  const shouldNavigate = () => {
    if (!userInfo && !loading && isSearchingUser) {
      navigate('/sign-in')
    }
  }

  useEffect(() => {
    if (!userToken) {
      navigate('/sign-in')
    } else {
        shouldNavigate()
    }
  }, [loading])

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute