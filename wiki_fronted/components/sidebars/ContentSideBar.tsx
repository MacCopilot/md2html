interface ContentSideBarProps {
  children: React.ReactNode;
}

export default function ContentSideBar(props: ContentSideBarProps) {
  return (
    <div
      className={`hidden 2xl:block sticky h-[calc(100vh-120px)] w-[15rem] top-[5rem]
      overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md
      bg-white dark:bg-slate-900 shrink-0
      `}
    >
      <div className="h-10 bg-white dark:bg-slate-900"></div>
      {props.children}
    </div>
  );
}
