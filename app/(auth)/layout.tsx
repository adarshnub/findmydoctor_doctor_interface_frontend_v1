import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
