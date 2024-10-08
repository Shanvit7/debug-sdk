import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
};

export const checkIfValidPhoneNumber = (number: string)=>{
  if (!number) return true;
  return /^\+?[1-9]\d{1,14}$/.test(number);
};

export const getAccessToken = (): string | null => {
  return Cookies.get(ACCESS_TOKEN_COOKIE) || null;
};

export const getWebmailUrl = (email: string): string => {
  const domain = email.split('@')[1]?.toLowerCase()
  switch (domain) {
    case 'gmail.com':
      return 'https://mail.google.com'
    case 'outlook.com':
    case 'hotmail.com':
    case 'live.com':
      return 'https://outlook.live.com'
    case 'yahoo.com':
      return 'https://mail.yahoo.com'
    default:
      return `https://${domain}`
  }
}