import React, { useRef, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import Recipe from '../Contracts/Recipe'
import Recipes from '../Api/Recipes'
import RecipeCardList from './RecipeCardList'
import { usePagination } from '../lib/Pagination/usePagination'
import PaginationLinks from '../lib/Pagination/PaginationLinks'
import qs from 'qs'
import './RecipeSearchScreen.css'
import { SubmitButton } from '../lib/Buttons/Buttons'
import { Input } from '@chakra-ui/input'
import { FormControl } from '@chakra-ui/form-control'
import { Container, VStack } from '@chakra-ui/layout'

type QueryState = {
    query?: string
    page?: string
}

export default function RecipeSearchScreen() {
    let history = useHistory()

    const { isLoading, error, items, config, load } = usePagination<Recipe>(Recipes.search)
    const queryValue = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const unregister = history.listen(location => {
            // Do not attempt to load data if user has left this screen
            if (location.pathname !== '/') {
                return
            }

            const values: QueryState = qs.parse(location.search.slice(1))
            load({
                query: values.query || '',
                page: values.page || '1',
            })
        })

        return () => {
            unregister()
        }
    }, [history, load])

    function searchSubmitHandler(event: FormEvent): void {
        event.preventDefault()
        const queryString = queryValue.current?.value || ''
        history.push('/?query=' + queryString + '&page=1')
    }

    return (
        <>
            <form
                noValidate
                className="RecipeSearchScreen__Form"
                onSubmit={searchSubmitHandler}
            >
                <VStack my="8" spacing="8">
                    <FormControl id="RecipeSearch_QueryInput">
                        <Input
                            aria-label="Recipe search input"
                            autoComplete="off"
                            type="search"
                            name="query"
                            defaultValue={''}
                            ref={queryValue}
                            placeholder="Enter some ingredients..."
                        />
                    </FormControl>
                    <SubmitButton text="Search recipes" />
                </VStack>
            </form>
            <ApiErrorMessage error={error} />
            <ApiLoadingMessage isLoading={isLoading} />
            <RecipeCardList isLoading={isLoading} recipes={items} />
            <PaginationLinks meta={config} links={5} includeEnds={false} />
        </>
    )
}
