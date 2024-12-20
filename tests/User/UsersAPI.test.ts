import { HttpResponse } from 'msw';
import { createUsersAPI } from '../../src/User/UsersAPI';
import { createMockServer } from '../utils/MockServer';

describe('UsersAPI', () => {
  const BASE_URL = 'http://msw.mockapi.local';

  const usersAPI = createUsersAPI(BASE_URL);
  const mockServer = createMockServer(BASE_URL);

  describe("getUser", () => {
    it('should return the user data when the given ID exists', async () => {
      mockServer.interceptGet('/users', HttpResponse.json([
         { "id": "1", "username": "first", "about": "About 1." },
         { "id": "2", "username": "second", "about": "About 2." },
         { "id": "3", "username": "third", "about": "About 3." },
      ]));

      const retrievedUser = await usersAPI.getUser('2');

      expect(retrievedUser).toStrictEqual({ id: '2', username: 'second', about: 'About 2.' });
    });

    it('should return USER_NOT_FOUND error when the given ID does not exist', async () => {
      mockServer.interceptGet('/users', HttpResponse.json([]));

      await expect(async () => {
        await usersAPI.getUser('non-existing-id');
      }).rejects.toThrow("USER_NOT_FOUND");
    });

    it('should return NETWORK_ERROR when the HTTP request fails', async () => {
      mockServer.interceptGet('/users', HttpResponse.error());

      await expect(async () => {
        await usersAPI.getUser('any-id');
      }).rejects.toThrow("NETWORK_ERROR");
    });
  });

  describe("allUsersByName", () => {
    it('should return the users data matching the name provided', async () => {
      mockServer.interceptGet('/users', HttpResponse.json([
         { "id": "1", "username": "first-name", "about": "About 1." },
         { "id": "2", "username": "name-second", "about": "About 2." },
         { "id": "3", "username": "third", "about": "About 3." },
      ]));

      const retrievedUsers = await usersAPI.allUsersByName('name');

      expect(retrievedUsers).toStrictEqual([
        { id: '1', username: 'first-name', about: 'About 1.' },
        { id: '2', username: 'name-second', about: 'About 2.' }
      ]);
    });

    it('should match the names ignoring the case', async () => {
      mockServer.interceptGet('/users', HttpResponse.json([
         { "id": "1", "username": "first-namE", "about": "About 1." },
         { "id": "2", "username": "nAme-second", "about": "About 2." },
         { "id": "3", "username": "third", "about": "About 3." },
      ]));

      const retrievedUsers = await usersAPI.allUsersByName('Name');

      expect(retrievedUsers).toStrictEqual([
        { id: '1', username: 'first-namE', about: 'About 1.' },
        { id: '2', username: 'nAme-second', about: 'About 2.' }
      ]);
    });

    it('should return empty list when the given name does not match any user', async () => {
      mockServer.interceptGet('/users', HttpResponse.json([
        { "id": "3", "username": "an-user", "about": "About 3." }
      ]));

      const retrievedUsers = await usersAPI.allUsersByName('not-matching');

      await expect(retrievedUsers).toHaveLength(0);
    });

    it('should return NETWORK_ERROR when the HTTP request fails', async () => {
      mockServer.interceptGet('/users', HttpResponse.error());

      await expect(async () => {
        await usersAPI.allUsersByName('any-name');
      }).rejects.toThrow("NETWORK_ERROR");
    });
  });
});
