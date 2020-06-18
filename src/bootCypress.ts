import { Server, Response } from 'miragejs'

type TestWindow = Window & {
    handleFromCypress: (request: Request) => Promise<any>
}

function isTestWindow(window: Window | TestWindow): window is TestWindow {
    return window.hasOwnProperty('Cypress')
}

export default function bootCypress() {
    if (isTestWindow(window)) {
        const testWindow: TestWindow = window
        new Server({
            environment: 'test',
            routes() {
                this.urlPrefix = 'https://local.recipes-api.arbee.me'
                
                let methods = ['get', 'put', 'patch', 'post', 'delete']
                methods.forEach((method) => {
                    (this as any)[method]('/*', async (schema: any, request: Request) => {
                        let [
                            status,
                            headers,
                            body,
                        ] = await testWindow.handleFromCypress(request)
                        return new Response(status, headers, body)
                    })
                })
            },
        })
    }
}
