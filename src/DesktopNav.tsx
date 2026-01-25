import React from 'react'
import LogoutButton from './Auth/LogoutButton'
import { Flex, Heading, HStack, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function DesktopNav(): React.ReactElement {
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Heading size="xl" py="8">
          My Recipe Library
        </Heading>
        <HStack gap="8">
          <Link asChild>
            <RouterLink to="/">Search Recipes</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/recipes/create">Add Recipe</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/recipes/all">All Recipes</RouterLink>
          </Link>
          <LogoutButton />
        </HStack>
      </Flex>
    </>
  )
}
