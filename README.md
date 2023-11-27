# Webpack-starter

A webpack preConfigured start kit
There is two scripts for dev and build

if dev server have problems with hot reload
set "hot" flag to false and "liveReload" to true.

change title of your page in webpack.common.js html-webpack-plugin title property.

## Codes for initializing
```
npm init -y
npm install webpack webpack-cli --save-dev
npm install webpack-merge --save-dev
npm install webpack-dev-server --save-dev

npm install html-webpack-plugin --save-dev
npm install -D babel-loader @babel/core @babel/preset-env
npm install style-loader css-loader --save-dev
npm install sass-loader sass --save-dev
npm install mini-css-extract-plugin --save-dev

<!-- ######################################## -->

npm install eslint eslint-config-prettier prettier --save-dev --save-exact
npx eslint --init
```
Add "prettier" to extends in eslintrc.json
```
"extends": ["some eslint config", "prettier"]
```
Optional Packages
```
npm install material-symbols@latest
```

## Add to package.json 
```
"lint": "eslint .",
"lint:fix": "eslint . --fix"
```

### Scripts
```
"start": "webpack serve --config webpack/webpack.config.dev.js"
"build": "webpack --config webpack/webpack.config.prod.js"
"push-dist": "git subtree push --prefix dist origin gh-pages"
```

***ToDo: will add more features like react support and babel***