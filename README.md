# use-click-out

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/brunoscopelliti/use-click-out/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@bscop/use-click-out.svg?style=flat)](https://www.npmjs.com/package/@bscop/use-click-out)
[![CircleCI Status](https://circleci.com/gh/brunoscopelliti/use-click-out.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/brunoscopelliti/use-click-out)
[![Coverage](https://img.shields.io/codecov/c/github/brunoscopelliti/use-click-out)](https://app.codecov.io/gh/brunoscopelliti/use-click-out/)

A custom React hook to fire an event when user clicks outside the component.

## Install

```
npm i @bscop/use-click-out
```

## Usage

```js
import useClickOut from "@bscop/use-click-out";

const App = () => {
  const ref = useClickOut(
    () => {
      console.log("Click out of #demo");
    },
    true
  );

  return (
    <div id="#demo" ref={ref}>
      App!
    </div>
  );
};
```

## Contribute

Read the [guidelines](./CONTRIBUTING.md).

### Run tests

```
npm test
```

### Coverage

Coverage reports are hosted on [codecov](https://codecov.io/).

```
npm run badge:coverage -- --token=<guid>
```

---

Bruno Scopelliti\
www.brunoscopelliti.com
