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
        return new Promise<RestResponse<Recipe>>((resolve, reject) => {
            setTimeout(() => {
                const recipe = {...values, cooking_time: 20}
                resolve({
                    code: 200,
                    data: {
                        id: Math.random().toString(36),
                        ...recipe
                    },
                })
            }, 250)
        })
    },
    update: async (id: string, values: CreateRecipeFormValues): Promise<RestResponse<Recipe>> => {
        return new Promise<RestResponse<Recipe>>((resolve, reject) => {
            setTimeout(() => {
                const recipe = {...values, cooking_time: 20}
                resolve({
                    code: 200,
                    data: {
                        id: id,
                        ...recipe
                    },
                })
            }, 250)
        })
    },
    one: async (recipeId: string): Promise<RestResponse<Recipe>> => {
        return new Promise<RestResponse<Recipe>>((resolve) => {
            resolve({
                code: 200,
                data: {
                    id: recipeId,
                    name: "Lala",
                    description: "L",
                    method: "looo",
                    cooking_time: 10,
                    ingredients: "1 onion",
                },
            })
        })
    }
}

export default Recipes;