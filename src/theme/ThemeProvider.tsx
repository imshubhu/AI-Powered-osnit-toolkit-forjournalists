"use client";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>{children}</NextThemesProvider>;
}
