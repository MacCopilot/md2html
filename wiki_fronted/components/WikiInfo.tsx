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
    <div className="flex-auto sticky z-30 inset-0 top-[5rem] px-8 xl:px-12 ml-auto max-w-[65rem]  overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900">
      <div className="h-10 bg-white dark:bg-slate-900"></div>
      <HtmlParser htmlString={props.markdowntext} prefixPath={props.prefixPath}/>
    </div>
  );
}
