# StudyDiary
This Angular application aims to record a person's daily studies.

## Technology
- Angular 9
- PWA
- Firebase 7.14
- Bootstrap 4
- FontAwesome 5
- SweetAlert 2
- ngx-pagination 5
- ngx-toastr 12
- ESLint (In place of the TSLint)

## Instalation
Run the commands below on the terminal, being in the desired directory to run the project.
```shell
git clone git@github.com:natancardosodev/study-diary.git
cd study-diary
npm install
```
## Execution
You must create a project in Firebase and a realtime database, create a web app, capture the settings and put it in the file `src/environments/firebase.ts`
```shell
npm run start
```
Then open the browser at the address: http://localhost:4200/study

### PWA
This application is a Progressive Web App, which will have an experience and features similar to a mobile application.

### ESLint
To add ESLint, the following steps were taken:
```shell
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser @typescript-eslint/eslint-plugin-tslint
npx tslint-to-eslint-config
./node_modules/.bin/eslint src/app/** --ext .ts
```
