import RepoSideBarWrapper from "@/components/sidebars/RepoSideBarWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="pt-20 min-h-screen">
        <RepoSideBarWrapper />
        {children}
      </div>
  );
}
