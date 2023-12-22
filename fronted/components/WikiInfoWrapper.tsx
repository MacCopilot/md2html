
import { backend_url,home_url } from "@/utils/env_variable";
import WikiInfo from "@/components/WikiInfo";
async function getMarkdownByHrefServer({href}:{href: string}) {
  const decodedHref = decodeURIComponent(href);
  const hrefArray = decodedHref.split(',');
  const constructedHref = hrefArray.join('/');
  const uniqueIdentifier = Date.now(); // 或者使用其他唯一标识符
  const url = `${backend_url}/${constructedHref}.wiki?uid=${uniqueIdentifier}`;
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Origin: `${home_url}`,
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
interface WikiInfoWrapperProps {
    href: string; repoid: number
  }
export default async function WikiInfoWrapper(props:WikiInfoWrapperProps) {
    const verify_result = await getMarkdownByHrefServer({href:props.href});
    if (verify_result && verify_result.code == undefined) {
      
      const markdownText = verify_result.content;
      let markdownList = "";
      // let href_seg = params.href.split("/");
      // let href = href_seg.slice(0, -1).join("/");
  
      const decodedHref = decodeURIComponent(props.href);
      const hrefArray = decodedHref.split(',');
      let href = hrefArray.slice(0, -1).join('/');
  
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
        <WikiInfo
          markdowntext={markdownText}
          markdownlist={markdownList}
          parsedRepoId={props.repoid}
          prefixPath={href}
          NavBarOpen={true}
          sectionIds={sectionIds}
          markdown_id={1}
          isPublic={true}
        />
      );
    }
    return <div>get markdown error error:</div>;
}