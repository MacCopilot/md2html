export default function LoadingSideBar() {
  return (
    <div
      className={`fixed left-[max(0px,calc(50%-50rem))] z-40 inset-0 w-[20rem] top-0 pt-8 lg:pt-16 px-4 
        overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900 pr-2`}
    >
      <div
        className={`hidden 2xl:block fixed h-[calc(100vh-120px)] w-[20rem] top-[5rem]
      overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md
      bg-white dark:bg-slate-900 shrink-0 left-[max(0px,calc(50%-50rem))]
      `}
      >
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
      </div>
    </div>
  );
}
