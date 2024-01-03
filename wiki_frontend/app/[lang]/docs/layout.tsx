import SideBarWrapper from "@/components/sidebars/SideBarWrapper";
import LoadingSideBar from "@/components/sidebars/LoadingSideBar";
import { Suspense } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16 min-h-screen">
      <Suspense fallback={<LoadingSideBar />}>
        <div className="xl:hidden">
          <SideBarWrapper isSmall={true} />
        </div>
        <div className="hidden xl:block">
          <SideBarWrapper isSmall={false} />
        </div>
      </Suspense>
      {children}
    </div>
  );
}
