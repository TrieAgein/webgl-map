import './globals.css'
import { Inter } from 'next/font/google'
import { Theme, Box } from '@radix-ui/themes';
import { TopNav } from './topnav';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" style={{height:'100%'}}>
          <Box width={'100%'}  height={'100%'} className="Box">
            <TopNav />
            {children}
          </Box>
        </Theme>
      </body>
    </html>
  )
}
