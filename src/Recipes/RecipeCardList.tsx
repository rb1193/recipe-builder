import { Alert, List } from '@chakra-ui/react'
import { MdWarning } from 'react-icons/md'
import Recipe from '../Contracts/Recipe'
import RecipeCard from './RecipeCard'

type RecipeCardListProps = {
  recipes: Recipe[]
  isLoading: boolean
}

export default function RecipeCardList(props: RecipeCardListProps) {
  const { recipes, isLoading } = props

  if (recipes.length > 0) {
    return (
      <List.Root gap="8" listStyle="none">
        {recipes.map((recipe: Recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />
        })}
      </List.Root>
    )
  }

  return (
    <>
      {!isLoading && (
        <Alert.Root status="warning">
          <Alert.Indicator>
            <MdWarning />
          </Alert.Indicator>
          <Alert.Title>No recipes found</Alert.Title>
        </Alert.Root>
      )}
    </>
  )
}
