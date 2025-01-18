import { DefaultResponse } from "@/app/Interfaces/Response/Response";
async function fecthToUse(url: string, headers: RequestInit): Promise<any> {
    try {
      // we use  await for wait the answer of the fetch
      const response = await fetch(url, headers);
      const responseFetch: DefaultResponse = await response.json();
      // if the answer is not success ,we throw a error
      if (!response.ok) {
        if (!responseFetch.state) {
          throw new Error(responseFetch.errors.error);
        }
        throw new Error("" + response.status);
      }
      return responseFetch;
    } catch (error: any) {
      // if there is a error we throw
      throw new Error(error.message);
    }
  }
  export { fecthToUse}