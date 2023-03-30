# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Setup Firebase

https://firebase.google.com/docs/web/setup?hl=pt-br

## Setup Deploy

**Install Firebase CLI**

Firebase CLI can be installed globally or used as a standalone binary (your choice). Follow official guide: https://firebase.google.com/docs/cli

Execute: `firebase login`

**Setup Firebase Hosting**

Execute: `firebase init hosting`

- ❯ Use an existing project
- ❯ sd-mvp-social-care (sd-mvp-social-care)
- ? What do you want to use as your public directory? build
- ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y
- ? Set up automatic builds and deploys with GitHub? (y/N) y
- ? For which GitHub repository would you like to set up a GitHub workflow? (format:
  user/repository) (andresjesse/sd-mvp-social-care)
- ? Set up the workflow to run a build script before every deploy? Yes
- ? What script should be run before every deploy? yarn install --frozen-lockfile && yarn build
- ? Set up automatic deployment to your site's live channel when a PR is merged? (Y/n) Y
- ? What is the name of the GitHub branch associated with your site's live channel? main
