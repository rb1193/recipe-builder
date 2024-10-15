import { Alert } from '@chakra-ui/react'
import { AlertIcon } from '@chakra-ui/icons'
import { List } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import Recipe from '../Contracts/Recipe'
import RecipeCard from './RecipeCard'

type RecipeCardListProps = {
  recipes: Recipe[]
  isLoading: boolean
}

export default function RecipeCardList(
  props: RecipeCardListProps,
): ReactElement {
  const { recipes, isLoading } = props

  if (recipes.length > 0) {
    return (
      <List spacing="8">
        {recipes.map((recipe: Recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />
        })}
      </List>
    )
  }

  return (
    <>
      {!isLoading && (
        <Alert status="warning">
          <AlertIcon />
          No recipes found
        </Alert>
      )}
    </>
  )
}
