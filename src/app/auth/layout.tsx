import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Suspense fallback="Loading...">{children}</Suspense>
    </main>
  );
}
