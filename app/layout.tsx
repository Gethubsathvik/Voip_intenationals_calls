// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoIPCall - Free Online Calls Worldwide',
  description: 'Make free browser-based calls to mobile numbers and landlines worldwide using WebRTC',
  keywords: 'VOIP, calling, free calls, browser calls, WebRTC',
  openGraph: {
    title: 'VoIPCall - Free Online Calls Worldwide',
    description: 'Make free browser-based calls to mobile numbers and landlines worldwide',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark-900 text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
