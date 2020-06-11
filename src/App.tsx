import './App.css';

import React, {
  useLayoutEffect,
  useState,
} from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import Auth from './Api/Auth';
import GuardedRoute from './Auth/GuardedRoute';
import LoginForm from './Auth/LoginForm';
import Nav from './Nav';

import {
  NotificationContext,
  UserContext,
} from './Context';
import User from './Contracts/User';
import NotificationBanner from './lib/Notifications/NotificationBanner';
import useNotifications from './lib/Notifications/useNotifications';
import RecipeCreateForm from './Recipes/RecipeCreateForm';
import RecipeEditForm from './Recipes/RecipeEditForm';
import RecipeFull from './Recipes/RecipeFull';
import RecipeListScreen from './Recipes/RecipeListScreen';
import RecipeSearchScreen from './Recipes/RecipeSearchScreen';
import RecipeFromUrlForm from './Recipes/RecipeFromUrlForm';

function App() {
    const [user, setUser] = useState<User | null>(null)
    const [notifications, dispatch] = useNotifications()
    const initialNotificationContext = { dispatch }

    useLayoutEffect(() => {
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
                        {user && <Nav/>}
                    </header>
                    <NotificationBanner notifications={notifications} />
                    <main className="App__Container">
                        <Switch>
                            <Route exact path="/">
                                {user ? <RecipeSearchScreen /> : <LoginForm />}
                            </Route>
                            <GuardedRoute exact path="/recipes/all" user={user}>
                                <RecipeListScreen />
                            </GuardedRoute>
                            <GuardedRoute exact path="/recipes/create" user={user}>
                                <RecipeCreateForm />
                            </GuardedRoute>
                            <GuardedRoute exact path="/recipes/create-from-url" user={user}>
                                <RecipeFromUrlForm />
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
