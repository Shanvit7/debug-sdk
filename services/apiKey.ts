import createApiService from "@/services";
import { getAccessToken } from "@/lib/utils";

const keysApi = (() => {
    return createApiService({
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
        headers:{
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
})();

export const generateApiKey = () => {
    try {
      return keysApi.post<{ response: object }>("/api-keys", {});
    } catch (error) {
      throw error;
    };
};
  

export const deActivateApiKey = (apiKey: string) => {
    try {
      return keysApi.put<{ response: object }>(`/api-keys/${apiKey}/deactivate`, {});
    } catch (error) {
      throw error;
    };
};

export const getActiveApiKey = () =>{
    try {
        return keysApi.get<{ response: object }>("/api-keys/active");
      } catch (error) {
        throw error;
      };
};