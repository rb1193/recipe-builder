import React, { useState, useEffect } from 'react';
import './App.css';
import { isNull } from 'util';
import PaneSlider from './lib/PaneSlider';
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegisterFormContainer';
import Auth from './Api/Auth';
import { UserContext, NotificationContext } from './Context';
import PaginatedRecipeSearchScreen from './Recipes/PaginatedRecipeSearchScreen';
import User from './Contracts/User';
import { Route, Switch } from 'react-router-dom';
import RecipeCreateForm from './Recipes/RecipeCreateForm';
import RecipeEditForm from './Recipes/RecipeEditForm';
import RecipeFull from './Recipes/RecipeFull';
import NotificationBanner from './lib/Notifications/NotificationBanner'
import useNotifications from './lib/Notifications/useNotifications';

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [notifications, dispatch] = useNotifications()
    const initialNotificationContext = {dispatch}

    useEffect(() => {Auth.user().then((res) => {setUser(res.data)}).catch(() => {setUser(null)});}, [])

    return (
        <div className="App">
            <NotificationContext.Provider value={initialNotificationContext}>
                <header className="App-header">
                    <h1>My Recipe Library</h1>
                </header>
                <NotificationBanner notifications={notifications} />
                <main>
                    <Switch>
                        <Route exact path='/'>
                            {isNull(user)
                                ? <PaneSlider panes={[
                                    {label: 'Login', component: <LoginForm />},
                                    {label: 'Register', component: <RegisterForm />}
                                ]} />
                                :<UserContext.Provider value={user}>
                                    <PaginatedRecipeSearchScreen />
                                </UserContext.Provider>
                            }
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
            </NotificationContext.Provider>
            <hr></hr>
            <footer>
                <p>Made by Ryan</p>
            </footer>
            
        </div>
    );
}

export default App;
