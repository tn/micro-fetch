'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};
const DEFAULT_CREDENTIALS = "include";
const execute = (url, options) => {
  try {
    return fetch(url, {
      ...options
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
const http = (method, path, options) => execute(path, {
  method,
  ...options
});
const microFetch = ({baseUrl, fetchOptions = {}}) => {
  const options = {
    credentials: DEFAULT_CREDENTIALS,
    headers: {
      ...DEFAULT_HEADERS
    },
    ...fetchOptions
  };
  const url = (path) => {
    const pathname = path[0] === "/" ? path.substr(1) : path;
    const basePath = baseUrl.substr(-1) === "/" ? baseUrl : `${baseUrl}/`;
    return basePath + pathname;
  };
  const get = (path, rewriteOptions = {}) => http("GET", url(path), {
    ...options,
    ...rewriteOptions
  });
  const post = (path, body, rewriteOptions = {}) => http("POST", url(path), {
    body,
    ...options,
    ...rewriteOptions
  });
  const put = (path, body, rewriteOptions = {}) => http("PUT", url(path), {
    body,
    ...options,
    ...rewriteOptions
  });
  const remove = (path, rewriteOptions = {}) => http("DELETE", url(path), {
    ...options,
    ...rewriteOptions
  });
  const patch = (path, body, rewriteOptions = {}) => http("PATCH", url(path), {
    body,
    ...options,
    ...rewriteOptions
  });
  return {
    get,
    patch,
    post,
    put,
    remove
  };
};

exports.microFetch = microFetch;
//# sourceMappingURL=micro-fetch.js.map
