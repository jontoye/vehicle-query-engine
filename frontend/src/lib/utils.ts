import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const filterUndefined = (params: Record<string, string | undefined>) => {
  return Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));
};