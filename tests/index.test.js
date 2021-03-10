const fetch = require('jest-fetch-mock')
const { microFetch } = require('../dist/micro-fetch')

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('make get request', async () => {
    fetch.mockResponse(JSON.stringify({ ok: true }))
    const { get } = microFetch({ baseUrl: 'http://google.com' })

    const res = await get('somepath')
    const json = await res.json()

    expect(fetch.mock.calls[0][0]).toEqual('http://google.com/somepath')
    expect(json.ok).toBeTruthy()
  })

  it('make consistent pathname', async () => {
    fetch.mockResponse(JSON.stringify({ ok: true }))
    const { get } = microFetch({ baseUrl: 'http://google.com' })

    const res = await get('/somepath/path/123?param=1/')
    const json = await res.json()

    expect(fetch.mock.calls[0][0]).toEqual('http://google.com/somepath/path/123?param=1/')
    expect(json.ok).toBeTruthy()
  })

  it('make consistent baseUrl', async () => {
    fetch.mockResponse(JSON.stringify({ ok: true }))
    const { get } = microFetch({ baseUrl: 'http://google.com/api/v1' })

    const res = await get('somepath/path/123?param=123/')
    const json = await res.json()

    expect(fetch.mock.calls[0][0]).toEqual('http://google.com/api/v1/somepath/path/123?param=123/')
    expect(json.ok).toBeTruthy()
  })

  it('make post request', async () => {
    fetch.mockResponse(JSON.stringify({ ok: true }))
    const { post } = microFetch({ baseUrl: 'http://google.com' })

    const res = await post('somepath', JSON.stringify({ data: 123 }))
    const json = await res.json()

    expect(fetch.mock.calls[0][0]).toEqual('http://google.com/somepath')
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({data: 123})
    expect(json.ok).toBeTruthy()
  })

  it('make put request', async () => {
    fetch.mockResponse(JSON.stringify({ ok: true }))
    const { put } = microFetch({ baseUrl: 'http://google.com' })

    const res = await put('somepath', JSON.stringify({ data: 123 }))
    const json = await res.json()

    expect(fetch.mock.calls[0][0]).toEqual('http://google.com/somepath')
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({data: 123})
    expect(json.ok).toBeTruthy()
  })

  it('make patch request', async () => {
    fetch.mockResponse(JSON.stringify({ ok: true }))
    const { patch } = microFetch({ baseUrl: 'http://google.com' })

    const res = await patch('somepath', JSON.stringify({ data: 123 }))
    const json = await res.json()

    expect(fetch.mock.calls[0][0]).toEqual('http://google.com/somepath')
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({data: 123})
    expect(json.ok).toBeTruthy()
  })

  it('make delete request', async () => {
    fetch.mockResponse(JSON.stringify({ ok: true }))
    const { remove } = microFetch({ baseUrl: 'http://google.com' })

    const res = await remove('somepath')
    const json = await res.json()

    expect(fetch.mock.calls[0][0]).toEqual('http://google.com/somepath')
    expect(json.ok).toBeTruthy()
  })

  it('make failed', async () => {
    fetch.mockReject(new Error('failed'))
    const { get } = microFetch({ baseUrl: 'http://google.com' })

    try {
      await get('invalidpath')
    } catch (err) {
      expect(err.message).toEqual('failed')
    }
  })
})
