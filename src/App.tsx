import React, { useState, useEffect } from 'react';
import './App.css';
import { isNull } from 'util';
import PaneSlider from './lib/PaneSlider';
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegisterFormContainer';
import Auth from './Api/Auth';
import { UserContext } from './Context';
import RecipeSearchScreen from './Recipes/RecipeSearchScreen';
import PaginatedRecipeSearchScreen from './Recipes/PaginatedRecipeSearchScreen';
import User from './Contracts/User';
import { Route, Switch } from 'react-router-dom';
import RecipeCreateForm from './Recipes/RecipeCreateForm';
import RecipeEditForm from './Recipes/RecipeEditForm';
import RecipeFull from './Recipes/RecipeFull';

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {Auth.user().then((res) => {setUser(res.data)}).catch(() => {setUser(null)});}, [])

    const authScreen = <PaneSlider panes={[
        {label: 'Login', component: <LoginForm />},
        {label: 'Register', component: <RegisterForm />}
    ]} />

    return (
        <div className="App">
            <header className="App-header">
                <h1>My Recipe Library</h1>
            </header>
            <main>
                <Switch>
                    <Route exact path='/'>
                        {isNull(user) ? authScreen :<UserContext.Provider value={user}>
                            <PaginatedRecipeSearchScreen />
                        </UserContext.Provider>}
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
            <hr></hr>
            <footer>
                <p>Made by Ryan</p>
            </footer>
            
        </div>
    );
}

export default App;
