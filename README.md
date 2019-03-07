# Web Store SDK

<<<<<<< HEAD
=======
[![Build Status](https://travis-ci.org/Cleeng/web-store-sdk.svg?branch=master)](https://travis-ci.org/Cleeng/web-store-sdk)

>>>>>>> release
An example sign-up process for SVOD using Cleeng API.

This repo contains example app as a set of instructions and code snippets for the web to help implement tailored and custom checkout.

To check Cleeng API documentation, visit [Cleeng Developers](https://developers.cleeng.com/reference).

# Architecture

This application is build with React + Redux and Node.js.

To check the flow in application, see the diagram below:

<<<<<<< HEAD
![diagram](diagram.png?raw=true 'Web Store SDK action flow diagram')
=======
![diagram](diagram.jpg?raw=true 'Web Store SDK action flow diagram')
>>>>>>> release

Let's describe application architecture and how it works in login example. Interaction starts with frontend React component. When user click `Log in` button, component calls `login()` method in `src/services/authentication.js`. From there, there is `/login` endpoint called in backend - Node.js server. Then, `CleengApi/backend/User.js` connector adds `PUBLISHER_TOKEN` and maps to Cleeng Api methods, here this will be [generateCustomerTokenFromPassword](https://developers.cleeng.com/generate-customer-token-from-password).

To check file structure, see [project structure](DEVELOPMENT.md#project-structure) page.

# Usage

For development guides, instructions how to launch the app, read [Development guide](DEVELOPMENT.md)

# License

The Cleeng Web Store SDK is open source and available under the BSD 3-Clause License. See the [LICENSE](LICENSE.md) file for more info.
