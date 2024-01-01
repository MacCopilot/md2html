import RepoSideBarWrapper from "@/components/sidebars/RepoSideBarWrapper";
import LoadingSideBar from "@/components/sidebars/LoadingSideBar"
import { Suspense } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16 min-h-screen">
      <Suspense fallback={<LoadingSideBar/>}>
        <RepoSideBarWrapper />
      </Suspense>
      {children}
    </div>
  );
}
