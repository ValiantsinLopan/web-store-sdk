# Development Notes

## Table of Contents

- [Building](#building)
- [Project Environment](#project-environment)
- [Project Structure](#project-structure)
- [Translations](#translations)
- [Linting](#linting)
- [Testing](#testing)

This section applies to internal Web Store SDK development.

## Building

1.  Clone the latest version of Web Store SDK on your local machine.

2.  Install dependencies.

Run

```
yarn install
```

or

```
npm run install
```

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

3. In order to run application locally, create `development.js` file in `src/environments/`. It is described in [project environments](DEVELOPMENT.md#project-environment) section.

4. Serve application

Run

```
yarn start
```

or

```
npm run start
```

To build and serve the application with hot reloading. This command will build application in `development` mode. To check how your app works in release
(production) mode, run: `yarn start -- --release`.

Run

```
yarn build
```

or

```
npm run build
```

to build the application.

## Project Environment

Environment variables are stored in files in `src/environments/x.js` where `x` could be `production, sandbox, staging, development`. `staging.js` and `development.js` files are not committed and is ignored via `.gitignore`. You will need to create local file and set some variables within it.

Here's an example `production.js` file:

```
module.exports = {
  FRONT_END_CONF: {
    CLEENG_API_JS: JSON.stringify('https://cleeng.com/js-api/3.0/api.js'),
    GOOGLE_TAG_MANAGER: JSON.stringify('GTM-XXX'),
  },
  BACKEND_CONF: {
    CLEENG_API_FULL_URL: JSON.stringify('https://cleeng.com/api/3.0/json-rpc'),
  },
  PUBLISHER_ID: JSON.stringify('XXX'),
  PUBLISHER_TOKEN: JSON.stringify('XXX'),
  OFFER_ID: JSON.stringify('XXX'),
};
```

- **CLEENG_API_JS** identifies the host of js api, you can also use `https://sandbox.cleeng.com/js-api/3.0/api.js`
- **CLEENG_API_FULL_URL** identifies the of api, you can also use `https://sandbox.cleeng.com/api/3.0/json-rpc`
- **PUBLISHER_ID** identifies publisher's ID.
- **PUBLISHER_TOKEN** identifies publisher's token.
- **OFFER_ID** identifies ID of your offer.
- **GOOGLE_TAG_MANAGER** identifies Google Tag Manager id.

## Project Structure

```
Web Store SDK
├── src/               <- source code
│   ├── actions/       <- Redux actions
│   └── CleengApi      <- Cleeng API connectors
│   └── components
│       └── common     <- Reusable basic components
│       └── containers <- components with Cleeng API connection
│       └── hoc        <- HOC components
│   └── config         <- config for i18next and client related things e.g. checkout flow, publisherId
│   └── controller     <- middleware controllers
│   └── environment    <- ENV variables
│   └── reducers       <- Redux reducers
│   └── routes         <- Router
│       └── error      <- error page
│       └── init       <- handler of main application (checkout states)
│       └── not-found  <- not found page
│   └── routes         <- Common styles
├── test/              <- testing suite
│   └── helpers/       <- testing helpers
└── tools/             <- webpack scripts
    ├── scannerI18n.js <- Script for generating locale translations files
    └── mergeLocals.js <- Script for merging locale translations
```

## Translations

Local translation strings are stored in component's folder in `locales/`. In that folder you will find language specific files, like `en_US.json`. You can easily overrite the translation string in JSON file.

To generate locales files, run `npm run scani18next`. This script is searching for `t("example string")` in files and generate JSON files from it. To join all locales files, run `npm run mergeLocals`. Merged files will appear in `build/public/locales/[language]/`.

You can find this scripts in `tools/scannerI18n.js` and `tools/mergeLocals.js`.

## Linting

For all code

```
npm run lint
```

For js files

```
npm run lint-js
```

For css files

```
npm run lint-css
```

## Testing

There is Jest + Enzyme used to test frontend part of application. Helper files to render the components are in `test/helpers/testComponenetHelper.js` file.
To launch unit tests, run:

```
npm run test          # Run unit tests with Jest
npm run test:watch    # Launch unit test runner and start watching for changes
```
