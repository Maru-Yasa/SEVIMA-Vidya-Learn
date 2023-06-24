import { useForm } from "react-hook-form"
import App from "../App"
import { Box } from "../components/Box"
import { Input } from "../components/Input"
import { Text } from "../components/Text"
import { register as userRegister } from "../libs/api"
import { toast } from "react-hot-toast"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Register = () => {

    const {register, handleSubmit, formState: { errors }, setError, reset} = useForm()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const onSubmit = (data) => {
        setLoading(true)
        userRegister(data).then((res) => {
            data = res.data
            setLoading(false)
            console.log(data);
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
            reset()
            navigate('/')
        })

    }

    return <App>
        <div className="min-h-screen flex justify-center justify-items-center items-center">
            <Box className={'max-w-md w-full'}>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <Text className="text-3xl text-orange-500 font-bold" >Register</Text>
                    <Input label={'Username'} hook={register("username", { required: {value: true, message: 'Username is required'} })} error={errors.username?.message} />
                    <Input label={'Name'} hook={register("name", { required: {value: true, message: 'Name is required'} })} error={errors.name?.message} />
                    <Input label={'Email'} hook={register("email", { required: {value: true, message: 'Email is required'} })} error={errors.email?.message} />
                    <Input label={'Password'} type={'password'} hook={register("password", { required: {value: true, message: 'Password is required'} })} error={errors.password?.message} />
                    <div className="mt-5 mb-3 flex flex-col text-center">
                        <button type="submit" className="btn btn-primary gap-2">
                            {loading ? <>
                                <span className="loading loading-dots"></span>
                            </> : <>
                                Register                            
                            </> }
                        </button>
                        <Link to={'/'} className="underline mt-3 text-primary">
                            Already have an account?
                        </Link>
                    </div>
                </form>
            </Box>
        </div>
    </App>
}