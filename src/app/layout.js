// import { Geist, Geist_Mono } from "next/font/google";
import { auth } from '@/auth';
import Navbar from '@/components/navbar/navbar';
import { ThemeProvider } from '@/components/navbar/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
    title: 'Code Runner',
    description: 'Online Code Editor for multiple languages',
    icons: {
        icon: '/icon.ico',
    },
};

export default async function RootLayout({ children }) {
    const session = await auth();
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* <ModeToggle /> */}
                    <NextTopLoader height={2} showSpinner={false} />
                    <Navbar isAuthenticated={session?.user} />
                    {children}
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
