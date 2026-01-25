import { useEffect, useRef } from 'react'
import LogoutButton from './Auth/LogoutButton'
import { Flex, Heading, Link, VStack, Portal } from '@chakra-ui/react'
import { IconButton, Drawer } from '@chakra-ui/react'
import { HiMenu } from 'react-icons/hi'
import { Link as RouterLink, useLocation } from 'react-router'
import { useDisclosure } from '@chakra-ui/react'

export default function MobileNav() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const { open, onOpen, onClose } = useDisclosure()
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
          size="md"
          variant="outline"
          bgColor="white"
          color="gray.500"
          ref={btnRef}
          colorPalette="teal"
          onClick={onOpen}
        >
          <HiMenu />
        </IconButton>
      </Flex>
      <Drawer.Root
        open={open}
        onOpenChange={(details) => !details.open && onClose()}
        placement="start"
        finalFocusEl={() => btnRef.current}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger />
              <Drawer.Body>
                <VStack gap="8" pt="8">
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
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}
