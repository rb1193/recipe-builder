import React, { useEffect, useMemo, useState } from 'react'

import { Route, Switch } from 'react-router-dom'

import { Box, Container, Heading, Progress, Text, useMediaQuery } from '@chakra-ui/react'

import Auth from './Api/Auth'
import LoginForm from './Auth/LoginForm'
import MobileNav from './MobileNav'

import UserContext from './Context'
import User from './Contracts/User'
import RecipeCreateForm from './Recipes/RecipeCreateForm'
import RecipeEditForm from './Recipes/RecipeEditForm'
import RecipeFull from './Recipes/RecipeFull'
import RecipeListScreen from './Recipes/RecipeListScreen'
import RecipeSearchScreen from './Recipes/RecipeSearchScreen'
import RecipeFromUrlForm from './Recipes/RecipeFromUrlForm'
import DesktopNav from './DesktopNav'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [isFetchingUser, setIsFetchingUser] = useState(true)

  useEffect(() => {
    setIsFetchingUser(true)
    Auth.user()
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        setUser(null)
      })
      .finally(() => setIsFetchingUser(false))
  }, [])

  const Nav = () => {
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    return useMemo(() => {
      return isMobile ? <MobileNav /> : <DesktopNav />
    }, [isMobile])
  }

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {isFetchingUser ? <Progress size="xs" isIndeterminate /> : <>
        <Box as="header">
          {user ? (
            <Nav />
          ) : (
            <Container>
              <Heading
                as="h1"
                size="2xl"
                my="8"
                textAlign="center"
                lineHeight="shorter"
              >
                My Recipe Library
            </Heading>
            </Container>
          )}
        </Box>
        <Container as="main" alignItems="stretch" mt="8">
          {user ?
            <Switch>
              <Route exact path="/">
                <RecipeSearchScreen />
              </Route>
              <Route exact path="/recipes/all" >
                <RecipeListScreen />
              </Route>
              <Route exact path="/recipes/create" >
                <RecipeCreateForm />
              </Route>
              <Route exact path="/recipes/create-from-url" >
                <RecipeFromUrlForm />
              </Route>
              <Route exact path="/recipes/:recipeId/edit" >
                <RecipeEditForm />
              </Route>
              <Route exact path="/recipes/:recipeId" >
                <RecipeFull />
              </Route>
              <Route path="*">
                <Heading textAlign="center" size="xl" my="60">Page not found</Heading>
              </Route>
            </Switch>
            :
            <Switch>
              <Route exact path="/">
                <LoginForm />
              </Route>
              <Route path="*">
                <Heading textAlign="center" size="xl" my="60">Page not found</Heading>
              </Route>
            </Switch>}
        </Container>
        <Text as="footer" my="8" textAlign="center">
          Made by Ryan
      </Text>
      </>}

    </UserContext.Provider>
  )
}

export default App
