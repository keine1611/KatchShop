
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'


const LoginNavigate = () => {
    const auth = useAuth()
    console.log('navigaye')
    if (auth.user.auth) {
        if (auth.user.user.role_acc === 'admin')
            return <Navigate to='/admin/home'/>
        else {
          if (auth.user.user.role_acc === 'customer')
          return <Navigate to='/home'/>
        }
    }
    else
        return <Navigate to='/404'/>
}

export default LoginNavigate