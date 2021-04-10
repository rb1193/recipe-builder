import React, { useState, FormEvent, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import Recipe from '../Contracts/Recipe'
import Recipes from '../Api/Recipes'
import RecipeCardList from './RecipeCardList'
import { usePagination } from '../lib/Pagination/usePagination'
import PaginationLinks from '../lib/Pagination/PaginationLinks'
import qs, { ParsedQs } from 'qs'
import { SubmitButton } from '../lib/Buttons/Buttons'
import { Input } from '@chakra-ui/input'
import { FormControl } from '@chakra-ui/form-control'
import { VStack } from '@chakra-ui/layout'

export default function RecipeSearchScreen() {
    const history = useHistory()
    const location = useLocation()
    const [searched, setSearched] = useState(false);
    const [params, setParams] = useState<ParsedQs>(qs.parse(location.search, { ignoreQueryPrefix: true }));

    const { isLoading, error, items, config, load } = usePagination<Recipe>(Recipes.search)
    const [queryValue, setQueryValue] = useState(params?.query as string || '')

    useEffect(() => {
        setParams(qs.parse(location.search, { ignoreQueryPrefix: true }))
    }, [location])

    useEffect(() => {
        if (undefined === params.query) return
        load(params).then(() => setSearched(true))
    }, [params, load])

    function searchSubmitHandler(event: FormEvent): void {
        event.preventDefault()
        history.push('/?query=' + queryValue + '&page=1')
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
                            value={queryValue}
                            onChange={(e) => setQueryValue(e.target.value)}
                            placeholder="Enter some ingredients..."
                        />
                    </FormControl>
                    <SubmitButton text="Search recipes" isLoading={isLoading} />
                </VStack>
            </form>
            <ApiErrorMessage error={error}/>
            {searched && <RecipeCardList isLoading={isLoading} recipes={items} />}
            <PaginationLinks meta={config} links={5} includeEnds={false} />
        </>
    )
}
