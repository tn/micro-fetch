## Micro-Fetch ![status](https://travis-ci.org/tn/micro-fetch.svg?branch=main)

A tiny zero-dependencies http methods library.

### Size
`~300B` gzipped

### Requirements
* `fetch` (native browser support or `node-fetch` like polyfill)

### Get started
```bash
npm i @nurislamov/micro-fetch
# or
yarn add @nurislamov/micro-fetch
```

### Typings
```ts
interface MFOptions {
  baseUrl: string
  fetchOptions?: Omit<RequestInit, 'method' | 'body'>
}

const { get } = microFetch(options: MFOptions)

get(path: string, options: Omit<RequestInit, 'method' | 'body'>): Promise<Response>

post(path: string, body: BodyInit, options: Omit<RequestInit, 'method' | 'body'>): Promise<Response>
```

### Default headers
```js
{
  'Content-Type': 'application/json'
}
```

### Default credentials
```js
'include'
```

### Using
```ts
import { microFetch } from 'micro-fetch'

/** ... */

const {
  get,
  post,
  patch,
  put,
  remove
} = microFetch({
  baseUrl: 'https://mysite.com/api',
  fetchOptions: {
    credentials: 'omit',
    headers: {
      /** ... */
    }
  }
})

const response = await get('pathname', { cache: 'no-cache' })
const data = await response.json()
```

### Development
```bash
yarn
yarn dev
```

### Build
```bash
yarn build
```

### Testing
```bash
yarn test
```
