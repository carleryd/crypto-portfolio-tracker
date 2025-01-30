# Simple Cryptocurrency Portfolio

## Hosted environment

https://carleryd.github.io/crypto-portfolio-tracker/

## Getting Started

1. Install dependencies locally.
2. Get a [Coingecko API token](https://www.coingecko.com/en/api). I recommend getting the demo token which is free.
3. Create a `.env.local` copy of `.env` file in the root of the project and populate the Coingecko API token env variable.
4. Run the app

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About

This project is a simple cryptocurrency portfolio tracker built with [TypeScript](https://www.typescriptlang.org/), [React](https://react.dev/), [MaterialUI](https://mui.com/material-ui/), [Zustand](https://github.com/pmndrs/zustand) and [zod](https://zod.dev/) for validating request payloads.

The future of this project is very unclear, but below are some improvements which should be made if it were to be developed further.

## Work to do

- UI design needs some love. Most effort has been put into the functionality so far.
- Uniform location for handling conversion of Remote (Coingecko) and Internal (Lightweight charts) types
- React Router does not have support for typing route params. I've made some effort to resolve this, but it's not perfect as it needs a lot of manual asserting. Consider alternatives like (react-router-typesafe-routes)[https://github.com/fenok/react-router-typesafe-routes], but also consider removing types altogether and perform runtime validation on route params instead.
