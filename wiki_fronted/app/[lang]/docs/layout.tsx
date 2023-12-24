import RepoSideBarWrapper from "@/components/sidebars/RepoSideBarWrapper";
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex mx-auto max-w-[100rem] min-h-screen">
      <RepoSideBarWrapper  />
      {children}
    </div>
  );
}