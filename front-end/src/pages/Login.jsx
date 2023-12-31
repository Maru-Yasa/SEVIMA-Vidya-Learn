import { useForm } from "react-hook-form"
import App from "../App"
import { Box } from "../components/Box"
import { Input } from "../components/Input"
import { Text } from "../components/Text"
import { login } from "../libs/api"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Login = () => {

    const {register, handleSubmit, formState: { errors }, setError} = useForm()
    const { setToken } = useAuth()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        setLoading(true)
        data = (await login(data))
        setLoading(false)
        if(!data.status){
            data.errors && data.errors.forEach((e) => {
                setError(e.path[0], {
                    message: e.message
                })
            })
            toast.error(data.message)
            return
        }
        toast.success(data.message)
        setToken(data.data.token)
        setTimeout(() => {
            navigate('/home', {replace: true})
        }, 2000)
    }

    useEffect(() => {
        
    }, [])

    return <App>
        <div className="min-h-screen flex justify-center justify-items-center items-center">
            <Box className={'max-w-xs md:max-w-md w-full'}>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <Text className="text-3xl text-orange-500 font-bold" >Login</Text>
                    <Text className={'text-md text-gray-400'}>Login dan mulai bertanya</Text>
                    <Input label={'Email'} hook={register("email", { required: {value: true, message: 'Email dibutuhkan'} })} error={errors.email?.message} />
                    <Input label={'Password'} type={'password'} hook={register("password", { required: {value: true, message: 'Password dibutuhkan'} })} error={errors.password?.message} />
                    <div className="mt-5 mb-3 flex flex-col text-center">
                        <button className="btn btn-primary">
                            {loading ? <>
                                <span className="loading loading-dots">
                                </span>
                            </>:<>
                            Login
                            </>}
                        </button>
                        <Link to={'/register'} className="underline mt-3 text-primary">Belum punya akun?</Link>
                    </div>
                </form>
            </Box>
        </div>
    </App>
}