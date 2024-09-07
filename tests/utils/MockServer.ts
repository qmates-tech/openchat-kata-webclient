import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export function createMockServer(baseUrl: string) {
  const mockServer = setupServer();
  mockServer.listen({ onUnhandledRequest: 'error' });

  return {
    interceptGet(path: string, response: HttpResponse) {
      mockServer.use(http.get(baseUrl + path, () => response));
    },
    interceptPost(path: string, response: HttpResponse) {
      let receivedJsonBody: any;
      mockServer.use(http.post(baseUrl + path, async (request) => {
        receivedJsonBody = await request.request.json();
        return response;
      }));

      return {
        receivedJsonBody() {
          return receivedJsonBody;
        }
      }
    },
    resetHandlers() {
      mockServer.resetHandlers();
    }
  }
}
