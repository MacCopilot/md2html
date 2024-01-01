export default function Alice() {
  return (
    <div className="flex mx-auto max-w-[100rem] min-h-screen">
      <div
        className={`border-2 border-teal-400 sticky h-[calc(100vh-120px)] z-40 inset-0 left-[max(0px,calc(50%-52rem))] w-[20rem] top-[5rem] px-4  overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900 pr-2`}
      >
        sidebars
        <nav>
          <div className="h-64">nav1</div>
          <div className="h-64">nav2</div>
          <div className="h-64">nav3</div>
          <div className="h-64">nav4</div>
          <div className="h-64">nav5</div>
          <div className="h-64">nav6</div>
        </nav>
      </div>
      <main
        className="flex-auto border-2 border-indigo-200 pt-10 xl:pr-16"
      >
        <div className="border-2 border-red-300">
        main page
        <div className="h-64">m1</div>
        <div className="h-64">m2</div>
        <div className="h-64">m3</div>
        <div className="h-64">m4</div>
        <div className="h-64">m5</div>
        <div className="h-64">m6</div>
        </div>

      </main>
      <div
        className={`
        hidden xl:block border-2 border-teal-400 sticky h-[calc(100vh-120px)] z-40 inset-0 left-[max(0px,calc(50%-52rem))] w-[15.5rem]  top-[5rem] px-4  overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900 pr-2`}
      >
        table
        <nav>
          <div className="h-64">t1</div>
          <div className="h-64">t2</div>
          <div className="h-64">t3</div>
          <div className="h-64">t4</div>
          <div className="h-64">t5</div>
          <div className="h-64">t6</div>
        </nav>
      </div>
    </div>
  );
}
