import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuth = () => {
    const {setToken, token, user, isAuthenticated} = useContext(AuthContext)
    return {setToken, token, user, isAuthenticated};
}