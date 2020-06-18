import { Server, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
    let server = new Server({
        environment,

        models: {
            user: Model,
        },

        routes() {
            this.urlPrefix = 'https://local.recipes-api.arbee.me'

            this.get('/user', (schema, request) => {
                return { data: schema.users.first() }
            })
        },
    })
    return server
}
