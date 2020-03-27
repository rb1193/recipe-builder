import { QueryValues } from "../Recipes/PaginatedRecipeSearchScreen";
import defaultRequestOptions from './defaultRequestOptions';
import qs from 'qs';
import Recipe from "../Contracts/Recipe";

const Recipes = {
    search: (values: QueryValues): Request => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'GET',
        }
        const params = qs.stringify(values)
        return new Request(`${process.env.REACT_APP_API_URL}/recipes?${params}`, options)
    },
    store: (values: Omit<Recipe, 'id'>): Request => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(values)
        }
        return new Request(`${process.env.REACT_APP_API_URL}/recipes`, options)
    },
    update: (id: string, values: Omit<Recipe, 'id'>): Request => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'PUT',
            body: JSON.stringify(values)
        }
        return new Request(`${process.env.REACT_APP_API_URL}/recipes/${id}`, options)
    },
    one: (recipeId: string): Request => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'GET',
        }
        return new Request(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, options)
    },
    delete: (recipeId: string): Request => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'DELETE',
        }
        return new Request(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, options)
    }
}

export default Recipes;