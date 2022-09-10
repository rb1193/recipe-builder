import React, { useContext } from 'react'
import Auth from '../Api/Auth'
import { ActionButton } from '../lib/Buttons/Buttons'
import { useToast } from '@chakra-ui/toast'
import UserContext from '../Context'
import { useNavigate } from 'react-router'

export default function LogoutButton(): React.ReactElement {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const toast = useToast();

    const logout = async() => {
        try {
            await Auth.logout()
            setUser(null)
            navigate('/')
        } catch (error) {
            toast({
                title: "Log out failed.",
                description: `Unable to reach server`,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: 'top-left',
            })
        }
    }

    return (<ActionButton text="Log Out" onClick={logout} />)
}