import ContentSideBar from "../sidebars/ContentSideBar";
import ListGroupWrapper from "../wrappers/ListGroupWrapper";

export default function MarkdownLoading() {
  return ( 
    <>
  <ListGroupWrapper>
      <div className="flex w-full min-h-screen">
        <div className="relative animate-pulse flex flex-col bg-slate-100 rounded-lg px-4 md:px-8 py-6 dark:bg-slate-800 dark:highlight-white/5 w-full">
          <div className="min-h-[50rem] w-full grow bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="grid grid-cols-3 gap-4 mt-4 ">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
          </div>
          <div className="h-24 flex space-x-4 justify-center mt-4">
            <div className="bg-slate-200 dark:bg-slate-700  w-24 h-24 rounded-full object-cover "></div>
            <div className="bg-slate-200 dark:bg-slate-700 rounded grow "></div>
            <div className="bg-slate-200 dark:bg-slate-700  w-24 h-24 rounded-md object-cover "></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 ">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
          </div>
        </div>
      </div>
  </ListGroupWrapper>
  <ContentSideBar>
    <div className="hidden xl:block flex-shrink-0 w-[20rem] mx-4 rounded-lg animate-pulse bg-slate-100 dark:bg-slate-800 dark:highlight-white/5">
      <div className="px-4 pt-6">
        <div className="p-2 flex">
          <div className="rounded-md w-80 h-10 bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="p-2 flex">
          <div className="rounded-md w-80 h-40 bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="p-2 flex">
          <div className="rounded-md w-80 h-40 bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="p-2 flex">
          <div className="rounded-md w-80 h-40 bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="p-2 flex">
          <div className="rounded-md w-80 h-40 bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  </ContentSideBar>
  </>)
  
}
