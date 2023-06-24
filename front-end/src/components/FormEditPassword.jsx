import { useForm } from "react-hook-form"
import { Input } from "./Input"
import { useMutation } from "react-query"
import { updateUser } from "../libs/api"
import { toast } from "react-hot-toast"
import { useAuth } from "../hooks/useAuth"

export const FormEditPassword = () => {
    const { register, handleSubmit, formState: {errors} } = useForm()
    const { setToken} = useAuth()

    const mutation = useMutation(updateUser, {
        onSuccess: async (res) => {
            
            res.status && toast.success(res.message)
            !res.status && toast.error(res.message)
            res.status && setToken(null)
        },
        onError: (res) => {
            toast.error(res.message)
        }
    })
    const onSubmit = (data) => {
        mutation.mutate(data)
    }
    return <>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Input label={'Password Lama'} type={'password'} hook={register("oldPassword", { required: {value: true, message: 'Password lama dibutuhkan'} })} error={errors.oldPassword?.message} />
            <Input label={'Password'} type={'password'} hook={register("password", { required: {value: true, message: 'Password dibutuhkan'} })} error={errors.password?.message} />
            <div className="mb-3">
                <button type="submit" disabled={mutation.isLoading} className="btn btn-primary text-white">
                    {mutation.isLoading ? <>
                        <span className="loading loading-dots"></span>
                    </> : <>
                    Edit
                    </>}
                </button>
            </div>
        </form>
    </>
}