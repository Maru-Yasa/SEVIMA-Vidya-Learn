import { Link } from "react-router-dom"
import { Text } from "./Text"

export const PromptBox = () => {
    return <Link className={'bg-white p-5 border rounded-xl group hover:border-primary ease-in-out duration-300'}>
        <Text className={'text-primary text-xl font-semibold'}>Fisika Kuantum</Text>
        <Text className={'text-gray-400'}>Fisika kuantum adalah cabang dari fisi...</Text>
        <div className="flex justify-end mt-2">
            <span className="badge bg-orange-300">Fisika</span>
        </div>
    </Link>
}