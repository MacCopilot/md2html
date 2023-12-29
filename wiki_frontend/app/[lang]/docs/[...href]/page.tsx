import SideBarTable from "@/components/SideBarTable";
import WikiInfo from "@/components/WikiInfo";
import { unstable_noStore as noStore } from "next/cache";
async function getMarkdownByHrefServer({ href }: { href: string }) {
  try {
    noStore(); // Opt into dynamic rendering
    const backend_url = process.env.BACKEND_URL;
    const decodedHref = decodeURIComponent(href);
    const hrefArray = decodedHref.split(",");
    const constructedHref = hrefArray.join("/");
    const uniqueIdentifier = Date.now(); // 或者使用其他唯一标识符
    const url = `${backend_url}/${constructedHref}.wiki?uid=${uniqueIdentifier}`;
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data.page Status: ${response.status},url:${url}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    // 可以选择抛出错误或返回一个包含错误信息的对象
    throw error;
  }
}

export default async function MarkdownPage({
  params,
}: {
  params: { href: string; repoid: number };
}) {
  const verify_result = await getMarkdownByHrefServer({ href: params.href });
  if (verify_result && verify_result.code == undefined) {
    const markdownText = verify_result.content;
    let markdownList = "";
    const decodedHref = decodeURIComponent(params.href);
    const hrefArray = decodedHref.split(",");
    let href = hrefArray.slice(0, -1).join("/");

    let sectionIds: string[] = [];
    if (verify_result.table) {
      markdownList = verify_result.table;
      const reg = /href="#(.*?)"/g;
      const res = markdownList.match(reg);
      if (res) {
        sectionIds = res.map((value: string) =>
          value.slice(7, value.length - 1)
        );
      }
    }
    return (
      <>
        <WikiInfo
          markdowntext={markdownText}
          markdownlist={markdownList}
          parsedRepoId={params.repoid}
          prefixPath={href}
          NavBarOpen={true}
          sectionIds={sectionIds}
          markdown_id={1}
          isPublic={true}
        />
        <SideBarTable markdownlist={markdownList} sectionIds={sectionIds} />
      </>
    );
  }
  return <div>get markdown error error:</div>;
}
