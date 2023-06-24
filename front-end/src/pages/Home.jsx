import { AppShell } from "../components/AppShell"
import { PromptBox } from "../components/PromptBox"

export const Home = () => {
    return <AppShell>
        
        <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 flex p-0 gap-3">
                <input className="input input-bordered w-full focus:outline-none text-sm" placeholder="Fisika Kuantum" />
                <button className="btn btn-primary text-white">Tanya</button>
            </div>
            <PromptBox />
            <PromptBox />
            <PromptBox />
        </div>

    </AppShell>
}