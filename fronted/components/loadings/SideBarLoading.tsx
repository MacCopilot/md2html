import { Transition } from "@headlessui/react";
export default function SideBarLoading({sideBarOpen}:{sideBarOpen:boolean}){
return( <Transition show={sideBarOpen}>
    {/* Background overlay */}
    <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-100"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-100"
    >
        <div className="fixed lg:hidden z-40 inset-0 w-full    bg-black/20 backdrop-blur-sm dark:bg-slate-900/25"></div>
    </Transition.Child>

    {/* Sliding sidebar */}
    <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className={`fixed z-40 inset-0 left-[max(0px,calc(50%-52rem))] w-[20rem]  
        top-[2rem] lg:top-[3.8125rem]  
        px-4 pb-10 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md  bg-white dark:bg-slate-900 pr-2`}
    >
        <div className="sticky top-0 -ml-0.5 pointer-events-none">
        <div className="h-10 bg-white dark:bg-slate-900"></div>
        <div className="bg-white dark:bg-slate-900 relative pointer-events-auto">
            <header className="relative z-20 mx-2  animate-pulse">
                <p className="mb-2 bg-slate-200 dark:bg-slate-700 w-full h-12"></p>
                <p className="bg-slate-200 dark:bg-slate-700 w-full h-9"></p>
                <div>
                    <p className="mt-2  bg-slate-200 dark:bg-slate-700 w-full h-4"></p>
                    <p className="mt-2  bg-slate-200 dark:bg-slate-700 w-full h-4"></p>
                </div>
                <div className="my-2 min-h-[60rem] w-full grow bg-slate-200 dark:bg-slate-700 rounded"></div>
            </header>
        </div>
        <div className="h-4 bg-gradient-to-b  from-white dark:from-slate-900"></div>
        </div>

        <div className="-ml-2 md:-ml-4">

        </div>
    </Transition.Child>
    </Transition>)
}