import './globals.scss';

export const metadata = {
  title: 'Noman Majeed | Portfolio',
  description: 'Web Developer & Freelancer Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app">{children}</body>
    </html>
  );
}
