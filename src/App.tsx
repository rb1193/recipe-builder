import React, { useEffect, useMemo, useState } from 'react'

import { Routes, Route } from 'react-router-dom'

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
              <Routes>
                <Route path="/" element={<RecipeSearchScreen />} />
                <Route path="recipes">
                  <Route path="all" element={<RecipeListScreen />}/>
                  <Route path="create" element={<RecipeCreateForm />} />
                  <Route path="create-from-url" element={<RecipeFromUrlForm />} />            
                  <Route path=":recipeId/edit" element={<RecipeEditForm />} />                                  
                  <Route path=":recipeId" element={<RecipeFull />} />                                      
                </Route>                
                <Route path="*" element={<Heading textAlign="center" size="xl" my="60">Page not found</Heading>} />                                  
              </Routes>
              :
              <Routes>
                <Route path="/" element={<LoginForm />} />                                  
                <Route path="*" element={<Heading textAlign="center" size="xl" my="60">Page not found</Heading>} />                                  
              </Routes>}
          </Container>
          <Text as="footer" my="8" textAlign="center">
            Made by Ryan
        </Text>
        </>}

      </UserContext.Provider>
  )
}

export default App
