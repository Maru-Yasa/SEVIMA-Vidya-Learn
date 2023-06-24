import { Link, useNavigate } from "react-router-dom"
import App from "../App"
import { Box } from "./Box"
import { Text } from "./Text"
import { FaHome, FaUserCircle } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { useAuth } from "../hooks/useAuth"
import { toast } from "react-hot-toast"

export const AppShell = ({ children }) => {
    const { user, setToken } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        setToken()
        toast.success("Sukses melakukan logout")
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }

    return <App>
        <div className="sm:w-full mx-5 md:mx-0 md:w-10/12 min-h-screen my-5">

            <Box className={'bg-orange-500 text-white flex flex-col md:flex-row justify-between items-center'}>
                <div className="flex gap-3">
                    <Text className={'font-bold text-2xl'}>
                        Vidya Learn
                    </Text>
                </div>
            </Box>
            <Box className={'mt-5 flex gap-3'}>                
                    <Link to={'/home'} className="btn btn-primary text-white btn-sm"><FaHome /> Home</Link>
                    <Link to={'/home/profile'} className="btn btn-primary text-white btn-sm"><FaUserCircle /> Profile</Link>
            </Box>
            <div className="grid grid-cols-12 mt-5 gap-5">
                <Box className={"bg-white col-span-12 md:col-span-4 flex flex-col justify-center items-center h-fit"}>
                    <div className="avatar bg-gray-100 rounded-full w-40">
                        <img className="rounded-full" loading="lazy" src={`https://robohash.org/${user.nama}`} alt="" />
                    </div>
                    <div className="mt-3 text-center">
                        <Text>{user.nama}</Text>
                        <Text className={'text-gray-400'}>{user.role}</Text>
                        <div className="flex items-center justify-center gap-1 mt-2">
                            <button onClick={handleLogout} className="btn btn-error btn-sm text-white"><BiLogOut /> Logout</button>
                        </div>
                    </div>
                </Box>
                <div className={"col-span-12 md:col-span-8 h-fit"}>
                    {children}
                </div>
            </div>
        </div>
    </App>
}