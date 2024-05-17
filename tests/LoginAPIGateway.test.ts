import { afterEach, describe, expect, it } from 'vitest'
import { createLoginAPIGateway } from '../src/LoginAPIGateway'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

describe('Login API Gateway', () => {
  const BASE_URL = 'http://msw.mockapi.local'

  const gateway = createLoginAPIGateway(BASE_URL)
  const mockServer = createMockServer(BASE_URL)

  afterEach(() => {
    mockServer.resetHandlers()
  })

  it('returns user on right credentials', async () => {
    mockServer.interceptPost('/login', HttpResponse.json({
      "id": "599dd5eb-fdea-4472-8baf-81ef7c18a2f1",
      "username": "alessio89",
      "about": "About Alessio user."
    }))

    const loggedUser = await gateway.login('any', 'any')

    expect(loggedUser).toStrictEqual({
      id: '599dd5eb-fdea-4472-8baf-81ef7c18a2f1',
      username: 'alessio89',
      about: 'About Alessio user.'
    })
  })

  it('send properly request data to the API', async () => {
    const interceptor = mockServer.interceptPost('/login', loginOkResponse())

    await gateway.login('alessio89', 'thePassword')

    expect(interceptor.receivedJsonBody()).toStrictEqual({
      username: 'alessio89',
      password: 'thePassword'
    })
  })

  it('throws invalid credentials error on wrong credentials', async () => {
    mockServer.interceptPost('/login', invalidCredentialsResponse())

    await expect(async () => {
      await gateway.login('wrong', 'wrong')
    }).rejects.toThrow(new Error("INVALID_CREDENTIALS"))
  })

  it('throws network error on server not reachable', async () => {
    mockServer.interceptPost('/login', HttpResponse.error())

    await expect(async () => {
      await gateway.login('any', 'any')
    }).rejects.toThrow(new Error("NETWORK_ERROR"))
  })

  function loginOkResponse() {
    return HttpResponse.json({
      "id": "0c85dc2f-6c7d-430d-a827-0e8aa30437d3",
      "username": "dani90",
      "about": "About Dani user."
    })
  }

  function invalidCredentialsResponse() {
    return new HttpResponse('Invalid credentials.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
})

function createMockServer(baseUrl: string) {
  const mockServer = setupServer()
  mockServer.listen({ onUnhandledRequest: 'error' })

  return {
    interceptPost(path: string, response: HttpResponse) {
      let receivedJsonBody: any;
      mockServer.use(http.post(baseUrl + path, async (request) => {
        receivedJsonBody = await request.request.json()
        return response
      }))

      return {
        receivedJsonBody() {
          return receivedJsonBody
        }
      }
    },
    resetHandlers() {
      mockServer.resetHandlers()
    }
  }
}
