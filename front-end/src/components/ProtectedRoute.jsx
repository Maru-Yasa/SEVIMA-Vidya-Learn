import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoute = ({ element, reverse=false }) => {
    const { isAuthenticated } = useAuth() 

    if (reverse) {
        return !isAuthenticated ? element: <Navigate to={'/home'} />
    }else{
        return isAuthenticated ? element : <Navigate to={'/'} />
    }

}
