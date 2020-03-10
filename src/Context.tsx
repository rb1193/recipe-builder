import React from 'react';
import User from './Contracts/User';

export const UserContext = React.createContext<User | null>(null)