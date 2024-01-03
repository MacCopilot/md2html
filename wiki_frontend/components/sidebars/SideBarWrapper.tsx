import { unstable_noStore as noStore } from "next/cache";

import RepoSideBar from "@/components/sidebars/RepoSideBar";
import LargeSideBar from "@/components/sidebars/LargeSideBar";
import { MenuStruct } from "@/types/interface";
export async function getPublicRepoLayout() {
  noStore(); // Opt into dynamic rendering
  const backend_url = process.env.BACKEND_URL;
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `${backend_url}/layout.layout`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
interface RepoSideBarWrapperProps {
  isSmall: Boolean;
}
export default async function RepoSideBarWrapper(
  props: RepoSideBarWrapperProps
) {
  const data = await getPublicRepoLayout();
  if (data && data.sublayouts) {
    const l = data.sublayouts as MenuStruct[];
    if (props.isSmall) {
      return <RepoSideBar sublayouts={l} />;
    } else {
      return <LargeSideBar sublayouts={l} />;
    }
  }
  return <>hhh</>;
}
