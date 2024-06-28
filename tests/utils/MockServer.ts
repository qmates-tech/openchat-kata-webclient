import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

export function createMockServer(baseUrl: string) {
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