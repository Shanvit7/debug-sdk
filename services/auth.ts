import createApiService from "@/services";

const authApi = createApiService({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
});

export const login = (credentials: object) => {
  try {
    return authApi.post<{ response: object }>("/admins/login", credentials);
  } catch (error) {
    throw error;
  }
};

export const signUp = (data: object) => {
  try {
    return authApi.post<{ response: object }>("/enterprise/signup", data);
  } catch (error) {
    throw error;
  }
};

export const verfiyAccount = (data: object) => {
  try {
    return authApi.post<{ response: object }>("/admins/verify-account", data);
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = (data: object) => {
  try {
    return authApi.post<{ response: object }>("/admins/forgot-password", data);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = (data: object) => {
  try {
    const { token = "", ...rest } = data ?? {};
    return authApi.post<{ response: object }>(
      `/admins/reset-password?token=${token}`,
      {...rest}
    );
  } catch (error) {
    throw error;
  }
};
