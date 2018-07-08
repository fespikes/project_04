# ErpFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Dev

```bash
npm install --registry http://172.16.1.161:30033/repository/npm-group/
npm start
```

## i18n

```bash
npm run i18n
```

## Collaboration

***must do***

0. run npm start
1. pass: ng lint  #for instance,use tslint extension in vsCode
2. pass: npm run test #for debugging unit tests, run: npm run lint:sm
3. pass: npm run build

***nice to have***

遵照 [karma commit rule](http://karma-runner.github.io/0.10/dev/git-commit-msg.html) 来描述commit。

## Define modules

- shared: shared things between modules
- gallery

## Build (must after: npm run i18n)

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## build image

Please notice: when node dependances changed，you need to rebuild docker image, in project folder:

```
docker build . -f ci/Dockerfile -t tcc/tdc-eco-ci
docker tag tcc/tdc-eco-ci 172.16.1.99/frontend/tdc-eco-frontend/build/tdc-eco-ci:latest
docker push 172.16.1.99/frontend/tdc-eco-frontend/build/tdc-eco-ci:latest
```

### Get the latest artifacts

the same files like get by `npm run build`:
```
http://172.16.1.41:10080/TDC/tdc-eco-frontend/-/jobs/artifacts/master/download?job=postcommit
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
