import { afterEach, describe, expect, it } from 'vitest'
import { createLoginAPIGateway } from '../src/LoginAPIGateway'
import { http, HttpResponse, JsonBodyType, StrictResponse } from 'msw'
import { setupServer } from 'msw/node'

describe('Login API Gateway', () => {
  const mockServer = setupServer()
  mockServer.listen({ onUnhandledRequest: 'error' })

  afterEach(() => {
    mockServer.resetHandlers()
  })

  it('returns user on right credentials', async () => {
    interceptPost('/login', HttpResponse.json({
      "id": "599dd5eb-fdea-4472-8baf-81ef7c18a2f1",
      "username": "alessio89",
      "about": "About Alessio user."
    }))

    const gateway = createLoginAPIGateway()

    const loggedUser = await gateway.login('alessio89', 'correctPa$$word')

    expect(loggedUser).toStrictEqual({
      id: '599dd5eb-fdea-4472-8baf-81ef7c18a2f1',
      username: 'alessio89',
      about: 'About Alessio user.'
    })
  })

  it('send properly request data to the API', async () => {
    const interceptor = interceptPost('/login', HttpResponse.json({
      "id": "0c85dc2f-6c7d-430d-a827-0e8aa30437d3",
      "username": "dani90",
      "about": "About Dani user."
    }))

    const gateway = createLoginAPIGateway()

    await gateway.login('alessio89', 'thePassword')

    expect(interceptor.receivedJsonBody()).toStrictEqual({
      username: 'alessio89',
      password: 'thePassword'
    })
  })

  it('throws invalid credentials error on wrong credentials', async () => {
    interceptPost('/login',
      new HttpResponse('Invalid credentials.', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      })
    )

    const gateway = createLoginAPIGateway()

    await expect(async () => {
      await gateway.login('wrong', 'wrong')
    }).rejects.toThrow(new Error("INVALID_CREDENTIALS"))
  })

  function interceptPost(path: string, response: HttpResponse) {
    let receivedJsonBody: any;
    mockServer.use(http.post('http://msw.mockapi.local' + path, async (request) => {
      receivedJsonBody = await request.request.json()
      return response
    }))

    return {
      receivedJsonBody() {
        return receivedJsonBody
      }
    }
  }
})
