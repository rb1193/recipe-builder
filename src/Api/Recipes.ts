import { QueryValues } from "../Recipes/PaginatedRecipeSearchScreen";
import { RestResponse, PaginatedRestResponse } from "../lib/Api/RestResponse";
import { CreateRecipeFormValues } from "../Recipes/RecipeCreateForm";
import Recipe from '../Contracts/Recipe';
import defaultRequestOptions from './defaultRequestOptions';
import qs from 'qs';

const Recipes = {
    search: (values: QueryValues): Promise<PaginatedRestResponse<Recipe[]>> => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'GET',
        }
        const params = qs.stringify(values)
        return fetch(`${process.env.REACT_APP_API_URL}/recipes?${params}`, options).then((res) => {
            return res.json()
        })
    },
    store: async (values: CreateRecipeFormValues): Promise<RestResponse<Recipe>> => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(values)
        }

        return fetch(`${process.env.REACT_APP_API_URL}/recipes`, options).then((res) => {
            return res.json()
        })
    },
    update: async (id: string, values: CreateRecipeFormValues): Promise<RestResponse<Recipe>> => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'PUT',
            body: JSON.stringify(values)
        }

        return fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`, options).then((res) => {
            return res.json()
        })
    },
    one: async (recipeId: string): Promise<RestResponse<Recipe>> => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'GET',
        }
        return fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, options).then((res) => res.json())
    },
    delete: async(recipeId: string): Promise<void> => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'DELETE',
        }
        return fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, options).then()
    }
}

export default Recipes;