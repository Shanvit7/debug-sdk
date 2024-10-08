import createApiService from "@/services";
import { getAccessToken } from "@/lib/utils";

const userApi = (() => {
    return createApiService({
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
        headers:{
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
})();

export const getUserProfile = () => {
    try {
      return userApi.get<{ response: object }>("/admins/profile");
    } catch (error) {
      throw error;
    };
};
  

