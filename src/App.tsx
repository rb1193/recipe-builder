import React, { useLayoutEffect, useState } from 'react'

import { Route, Switch } from 'react-router-dom'

import { Box, Center, Container, Heading, Text } from '@chakra-ui/react'

import Auth from './Api/Auth'
import GuardedRoute from './Auth/GuardedRoute'
import LoginForm from './Auth/LoginForm'
import Nav from './Nav'

import { NotificationContext, UserContext } from './Context'
import User from './Contracts/User'
import NotificationBanner from './lib/Notifications/NotificationBanner'
import useNotifications from './lib/Notifications/useNotifications'
import RecipeCreateForm from './Recipes/RecipeCreateForm'
import RecipeEditForm from './Recipes/RecipeEditForm'
import RecipeFull from './Recipes/RecipeFull'
import RecipeListScreen from './Recipes/RecipeListScreen'
import RecipeSearchScreen from './Recipes/RecipeSearchScreen'
import RecipeFromUrlForm from './Recipes/RecipeFromUrlForm'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [notifications, dispatch] = useNotifications()
  const initialNotificationContext = { dispatch }

  useLayoutEffect(() => {
    Auth.user()
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        setUser(null)
      })
  }, [])

  return (
    <NotificationContext.Provider value={initialNotificationContext}>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Box as="header">
          <Heading as="h1" size="2xl" my="8" textAlign="center" lineHeight="shorter">
            My Recipe Library
          </Heading>
          {user && <Nav />}
        </Box>
        <NotificationBanner notifications={notifications} />
        <Container as="main">
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
        </Container>
        {!user && <Text as="footer" my="8" textAlign="center">
          Made by Ryan
        </Text>}
      </UserContext.Provider>
    </NotificationContext.Provider>
  )
}

export default App
