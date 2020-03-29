import React, { useState, useEffect } from 'react';
import './App.css';
import { isNull } from 'util';
import PaneSlider from './lib/PaneSlider';
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegisterFormContainer';
import Auth from './Api/Auth';
import { UserContext, NotificationContext } from './Context';
import RecipeSearchScreen from './Recipes/RecipeSearchScreen';
import User from './Contracts/User';
import { Route, Switch } from 'react-router-dom';
import RecipeCreateForm from './Recipes/RecipeCreateForm';
import RecipeEditForm from './Recipes/RecipeEditForm';
import RecipeFull from './Recipes/RecipeFull';
import NotificationBanner, { NotificationLevel } from './lib/Notifications/NotificationBanner'
import useNotifications, { NotificationActionType } from './lib/Notifications/useNotifications';

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [notifications, dispatch] = useNotifications()
    const initialNotificationContext = {dispatch}

    useEffect(() => {
        Auth.user().then((res) => {
            setUser(res.data)
        }).catch(() => {
            setUser(null)
        });
    }, [])

    const logout = async() => {
        try {
            await Auth.logout()
            setUser(null)
        } catch (Error) {
            dispatch({
                type: NotificationActionType.ADD,
                payload: {
                    message: `Log out operation failed`,
                    level: NotificationLevel.info,
                },
            })
        }
    }

    const auth = <PaneSlider panes={[
        {label: 'Login', component: <LoginForm onLogin={setUser} />},
        {label: 'Register', component: <RegisterForm />}
    ]} />

    const recipes = <RecipeSearchScreen />

    return (
        <div className="App">
            <NotificationContext.Provider value={initialNotificationContext}>
                <UserContext.Provider value={user}>
                    <header className="App__Header">
                        <h1>My Recipe Library</h1>
                        <nav className="App__Menu">
                            {user && <button className="App__MenuButton" type="button" onClick={logout}>Log Out</button>}
                        </nav>
                    </header>
                    <NotificationBanner notifications={notifications} />
                    <main className="App__Container">
                        <Switch>
                            <Route exact path='/'>
                                {user ? recipes : auth}
                            </Route>
                            <Route exact path='/recipes/create'>
                                <RecipeCreateForm />
                            </Route>
                            <Route exact path='/recipes/:recipeId/edit'> 
                                <RecipeEditForm />
                            </Route>
                            <Route path='/recipes/:recipeId'> 
                                <RecipeFull/>
                            </Route>
                        </Switch>
                    </main>
                </UserContext.Provider>
            </NotificationContext.Provider>
            <footer className="App__Footer">
                <p>Made by Ryan</p>
            </footer>
        </div>
    );
}

export default App;
