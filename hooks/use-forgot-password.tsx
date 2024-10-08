"use client";
import { create } from "zustand";

type ForgotPasswordState = {
  email: string;
  setEmail: (email: string) => void;
  isLinkSent: boolean;
  setLinkSent: (isLinkSent: boolean) => void;
};

const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
  isLinkSent: false,
  setLinkSent: (isLinkSent: boolean) => set({ isLinkSent }),
  email: "",
  setEmail: (email: string) => set({ email }),
}));

export default useForgotPasswordStore;
