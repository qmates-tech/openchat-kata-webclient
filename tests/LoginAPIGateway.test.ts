import { describe, expect, it } from 'vitest'
import { createLoginAPIGateway } from '../src/LoginAPIGateway'

describe('Login API Gateway', () => {

  it('throws invalid credentials error on wrong credentials', () => {
    const gateway = createLoginAPIGateway()

    expect(() => {
      gateway.login('wrong', 'wrong')
    }).toThrow(new Error("INVALID_CREDENTIALS"))
  })

  it('returns user on right credentials', () => {
    const gateway = createLoginAPIGateway()

    const loggedUser = gateway.login('alessio89', 'correctPa$$word')

    expect(loggedUser.id).toBe('599dd5eb-fdea-4472-8baf-81ef7c18a2f1')
    expect(loggedUser.username).toBe('alessio89')
    expect(loggedUser.about).toBe('About Alessio user.')
  })

})
