import App from "../App"
import { useAuth } from "../hooks/useAuth"

export const Home = () => {
    const { user } = useAuth()

    return <App>
        Halo, {user.name}
    </App>
}