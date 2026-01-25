import { useContext } from 'react'
import Auth from '../Api/Auth'
import { ActionButton } from '../lib/Buttons/Buttons'
import { toaster } from '../components/ui/toaster'
import UserContext from '../Context'
import { useNavigate } from 'react-router'

export default function LogoutButton() {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const logout = async() => {
        try {
            await Auth.logout()
            setUser(null)
            navigate('/')
        } catch (error) {
            toaster.create({
                title: "Log out failed.",
                description: `Unable to reach server`,
                type: "error",
                duration: 9000,
            })
        }
    }

    return (<ActionButton text="Log Out" onClick={logout} />)
}
