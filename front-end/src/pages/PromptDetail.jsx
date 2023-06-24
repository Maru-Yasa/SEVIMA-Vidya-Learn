import { useParams } from "react-router-dom"
import { AppShell } from "../components/AppShell"
import { Box } from "../components/Box"
import { useQuery } from "react-query"
import { getPromptById } from "../libs/api"

export const PromptDetail = () => {
    const { id } = useParams()
    const query = useQuery(['prompts', id], (q) => getPromptById(q.queryKey[1]))

    return <AppShell>
        {query.isFetched ? <>
        <Box>
            <div className="prose prose-lg" dangerouslySetInnerHTML={{__html: query.isFetched && query.data.data.answer}}>

            </div>
            <div className="">
                <span className="badge bg-orange-300">{query.data.data.tag ? query.data.data.tag : "#Educatio"}</span>
            </div>
        </Box>
        </>:<>
            <Box className={'flex justify-center items-center'}>
                <span className="loading loading-dots loading-lg"></span>
            </Box>
        </>}
    </AppShell>
}