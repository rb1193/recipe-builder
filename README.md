# Ryan's Recipe Library Frontend

This app is built with React and uses Vite for local development and production builds.

It is deployed to Netlify. Deploying can be done via the Netlify UI.

## Local Development

To run the app locally, generate an SSL certificate using mkcert. Add the certificate and key to the certs directory, naming them `server.pem` and `key.pem`.

Then run `yarn install` and finally `yarn start`. Note that you will want to run the backend API locally as well to do much development, see <https://github.com/rb1193/recipe-api> for instructions.
