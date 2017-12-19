# mailer

This is a basic mailer.

## Before all...

Be sure [node v6](https://nodejs.org/en/download/) (or more) and [gulp](http://gulpjs.com/) are installed.
We use yarn to manage dependencies. But you can use what you want.

## The tasks

### Default

```
yarn
```

It will launch the tasks 'babel' and 'doc'.

### Babel

```
yarn babel
```

It will compile your ES6 project to ES5 in /dist.

### Doc

```
yarn doc
```

It will write all jsdoc commentaries and build the doc in /doc.

### Test

```
yarn test
```

It will launch the tasks 'lint' and 'unit-tests'.

### Lint

```
gulp lint
```

It tests the code quality.

### Unit-tests

```
gulp unit-tests
```

It launch the unit's tests and build the report in /coverage.

### Cleanup

```
yarn  cleanup
```

It removes the folders /dist, /doc, /generators and /coverage.

## Getting Started

1- Clone the repo:

```
git clone http://git.myrepo.com
cd mailer
```

2- Install dependencies:

```
yarn install
```

3- Build the project:

```
yarn build
```

## Git hooks

For code quality, we have add a prepush hook. It launch the tasks 'test'. If the linter throw an error, a unit-test fail or the coverage is not insured, the push is canceled.

## Let's go to use!

Be sure you have set environment variables process.env.LOGIN_MAIL & process.env.PASS_MAIL : nodemailer need it to work.

To use go to the project folder, build the /dist with `npm run build` and after `npm run start`. That's all.
