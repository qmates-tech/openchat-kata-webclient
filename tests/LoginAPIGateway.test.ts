import { describe, expect, it } from 'vitest'
import { createLoginAPIGateway } from '../src/LoginAPIGateway'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

describe('Login API Gateway', () => {

  it('throws invalid credentials error on wrong credentials', async () => {
    const gateway = createLoginAPIGateway()

    await expect(async () => {
      await gateway.login('wrong', 'wrong')
    }).rejects.toThrow(new Error("INVALID_CREDENTIALS"))
  })

  it('returns user on right credentials', async () => {
    const gateway = createLoginAPIGateway()

    const loggedUser = await gateway.login('alessio89', 'correctPa$$word')

    expect(loggedUser.id).toBe('599dd5eb-fdea-4472-8baf-81ef7c18a2f1')
    expect(loggedUser.username).toBe('alessio89')
    expect(loggedUser.about).toBe('About Alessio user.')
  })

  it('send properly request data to the API', async () => {
    let sentJsonBody: any;
    const handler = http.post('http://msw.mockapi.local/login', async (request) => {
      sentJsonBody = await request.request.json()
      return HttpResponse.json()
    })
    const server = setupServer(handler)
    server.listen({ onUnhandledRequest: 'error' })
    const gateway = createLoginAPIGateway()

    await gateway.login('alessio89', 'thePassword')

    expect(sentJsonBody).toStrictEqual({
      username: 'alessio89',
      password: 'thePassword'
    })
  })
})
