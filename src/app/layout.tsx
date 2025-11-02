
import "./globals.css";
import Header from '../presentation/components/header/page';
import Footer from '../presentation/components/footer/page';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
