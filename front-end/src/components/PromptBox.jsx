import { Link } from "react-router-dom"
import { Text } from "./Text"
import { BsThreeDots } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from "react-query"
import { deletePrompt } from "../libs/api"
import { toast } from "react-hot-toast"

export const PromptBox = ({ data }) => {
    const queryClient = useQueryClient()
    const mutation = useMutation(deletePrompt, {
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries(['prompts'])
        }
    })

    return <div className={'bg-white p-5 border rounded-xl group hover:border-primary ease-in-out duration-300'}>
        <div className="flex gap-2 justify-between">
            <Text className={'text-primary text-xl font-semibold truncate'}>{data.question}</Text>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer"><BsThreeDots /></label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52">
                    <li><button onClick={() => mutation.mutate(data.id)} className="bg-red-500 text-white hover:bg-red-400"><FaTrash/> Hapus</button></li>
                </ul>
                </div>
        </div>
        <Text className={'text-gray-400 truncate'}>{data.description}</Text>
        <Link to={`/home/prompt/${data.id}`} className="underline">Lihat selengkapnya</Link>
        <div className="flex justify-between mt-3">
            <span className="text-gray-400">{dayjs(data.createdAt).format('DD-MM-YYYY')}</span>
            <span className="badge bg-orange-300">{data.tag ? data.tag : "#Education"}</span>
        </div>
    </div>
}