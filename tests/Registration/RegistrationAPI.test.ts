import { HttpResponse } from 'msw';
import { createRegistrationAPI } from '../../src/Registration/RegistrationAPI';
import { createMockServer } from '../utils/MockServer';

describe('Registration API', () => {
  const BASE_URL = 'http://msw.mockapi.local';

  const registrationAPI = createRegistrationAPI(BASE_URL);
  const mockServer = createMockServer(BASE_URL);

  afterEach(() => {
    mockServer.resetHandlers();
  });

  it('register a new user', async () => {
    mockServer.interceptPost('/users', HttpResponse.json({
      "id": "599dd5eb-fdea-4472-8baf-81ef7c18a2f1",
      "username": "alessio89",
      "about": "About Alessio user."
    }));

    const registeredUser = await registrationAPI.register('alessio89', 'aPassword', 'About Alessio user.');

    expect(registeredUser).toStrictEqual({
      id: '599dd5eb-fdea-4472-8baf-81ef7c18a2f1',
      username: 'alessio89',
      about: 'About Alessio user.'
    });
  });

  it('send properly request data to the API', async () => {
    const interceptor = mockServer.interceptPost('/users', registrationOkResponse());

    await registrationAPI.register('alessio89', 'aPassword', 'About Alessio user.');

    expect(interceptor.receivedJsonBody()).toStrictEqual({
      username: 'alessio89',
      password: 'aPassword',
      about: 'About Alessio user.'
    });
  });

  it('throws username already in use', async () => {
    mockServer.interceptPost('/users', usernameAlreadyInUseResponse());

    await expect(async () => {
      await registrationAPI.register('already', 'present', 'user');
    }).rejects.toThrow("USERNAME_ALREADY_IN_USE");
  });

  it('throws network error on server not reachable', async () => {
    mockServer.interceptPost('/users', HttpResponse.error());

    await expect(async () => {
      await registrationAPI.register('any', 'any', 'any');
    }).rejects.toThrow("NETWORK_ERROR");
  });

  function registrationOkResponse() {
    return HttpResponse.json({
      "id": "0c85dc2f-6c7d-430d-a827-0e8aa30437d3",
      "username": "dani90",
      "about": "About Dani user."
    });
  }

  function usernameAlreadyInUseResponse() {
    return new HttpResponse('Invalid credentials.', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
});
