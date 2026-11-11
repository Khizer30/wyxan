import I18nProvider from "@shared/providers/I18nProvider";
import QueryProvider from "@shared/providers/QueryClientProvider";
import ThemeProvider from "@shared/providers/ThemeProvider";
import type { Children } from "@shared/types/children.types";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "shared/lib/utils";

export const metadata: Metadata = {
  title: "The Small Web",
  description: "A browser for a small web of one-page sites."
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("h-full", "antialiased", "font-sans")}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
          <I18nProvider>
            <QueryProvider>{children}</QueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
