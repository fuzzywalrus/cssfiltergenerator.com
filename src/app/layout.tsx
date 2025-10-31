import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cssfilter.com'),
  title: 'CSS Filter Generator - CSSFilter.com',
  description: 'Create CSS filters and mix-blend-mode overlays with a visual interface. Drag and drop filters to reorder them.',
  keywords: 'CSS, filters, generator, visual, design, web development',
  authors: [{ name: 'Greg Gant' }],
  openGraph: {
    title: 'CSS Filter Generator - CSSFilter.com',
    description: 'Create CSS filters and mix-blend-mode overlays with a visual interface.',
    url: 'https://cssfilter.com',
    siteName: 'CSSFilter.com',
    images: [
      {
        url: '/simple.png',
        width: 1200,
        height: 630,
        alt: 'CSS Filter Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Filter Generator - CSSFilter.com',
    description: 'Create CSS filters and mix-blend-mode overlays with a visual interface.',
    images: ['/simple.png'],
    creator: '@tannerbaldus',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}