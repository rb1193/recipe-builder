import React, { useEffect, useRef } from 'react'
import LogoutButton from './Auth/LogoutButton'
import { Flex, Heading, Link, VStack } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react'
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'

export default function MobileNav(): React.ReactElement {
  const btnRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const location = useLocation()

  useEffect(() => {
    onClose()
  }, [onClose, location])

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        bgColor="teal.500"
        color="white"
      >
        <Heading size="xl" my="8">
          My Recipe Library
        </Heading>
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          size="md"
          variant="outline"
          bgColor="white"
          color="gray.500"
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <VStack spacing="8" pt="8">
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
            </VStack>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
