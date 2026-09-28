import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nadukuru Madhav Mukesh | Data Analyst | Business Analyst | BI & Product Analytics',
  description: 'Portfolio of Nadukuru Madhav Mukesh - Data Analyst, Business Analyst, BI & Product Analytics. Specializing in SQL, Power BI, DAX, Python, Excel, Tableau, and reporting automation.',
  keywords: [
    'Nadukuru Madhav Mukesh',
    'Data Analyst Portfolio',
    'Business Analyst',
    'BI Analyst',
    'Product Analyst',
    'Power BI',
    'DAX',
    'SQL Analyst',
    'Tableau',
    'Excel',
    'Python',
    'NIT Andhra Pradesh',
    'Darwix AI Analyst'
  ],
  authors: [{ name: 'Nadukuru Madhav Mukesh' }],
  creator: 'Nadukuru Madhav Mukesh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/Madhav0326',
    title: 'Nadukuru Madhav Mukesh | Data Analyst | Business Analyst | BI & Product Analytics',
    description: 'I turn complex data into clear insights and smarter business decisions. SQL, Power BI, DAX, Python, Excel, Tableau, and automated reporting.',
    siteName: 'Nadukuru Madhav Mukesh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nadukuru Madhav Mukesh | Data Analyst | Business Analyst | BI & Product Analytics',
    description: 'Data Analyst and Business Intelligence professional specializing in SQL, Power BI, Python, Excel, Tableau, and automated reporting.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#F8F9F6] text-[#18201C] selection:bg-[#1B4332] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
