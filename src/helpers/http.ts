
export type NetworkError = "NETWORK_ERROR";

export async function postRequest(url: string, jsonBody: any) {
  try {
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(jsonBody)
    });
  } catch (e) {
    throw "NETWORK_ERROR";
  }
}
