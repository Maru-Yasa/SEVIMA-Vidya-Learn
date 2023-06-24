import { useForm } from "react-hook-form"
import App from "../App"
import { Box } from "../components/Box"
import { Input } from "../components/Input"
import { Text } from "../components/Text"
import { getProvince, getRegencies, getSekolah, register as userRegister } from "../libs/api"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SelectInput } from "../components/SelectInput"

const Step1 = ({ register, errors, handleNext }) => {
    return <>
        <Input label={'Nama'} hook={register("nama", { required: {value: true, message: 'Name dibutuhkan'} })} error={errors.nama?.message} />
        <Input label={'Email'} hook={register("email", { required: {value: true, message: 'Email dibutuhkan'} })} error={errors.email?.message} />
        <div className="mt-5 mb-3 flex flex-col text-center">
            <button onClick={handleNext} className="btn btn-primary gap-2">
                {/* {loading ? <>
                    <span className="loading loading-dots"></span>
                </> : <>
                    Register                            
                </> } */}
                Next
            </button>
            <Link to={'/'} className="underline mt-3 text-primary">
                Sudah punya akun?
            </Link>
        </div>
    </>
}

const Step2 = ({ register, control, errors, loading, handlePrevious, watch }) => {
    const [provinces, setProvinces] = useState([])
    const [regencies, setRegencies] = useState([])
    const idProvinsi = watch('idProvinsi')

    const jenjangSekolah = [
        { value: 'SD', label: 'Sekolah Dasar' },
        { value: 'SMP', label: 'Sekolah Menengah Pertama' },
        { value: 'SMA', label: 'Sekolah Menengah Akhir' },
        { value: 'SMK', label: 'Sekolah Menengah Kejuruan' }
    ]   
    
    const jenisKelamin = [
        { value: 'LAKI', label: 'Laki-laki' },
        { value: 'PEREMPUAN', label: 'Perempuan' },
    ]

    useEffect(() => {
        getProvince().then((data) => {
            let _data = []
            data.map((d) => {
                _data.push({
                    value: d.id,
                    label: d.name
                })
            })
            setProvinces(_data)
        })
    }, [])

    useEffect(() => {
        if (idProvinsi) {
            getRegencies(idProvinsi).then((data) => {
                let _data = []
                data.map((d) => {
                    _data.push({
                        value: d.id,
                        label: d.name
                    })
                })     
                setRegencies(_data);
            })
        }
    }, [idProvinsi])

    return <>
        <SelectInput control={control} name={'jenisKelamin'} label={'Jenis Kelamin'} placeholder={'Pilih jenis kelamin'} options={jenisKelamin} hook={register('jenisKelamin', { required: {value:true, message: 'Jenis kelamin dibutuhkan'} })} error={errors.jenisKelamin?.message} />
        <SelectInput control={control} name={'jenjangSekolah'} label={'Jenjang Sekolah'} placeholder={'Pilih jenjang sekolah'} options={jenjangSekolah} hook={register('jenjangSekolah', { required: {value:true, message: 'Jenjang Sekolah dibutuhkan'} })} error={errors.jenjangSekolah?.message} />
        <SelectInput control={control} name={'idProvinsi'} label={'Provinsi'} placeholder={'Pilih provinsi'} options={provinces} hook={register('idProvinsi', { required: {value:true, message: 'Provinsi dibutuhkan'} })} error={errors.idProvinsi?.message} />
        <SelectInput control={control} name={'idKabupaten'} label={'Kabupaten'} placeholder={'Pilih kabupaten'} options={regencies} hook={register('idKabupaten', { required: {value:true, message: 'Kabupaten dibutuhkan'} })} error={errors.idKabupaten?.message} />
        <SelectInput async load={getSekolah} control={control} name={'idSekolah'} label={'Sekolah'} placeholder={'NPSN sekolah'} hook={register('idSekolah', { required: {value:true, message: 'Sekolah dibutuhkan'} })} error={errors.idSekolah?.message} />
        <Input label={'Password'} type={'password'} hook={register("password", { required: {value: true, message: 'Password dibutuhkan'} })} error={errors.password?.message} />
        <div className="mt-5 mb-3 flex flex-col text-center">
            <div className="flex gap-3 justify-start">
                <button type="submit"  className="btn btn-primary gap-2">
                    {loading ? <>
                        <span className="loading loading-dots"></span>
                    </> : <>
                        Register                            
                    </> }
                </button>
                <button className="btn btn-secondary" onClick={handlePrevious}>Kembali</button>
            </div>
        </div>
    </>
}

export const Register = () => {

    const {register, handleSubmit, watch, control, formState: { errors }, setError, reset} = useForm()
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const navigate = useNavigate()

    const steps = {
        1: <Step1 register={register} errors={errors} loading={loading} handleNext={() => setStep(2)} />,
        2: <Step2 watch={watch} control={control} register={register} errors={errors} loading={loading} handlePrevious={() => setStep(1)} />,
    }

    const onSubmit = (data) => {
        setLoading(true)
        userRegister(data).then((res) => {
            
            setLoading(false)
            if(!res.status){
                res.errors && res.errors.forEach((e) => {
                    setError(e.path[0], {
                        message: e.message
                    })
                })
                toast.error(res.message)
                return
            }
            toast.success(res.message)
            reset()
            setTimeout(() => {
                navigate('/')
            }, 2000)
        })
    }

    return <App>
        <div className="min-h-screen flex justify-center justify-items-center items-center">
            <Box className={'max-w-xs md:max-w-md w-full'}>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <Text className="text-3xl text-orange-500 font-bold" >Register</Text>
                    <Text className={'text-md text-gray-400'}>
                        Kamu akan mendaftar sebagai siswa, <br /> <Link to={'/register/guru'} className="text-primary underline">Kamu seorang guru?</Link>
                    </Text>
                    {steps[step]}
                </form>
            </Box>
        </div>
    </App>
}