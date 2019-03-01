##Contributing

**Prerequisites**

Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/). On OSX with [Homebrew](http://brew.sh/) installed it is as easy as:
```sh
brew install node
```

Install dependencies:
```sh
npm install
```

**Running tests (ESLint)**

Run tests once and exit:
```sh
npm js:build:dev
```

Continuous mode. Whenever any source or test file changes, tests will run automatically:
```sh
npm js:watch
```

**Buildind SCSS**

Run
```sh
npm css:build:base
```

or depending on which style you prefer

```sh
npm css:build:theme
```

Continuous mode. Whenever any source or test file changes, build will run automatically:
```sh
npm css:watch
```

**Production Build**

Run the build with the following command:

```sh
npm js:build && npm css:build
```
