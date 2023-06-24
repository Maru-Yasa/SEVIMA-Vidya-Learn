import { useAuth } from "../hooks/useAuth"
import { useForm } from "react-hook-form"
import { Input } from "./Input"
import { useMutation } from "react-query"
import { updateUser } from "../libs/api"
import { toast } from "react-hot-toast"
import { SelectInput } from "./SelectInput"

export const FormEditProfile = () => {
    const { register, control, handleSubmit, formState: {errors} } = useForm()
    const { user , setToken} = useAuth()
    const jenisKelamin = [
        { value: 'LAKI', label: 'Laki-laki' },
        { value: 'PEREMPUAN', label: 'Perempuan' },
    ]
    const mutation = useMutation(updateUser, {
        onSuccess: async (res) => {
            
            res.status && toast.success(res.message)
            !res.status && toast.error(res.message)

            if (res.status) {
                setToken(null)
            }
            
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
            <Input label={'Nama'} defaultValue={user.nama} hook={register("nama", { required: {value: true, message: 'Name dibutuhkan'} })} error={errors.nama?.message} />
            <SelectInput defaultValue={user.jenisKelamin} control={control} name={'jenisKelamin'} label={'Jenis Kelamin'} placeholder={'Pilih jenis kelamin'} options={jenisKelamin} hook={register('jenisKelamin', { required: {value:true, message: 'Jenis kelamin dibutuhkan'} })} error={errors.jenisKelamin?.message} />
            {/* <Input label={'Email'} defaultValue={user.email} hook={register("email", { required: {value: true, message: 'Email dibutuhkan'} })} error={errors.email?.message} /> */}
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