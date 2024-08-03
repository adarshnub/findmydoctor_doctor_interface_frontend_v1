import { Example } from "@/components/framerMotion/navbar/Example";
import Header from "@/components/layout/Header";
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

        <Example  />
        <main className="w-full px-[5vw]">
        <Header />
          {children}</main>
      </body>
    </html>
  );
}
