# AngularEcommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Cloning and running the project

1. Clone the repository and download the source code
2. do npm i --force ( this project is using angular 14+)
3. to run the project: npm start

## More details about the project

1. for pagination use ngb-bootstrap, for notification header ng-toaster, bootstrap, fontawesome.
2. It uses Okta-sign-in widget using okta - @okta/okta-signin-widget, for authentication - "@okta/okta-auth-js. (uses client-id and client-issuer from https://developer.okta.com/ in oidc defined in my-app-config file
3. It uses a self-signed certificate generated using - https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl
4. and as it uses a self-signed certificate, I have given this command in npm start - ng serve --ssl=true --ssl-key=./ssl-localhost/localhost.key --ssl-cert=./ssl-localhost/localhost.crt
5. This project used an authentication service, to add a bearer token to those API calls which have an access token, and as the request is immutable we clone it and add a bearer token.
6. to demonstrate the role-based access this project has a specialized page to role-based access for authenticated users to see their order history and members discount page. 


