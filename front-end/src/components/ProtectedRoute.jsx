import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoute = ({ children, reverse=false }) => {
    const { isAuthenticated } = useAuth() 

    if (reverse) {
        return !isAuthenticated ? children: <Navigate to={'/home'} replace />
    }else{
        return isAuthenticated ? children : <Navigate to={'/'} replace />
    }

}
