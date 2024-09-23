import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Provider from './Provider';
import NavbarComponent from '@/components/molecules/NavbarComponent';
import FooterComponent from '@/components/molecules/FooterComponent';
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Visa Web App',
  description: 'Visa Web App',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const responseStatus = cookieStore.get('status')
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} flex min-h-screen flex-col`}>
          <ToastContainer />
          <NavbarComponent accessToken={accessToken} responseStatus={responseStatus} />
          <div className="flex-grow">{children}</div>
          <FooterComponent />
          {/* <LayoutComponent children={children} /> */}
        </body>

      </Provider>
    </html>
  );
}
