import { HttpResponse } from 'msw';
import { createLoginAPI } from '../../src/Login/LoginAPI';
import { createMockServer } from '../utils/MockServer';

describe('LoginAPI', () => {
  const BASE_URL = 'http://msw.mockapi.local';

  const loginAPI = createLoginAPI(BASE_URL);
  const mockServer = createMockServer(BASE_URL);

  afterEach(() => {
    mockServer.resetHandlers();
  });

  it('returns user on right credentials', async () => {
    mockServer.interceptPost('/login', HttpResponse.json({
      "id": "599dd5eb-fdea-4472-8baf-81ef7c18a2f1",
      "username": "alessio89",
      "about": "About Alessio user."
    }));

    const loggedUser = await loginAPI.login('any', 'any');

    expect(loggedUser).toStrictEqual({
      id: '599dd5eb-fdea-4472-8baf-81ef7c18a2f1',
      username: 'alessio89',
      about: 'About Alessio user.'
    });
  });

  it('send properly request data to the API', async () => {
    const interceptor = mockServer.interceptPost('/login', loginOkResponse());

    await loginAPI.login('alessio89', 'thePassword');

    expect(interceptor.receivedJsonBody()).toStrictEqual({
      username: 'alessio89',
      password: 'thePassword'
    });
  });

  it('throws invalid credentials error on wrong credentials', async () => {
    mockServer.interceptPost('/login', invalidCredentialsResponse());

    await expect(async () => {
      await loginAPI.login('wrong', 'wrong');
    }).rejects.toThrow("INVALID_CREDENTIALS");
  });

  it('throws network error on server not reachable', async () => {
    mockServer.interceptPost('/login', HttpResponse.error());

    await expect(async () => {
      await loginAPI.login('any', 'any');
    }).rejects.toThrow("NETWORK_ERROR");
  });

  function loginOkResponse() {
    return HttpResponse.json({
      "id": "0c85dc2f-6c7d-430d-a827-0e8aa30437d3",
      "username": "dani90",
      "about": "About Dani user."
    });
  }

  function invalidCredentialsResponse() {
    return new HttpResponse('Invalid credentials.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
});
