"use client";

import { create } from "zustand";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";

type AuthState = {
  accessToken: string | null;
  email: string;
  setAccessToken: (token: string) => void;
  setEmail: (email: string) => void;
  getAccessToken: () => string | null;
  removeAccessToken: () => void;
};

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken:
    typeof window !== "undefined" ? Cookies.get(ACCESS_TOKEN_COOKIE) || null : null,
  email: "",
  setEmail: (email: string) => set({ email }),
  setAccessToken: (token: string) => {
    Cookies.set(ACCESS_TOKEN_COOKIE, token, {
      expires: 30,
      secure: true,
      sameSite: "strict",
    });
    set({ accessToken: token });
  },

  getAccessToken: () => {
    if (typeof window !== "undefined") {
      return Cookies.get(ACCESS_TOKEN_COOKIE) || null;
    }
    return get().accessToken;
  },

  removeAccessToken: () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    set({ accessToken: null });
  },
}));

export default useAuthStore;