import React, { ReactElement, useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router'
import { RequestError } from '../Api/RequestError'
import parseRequestError from '../Api/parseRequestError'
import Recipe from '../Contracts/Recipe'
import Recipes from '../Api/Recipes'
import { RestResponse, ApiError } from '../lib/Api/RestResponse'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import ConfirmationModal from '../lib/Modals/ConfirmationModal'
import { LinkButton } from '../lib/Buttons/Buttons'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { Button, Group } from '@chakra-ui/react'
import { toaster } from '../components/ui/toaster'

export default function RecipeFull(): ReactElement {
    const { recipeId } = useParams<{ recipeId?: string }>()
    const location = useLocation()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [recipe, setRecipe] = useState<Recipe>()
    const [error, setError] = useState<ApiError>()

    useEffect(() => {
        setIsLoading(true)
        fetch(Recipes.one(recipeId || ''))
            .then((res: Response) => {
                if (!res.ok) {
                    res.json().then(json => {
                        throw new RequestError(json)
                    })
                }
                return res.json()
            })
            .then((json: RestResponse<Recipe>) => {
                setRecipe(json.data)
            })
            .catch((err: Error) => {
                setError(parseRequestError(err))
            })
            .finally(() => setIsLoading(false))
    }, [recipeId])

    const handleDelete = async () => {
        if (!recipe) return
        try {
            await fetch(Recipes.delete(recipe.id))
            toaster.create({
                title: "Recipe deleted.",
                description: `${recipe.name} deleted successfully`,
                type: "success",
                duration: 9000,
            })
            navigate('/')
        } catch (err) {
            setError(parseRequestError(err as Error))
        }
    }

    return (
        <Box as="article">
            <ApiLoadingMessage isLoading={isLoading} />
            <ApiErrorMessage error={error} />
            {recipe && (
                <VStack gap="8" alignItems="start">
                    <Heading as="h1" size="lg">{recipe.name}</Heading>
                    {recipe.cooking_time && (
                        <Text>Cooking time: {recipe.cooking_time}</Text>
                    )}
                    {recipe.servings && (
                        <Text>Servings: {recipe.servings}</Text>
                    )}
                    <Text>{recipe.description}</Text>
                    <Heading size="md">Method</Heading>
                    <Text whiteSpace="pre-wrap">{recipe.method}</Text>
                    <Heading size="md">Ingredients</Heading>
                    <Text whiteSpace="pre-wrap">{recipe.ingredients}</Text>
                    <Group>
                        {recipe.url && (
                            <Button asChild>
                                <a href={recipe.url}>View online</a>
                            </Button>
                        )}
                        <LinkButton to={`${location.pathname}/edit`} text="Edit" />
                        <ConfirmationModal
                            confirmationMessage="Are you sure you want to delete this recipe?"
                            onConfirm={handleDelete}
                            buttonColorScheme="red"
                            buttonText="Delete"
                        />
                    </Group>
                </VStack>
            )}
        </Box>
    )
}
