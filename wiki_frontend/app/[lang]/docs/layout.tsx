import SideBarWrapper from "@/components/sidebars/SideBarWrapper";
import LoadingSideBar from "@/components/sidebars/LoadingSideBar"
import { Suspense } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16 min-h-screen">
      <Suspense fallback={<LoadingSideBar/>}>
        <SideBarWrapper isSmall={true} />
        <SideBarWrapper isSmall={false} />
      </Suspense>
      {children}
    </div>
  );
}
