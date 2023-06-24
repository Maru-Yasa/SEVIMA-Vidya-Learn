import { useMutation, useQuery, useQueryClient } from "react-query"
import { AppShell } from "../components/AppShell"
import { PromptBox } from "../components/PromptBox"
import { createPrompt, getAllPrompt } from "../libs/api"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
export const Home = () => {
    const queryClient = useQueryClient()
    const query = useQuery(['prompts'], getAllPrompt)
    const {register, handleSubmit, formState: { errors }} = useForm()

    const mutation = useMutation(createPrompt, {
        onSuccess: () => {
          queryClient.invalidateQueries(['prompts'])
        },
      })

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    useEffect(() => {
        errors.question?.message && toast.error(errors.question?.message)
    }, [errors])

    return <AppShell>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2 flex p-0 gap-3">
                <form onSubmit={handleSubmit(onSubmit)} className="flex p-0 gap-3 w-full">
                    <input className="input input-bordered w-full focus:outline-none text-sm" placeholder="Fisika Kuantum" {...register('question', {required: {value: true, message: 'Question diperlukan'}})} />
                    <button disabled={mutation.isLoading} className="btn btn-primary text-white">
                        {mutation.isLoading ? <>
                            <span className="loading loading-dots">
                            </span>
                        </>: <>
                            Tanya                        
                        </>}
                    </button>
                </form>
            </div>
            {query.isLoading && <>
                <div className={'flex justify-center items-center w-full col-span-1 md:col-span-2 mt-5'}>
                    <span className="loading loading-dots loading-lg text-primary"></span>
                </div>
            </>}
            {query.data?.data.map((data, index) => {
                return <PromptBox data={data} key={index} />
            })}
        </div>

    </AppShell>
}