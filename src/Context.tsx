import React from 'react';
import User from './Contracts/User';

type UserContext = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User|null>>
}

export default React.createContext<UserContext>({user: null, setUser: () => {}})