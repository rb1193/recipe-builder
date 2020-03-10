import { RecipeSearchFormValues } from "../Recipes/RecipeSearchScreen";
import { RestResponse, PaginatedRestResponse } from "../lib/Api/RestResponse";
import { CreateRecipeFormValues } from "../Recipes/RecipeCreateForm";
import Recipe from '../Contracts/Recipe';

const Recipes = {
    search: (values: RecipeSearchFormValues): Promise<PaginatedRestResponse<Recipe[]>> => {
        return new Promise((resolve, reject) => {
            switch(values.page) {
                case 1:
                    setTimeout(() => {
                        //reject(new Error('Unauthenticated'))
                        resolve(
                            {
                                code: 200,
                                data: [{
                                    id: "sfdsfdsfds",
                                    name: 'Stew',
                                    description: 'Tasty',
                                    ingredients: '1 potato, 2 potato',
                                    cooking_time: 100,
                                    method: '',
                                }],
                                meta: {
                                    per_page: 1,
                                    last_page: 2,
                                    current_page: 1,
                                } 
                            }
                        )
                    }, 2000);
                    break;
                case 2:
                    setTimeout(() => {
                        //reject(new Error('Unauthenticated'))
                        resolve(
                            {
                                code: 200,
                                data: [{
                                    id: "asdrert",
                                    name: 'SpagBol',
                                    description: 'MMMMMM',
                                    ingredients: '1 tomato, 2 tomato',
                                    cooking_time: 100,
                                    method: '',
                                }],
                                meta: {
                                    per_page: 1,
                                    last_page: 2,
                                    current_page: 2
                                } 
                            }
                        )
                    }, 2000);
                    break;
                default:
                    setTimeout(() => {
                        //reject(new Error('Unauthenticated'))
                        reject(
                            {
                                code: 500,
                                data: {
                                    message: "Damn"
                                },
                            }
                        )
                    }, 250);
            }
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