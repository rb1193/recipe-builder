import './App.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import Auth from './Api/Auth';
import GuardedRoute from './Auth/GuardedRoute';
import LoginForm from './Auth/LoginForm';
import LogoutButton from './Auth/LogoutButton';
import {
  NotificationContext,
  UserContext,
} from './Context';
import User from './Contracts/User';
import { LinkButton } from './lib/Buttons/Buttons';
import NotificationBanner from './lib/Notifications/NotificationBanner';
import useNotifications from './lib/Notifications/useNotifications';
import RecipeCreateForm from './Recipes/RecipeCreateForm';
import RecipeEditForm from './Recipes/RecipeEditForm';
import RecipeFull from './Recipes/RecipeFull';
import RecipeSearchScreen from './Recipes/RecipeSearchScreen';

function App() {
    const [user, setUser] = useState<User | null>(null)
    const [notifications, dispatch] = useNotifications()
    const initialNotificationContext = { dispatch }

    useEffect(() => {
        Auth.user()
            .then(res => {
                setUser(res.data)
            })
            .catch(() => {
                setUser(null)
            })
    }, [])

    return (
        <div className="App">
            <NotificationContext.Provider value={initialNotificationContext}>
                <UserContext.Provider value={{ user: user, setUser: setUser }}>
                    <header className="App__Header">
                        <h1>My Recipe Library</h1>
                        {user && (
                            <>
                                <nav className="App__Menu">
                                    <LinkButton
                                        to="/recipes/create"
                                        text="Add Recipe"
                                    />
                                    <LogoutButton />
                                </nav>
                            </>
                        )}
                    </header>
                    <NotificationBanner notifications={notifications} />
                    <main className="App__Container">
                        <Switch>
                            <Route exact path="/">
                                {user ? <RecipeSearchScreen /> : <LoginForm />}
                            </Route>
                            <GuardedRoute exact path="/recipes/create" user={user}>
                                <RecipeCreateForm />
                            </GuardedRoute>
                            <GuardedRoute exact path="/recipes/:recipeId/edit" user={user}>
                                <RecipeEditForm />
                            </GuardedRoute>
                            <GuardedRoute path="/recipes/:recipeId" user={user}>
                                <RecipeFull />
                            </GuardedRoute>
                        </Switch>
                    </main>
                </UserContext.Provider>
            </NotificationContext.Provider>
            <footer className="App__Footer">
                <p>Made by Ryan</p>
            </footer>
        </div>
    )
}

export default App
