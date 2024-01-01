export default function Loading() {
  return (
    <div className="pt-4">
      <div
        className="z-30 top-[5rem] inset-0 px-8 xl:px-12 mx-auto xl:max-w-[min(60rem,calc(100vw-40rem))]
          overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900"
      >
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

      <div
        className={`hidden 2xl:block fixed h-[calc(100vh-120px)] w-[20rem] top-[5rem]
      overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md
      bg-white dark:bg-slate-900 shrink-0 right-[max(0px,calc(50%-50rem))]
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

// <div className="flex w-full min-h-screen">
//         <div className="relative animate-pulse flex flex-col bg-slate-100 rounded-lg px-4 md:px-8 py-6 dark:bg-slate-800 dark:highlight-white/5 w-full">
//           <div className="min-h-[50rem] w-full grow bg-slate-200 dark:bg-slate-700 rounded"></div>
//           <div className="grid grid-cols-3 gap-4 mt-4 ">
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
//           </div>
//           <div className="h-24 flex space-x-4 justify-center mt-4">
//             <div className="bg-slate-200 dark:bg-slate-700  w-24 h-24 rounded-full object-cover "></div>
//             <div className="bg-slate-200 dark:bg-slate-700 rounded grow "></div>
//             <div className="bg-slate-200 dark:bg-slate-700  w-24 h-24 rounded-md object-cover "></div>
//           </div>
//           <div className="grid grid-cols-3 gap-4 mt-4 ">
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
//           </div>
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
//             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded col-span-3"></div>
//           </div>
//         </div>
//         <div className="hidden xl:block flex-shrink-0 w-[20rem] mx-4 rounded-lg animate-pulse bg-slate-100 dark:bg-slate-800 dark:highlight-white/5">
//           <div className="px-4 pt-6">
//             <div className="p-2 flex">
//               <div className="rounded-md w-80 h-10 bg-slate-200 dark:bg-slate-700" />
//             </div>
//             <div className="p-2 flex">
//               <div className="rounded-md w-80 h-40 bg-slate-200 dark:bg-slate-700" />
//             </div>
//             <div className="p-2 flex">
//               <div className="rounded-md w-80 h-40 bg-slate-200 dark:bg-slate-700" />
//             </div>
//             <div className="p-2 flex">
//               <div className="rounded-md w-80 h-40 bg-slate-200 dark:bg-slate-700" />
//             </div>
//             <div className="p-2 flex">
//               <div className="rounded-md w-80 h-40 bg-slate-200 dark:bg-slate-700" />
//             </div>
//           </div>
//         </div>
//       </div>
