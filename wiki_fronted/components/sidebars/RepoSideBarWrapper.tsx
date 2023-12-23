import { unstable_noStore as noStore } from 'next/cache';

import RepoSideBar from "@/components/sidebars/RepoSideBar";
import { MenuStruct } from "@/types/interface";
export async function getPublicRepoLayout() {
  noStore(); // Opt into dynamic rendering
  const backend_url = process.env.BACKEND_URL
  console.log("backend_url:",backend_url,process.env.NEXT_PUBLIC_BACKEND_URL)
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `${backend_url}/layout.layout`
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

export default async function RepoSideBarWrapper() {
  const data = await getPublicRepoLayout();
  if(data && data.sublayouts){
    const l = data.sublayouts as MenuStruct[]
    return <RepoSideBar sublayouts={l} />;
  }
  return <>hhh</>
  
}
