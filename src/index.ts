export type MFRewriteFetchOptions = Omit<RequestInit, 'method' | 'body'>

export interface MFOptions {
  baseUrl: string
  fetchOptions?: MFRewriteFetchOptions
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

const DEFAULT_CREDENTIALS = 'include'

const execute = (url: string, options: RequestInit) => {
  try {
    return fetch(url, {
      ...options
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

const http = (method: string, path: string, options: RequestInit) =>
  execute(path, {
    method,
    ...options
  })

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const microFetch = ({baseUrl, fetchOptions = {}}: MFOptions) => {
  const options: RequestInit = {
    credentials: DEFAULT_CREDENTIALS,
    headers: {
      ...DEFAULT_HEADERS
    },
    ...fetchOptions
  }

  const url = (path: string): string => {
    // eslint-disable-next-line no-magic-numbers
    const pathname = path[0] === '/' ? path.substr(1) : path
    // eslint-disable-next-line no-magic-numbers
    const basePath = baseUrl.substr(-1) === '/' ? baseUrl : `${baseUrl}/`

    return basePath + pathname
  }

  const get = (path: string, rewriteOptions: MFRewriteFetchOptions = {}) =>
    http('GET', url(path), {
      ...options,
      ...rewriteOptions
    })

  const post = (path: string, body: BodyInit, rewriteOptions: MFRewriteFetchOptions = {}) =>
    http('POST', url(path), {
      body,
      ...options,
      ...rewriteOptions
    })

  const put = (path: string, body: BodyInit, rewriteOptions: MFRewriteFetchOptions = {}) =>
    http('PUT', url(path), {
      body,
      ...options,
      ...rewriteOptions
    })

  const remove = (path: string, rewriteOptions: MFRewriteFetchOptions = {}) =>
    http('DELETE', url(path), {
      ...options,
      ...rewriteOptions
    })

  const patch = (path: string, body: BodyInit, rewriteOptions: MFRewriteFetchOptions = {}) =>
    http('PATCH', url(path), {
      body,
      ...options,
      ...rewriteOptions
    })

  return {
    get,
    patch,
    post,
    put,
    remove
  }
}
