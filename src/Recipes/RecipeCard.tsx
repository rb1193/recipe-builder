import { Heading, Text, VStack } from '@chakra-ui/layout'
import React, { ReactElement } from 'react'
import Recipe from '../Contracts/Recipe'
import { LinkButton } from '../lib/Buttons/Buttons'

interface RecipeCardProps {
    recipe: Recipe
}

export default function RecipeCard(props: RecipeCardProps): ReactElement {
    const { recipe } = props
    return (
        <VStack as="li" spacing="4" alignItems="start">
            <Heading size="md">{recipe.name}</Heading>
            <Text>{recipe.description}</Text>
            {recipe.cooking_time && <Text>Cooking time: {recipe.cooking_time} minutes</Text>}
            <LinkButton to={`/recipes/${recipe.id}`} text="View full recipe" />
        </VStack>
    )
}
