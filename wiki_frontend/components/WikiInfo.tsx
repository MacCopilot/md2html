import HtmlParser from "@/components/parsers/HtmlParser";
interface WikiInfoProps {
  sectionIds: string[];
  markdownlist: string;
  markdowntext: string;
  parsedRepoId: number;
  prefixPath: string;
  NavBarOpen: boolean;
  markdown_id: number;
  isPublic: boolean;
}
export default function WikiInfo(props: WikiInfoProps) {
  return (
    <div className="z-30 top-[5rem] inset-0 px-8 xl:px-12 mx-auto xl:max-w-[min(60rem,calc(100vw-40rem))]
    overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900">
      <div className="h-10 bg-white dark:bg-slate-900"></div>
      <HtmlParser htmlString={props.markdowntext} prefixPath={props.prefixPath}/>
    </div>
  );
}
