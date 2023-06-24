import { AppShell } from "../components/AppShell"
import { Box } from "../components/Box"
import { FormEditPassword } from "../components/FormEditPassword"
import { FormEditProfile } from "../components/FormEditProfile"
import { Text } from "../components/Text"

export const Profile = () => {

    return <AppShell>
        <Box className={'mb-5'}>
            <Text className={'text-3xl font-bold text-primary'} >Edit Profile</Text>
            <Text className={'text-md text-gray-400'}>Kamu dapat mengedit profile disini</Text>
            <FormEditProfile />
        </Box>

        <Box className={'mb-5'}>
            <Text className={'text-3xl font-bold text-primary'} >Edit Password</Text>
            <Text className={'text-md text-gray-400'}>Kamu dapat menganti password disini</Text>
            <FormEditPassword />
        </Box>
    </AppShell>
}