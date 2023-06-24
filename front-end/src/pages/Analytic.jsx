import { useQuery } from "react-query"
import { AppShell } from "../components/AppShell"
import { Box } from "../components/Box"
import { Text } from "../components/Text"
import { useAuth } from "../hooks/useAuth"
import { getAnalyticTrend, getAnalyticUses } from "../libs/api"
import { AnalyticChart } from "../components/AnalyticChart"

export const Analytic = () => {
    const { user } = useAuth()
    const trend = useQuery(['analytic', 'trend', user.idSekolah], (q) => getAnalyticTrend(q.queryKey[2]))
    const uses = useQuery(['analytic', user.ROLE == 'GURU' ? 'uses' : 'selfuses', user.idSekolah], (q) => getAnalyticUses(q.queryKey[2]))

    const handleData = () => {
        if (uses.isFetched) {
            let _data = []
            let _label = Object.keys(uses.data.data)
            Object.keys(uses.data.data).map((key) => {
                _data.push(uses.data.data[key].value)
            })
            return { label:_label, data:_data }
        } else {
            return []
        }
    }

    return <AppShell>
        { user.role == 'GURU' && <>
        <div className="grid grid-cols-12 gap-3">
            <Box className={'col-span-5 h-fit'}>
                <Text className={'text-2xl text-primary font-medium'}>Trending Topics</Text>
                {trend.isFetched && trend.data.data.map((data, index) => {
                    return <div key={index} className="text-white bg-primary p-3 rounded-xl mt-3 flex justify-between">
                        <Text>{data.tag}</Text>
                        <span className="badge bg-white text-primary">{data._count.tag}</span>
                    </div>
                })}
            </Box>
            <Box className={'col-span-7'}>
                <Text className={'text-2xl text-primary font-medium mb-3'}>Penggunaan Mingguan</Text>
                {uses.isFetched && <AnalyticChart data={handleData()} />}
            </Box>
        </div>
        </> }

        { user.role == 'SISWA' && <>
        <div className="grid grid-cols-12 gap-3">
            <Box className={'col-span-12'}>
                <Text className={'text-2xl text-primary font-medium mb-3'}>Penggunaan Mingguan</Text>
                {uses.isFetched && <AnalyticChart data={handleData()} />}
            </Box>
        </div>
        </> }
    </AppShell>
}