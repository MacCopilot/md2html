interface ContentSideBarProps {
  children: React.ReactNode;
}

export default function ContentSideBar(props: ContentSideBarProps) {
  return (
    <div
      className={`hidden 2xl:block fixed z-40 right-[max(0px,calc(50%-52rem))] w-[20rem] h-full  
        top-[2rem] lg:top-[7rem]  
        scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  overflow-y-auto 
        `}
    >
      {props.children}
    </div>
  );
}
