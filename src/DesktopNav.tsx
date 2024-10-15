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
        <HStack spacing="8">
          <Link as={RouterLink} to="/">
            Search Recipes
          </Link>
          <Link as={RouterLink} to="/recipes/create">
            Add Recipe
          </Link>
          <Link as={RouterLink} to="/recipes/all">
            All Recipes
          </Link>
          <LogoutButton />
        </HStack>
      </Flex>
    </>
  )
}
