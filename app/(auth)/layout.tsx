import Logo from "@/components/shared/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full w-full flex-col space-y-5 flex items-center justify-center pt-8">
      <Logo />
      {children}
    </main>
  );
}
