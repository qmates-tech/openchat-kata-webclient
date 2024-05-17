import { afterEach, describe, expect, it } from 'vitest'
import { createLoginAPIGateway } from '../src/LoginAPIGateway'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

describe('Login API Gateway', () => {
  const mockServer = setupServer()
  mockServer.listen({ onUnhandledRequest: 'error' })

  afterEach(() => {
    mockServer.resetHandlers()
  })

  it('throws invalid credentials error on wrong credentials', async () => {
    mockServer.use(http.post('http://msw.mockapi.local/login', () =>
      new HttpResponse('Invalid credentials.', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      })
    ))

    const gateway = createLoginAPIGateway()

    await expect(async () => {
      await gateway.login('wrong', 'wrong')
    }).rejects.toThrow(new Error("INVALID_CREDENTIALS"))
  })

  it('returns user on right credentials', async () => {
    mockServer.use(http.post('http://msw.mockapi.local/login', () =>
      HttpResponse.json({
        "id": "599dd5eb-fdea-4472-8baf-81ef7c18a2f1",
        "username": "alessio89",
        "about": "About Alessio user."
      })
    ))

    const gateway = createLoginAPIGateway()

    const loggedUser = await gateway.login('alessio89', 'correctPa$$word')

    expect(loggedUser.id).toBe('599dd5eb-fdea-4472-8baf-81ef7c18a2f1')
    expect(loggedUser.username).toBe('alessio89')
    expect(loggedUser.about).toBe('About Alessio user.')
  })

  it('send properly request data to the API', async () => {
    let sentJsonBody: any;
    mockServer.use(http.post('http://msw.mockapi.local/login', async (request) => {
      sentJsonBody = await request.request.json()
      return HttpResponse.json()
    }))

    const gateway = createLoginAPIGateway()

    await gateway.login('alessio89', 'thePassword')

    expect(sentJsonBody).toStrictEqual({
      username: 'alessio89',
      password: 'thePassword'
    })
  })
})
