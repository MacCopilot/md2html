import Image from "next/image";
import Link from "next/link";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { AiOutlineFileText, AiOutlineMobile } from "react-icons/ai";
export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <div className="fixed stars"></div>
      <div className="overflow-hidden pt-20">
        <div className="mx-3 md:mx-4 sm:px-6 md:px-8">
          <header className="overflow-hidden pt-8 pb-24 text-slate-600 dark:text-slate-400 lg:py-16">
            <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
              <div className="w-[108rem] flex-none flex justify-end">
                <Image
                  src="/bg.avif"
                  alt=""
                  className="w-[90rem] flex-none max-w-none  block"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="flex items-center justify-center text-sm font-medium uppercase tracking-[0.16em]">
              <p className="hidden lg:block">
                {dictionary["home-page"].seamlessSwitch}
                <span className="dark:text-white text-black font-bold">
                  {dictionary["home-page"].modeSwitch}
                </span>
              </p>
              <div className="mx-6 hidden h-[0.1875rem] w-[0.1875rem] rounded-full bg-white/30 lg:block xl:mx-16"></div>

              <p>
                {dictionary["home-page"].mobileFirst}
                <span className="dark:text-white text-black font-bold ">
                  {dictionary["home-page"].responsiveDesign}
                </span>
              </p>
              <div className="mx-6 hidden h-[0.1875rem] w-[0.1875rem] rounded-full bg-white/30 lg:block xl:mx-16"></div>

              <p className="hidden lg:block">
                <span className="dark:text-white text-black font-bold ">
                  {dictionary["home-page"].full}
                </span>
                {dictionary["home-page"].textSearch}
              </p>
              <div className="mx-6 hidden h-[0.1875rem] w-[0.1875rem] rounded-full bg-white/30 lg:block xl:mx-16"></div>
            </div>

            <div className="px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-7xl lg:px-8 mx-auto mt-24 lg:mt-56">
              <div className="lg:flex">
                <div className="flex-auto">
                  <h1 className="bg-black dark:bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF7_51.02%,#4D78EF_79.09%)] bg-clip-text text-5xl leading-[1.2] tracking-tighter text-transparent sm:text-center sm:text-[4rem] sm:leading-[4.75rem] lg:text-left">
                    {
                      dictionary["home-page"].hostRepo
                    }
                  </h1>
                  <p className="mt-6 text-slate-700 dark:text-slate-400 max-w-3xl text-2xl leading-[2.5rem] tracking-tight sm:text-center lg:text-left">
                    {
                      dictionary["home-page"].knowledgeRepo
                    }
                  </p>
                  <div className="mt-12 hidden lg:flex">
                    
                    <Link
                      href="/docs"
                      className="ml-6 rounded-full   py-2 px-6 font-semibold  focus:outline-none focus:ring-2  bg-slate-900 text-slate-50 hover:bg-slate-700 scale-100 hover:scale-110   dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500"
                    >
                      {dictionary["home-page"]["cases"]}
                    </Link>

                  </div>
                </div>
                <div className="relative mt-24 flex-none lg:mt-0 lg:w-80">
                  <div className="top-1/2 left-8 mx-auto w-[19.25rem] rotate-12 lg:absolute lg:w-[23.75rem] lg:-translate-y-1/2">
                    <div className="pointer-events-none">
                      <div className="absolute -right-14 top-16 h-px w-[400%] bg-gradient-to-l from-slate-400 opacity-20"></div>
                      <div className="absolute left-full top-16 ml-14 h-px w-screen bg-slate-400 opacity-20"></div>
                      <div className="absolute top-[-135%] bottom-[-65%] right-11 w-px opacity-20"></div>
                      <div className="absolute -right-24 -bottom-16 h-px w-[400%] opacity-30"></div>
                      <div className="absolute top-[-120%] bottom-[-80%] -left-12 w-px opacity-20"></div>
                      <div className="absolute top-16 -left-80 mt-[-0.5px] h-[2px] w-28 rounded-full bg-gradient-to-r from-blue-500"></div>
                      <div className="absolute -left-12 bottom-8 ml-[-0.5px] h-28 w-[2px] rounded-full bg-gradient-to-t from-violet-400"></div>
                    </div>
                  </div>
                  <div className="relative mt-16 flex flex-col sm:flex-row sm:justify-center lg:hidden">
                    
                    <Link
                      href={`/docs`}
                      className="mt-6 rounded-full  py-2 px-6 text-center focus:outline-none focus:ring-2 bg-slate-900   text-slate-50 hover:bg-slate-700  dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 font-semibold  sm:ml-6 sm:mt-0"
                    >
                      {dictionary["home-page"]["cases"]}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section id="mobile-first" className="overflow-hidden mb-14 mt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="mt-6 sm:mt-10 relative z-10 rounded-xl md:px-10  border-2 border-dotted border-slate-400	 dark:border-sky-500">
                <div className="flex  flex-col xl:flex-row p-4 	items-center ">
                  <Image
                    src="/dark_head.png"
                    alt="Picture of home"
                    className="rounded-md p-4 hidden dark:block"
                    width={1024}
                    height={512}
                  />
                  <Image
                    src="/light_head.png"
                    alt="Picture of home"
                    className="rounded-md p-4 dark:hidden"
                    width={1024}
                    height={512}
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="mobile-first" className="overflow-hidden my-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="w-16 h-16 flex justify-center items-center rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden dark:bg-indigo-500 dark:highlight-white/20">
                <div className="aspect-w-1 aspect-h-1 bg-[length:100%] dark:hidden"></div>
                <div className="hidden aspect-w-1 aspect-h-1 bg-[length:100%] dark:block"></div>
                <AiOutlineMobile className="w-12 h-12  dark:text-slate-200 text-violet-400" />
              </div>
              <h2 className="mt-8 font-semibold text-indigo-500 dark:text-indigo-400">
                {dictionary["home-page"].mobileDevice}
              </h2>
              <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 ">
                {dictionary["home-page"].responsiveDesign}
              </p>
              <div className="mt-4 max-w-3xl space-y-6 ">
                <p>
                {dictionary['home-page'].tailwindcssSupport}
                </p>
              </div>
              <a
                className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8"
                href="https://github.com/zdlpsina/aiwiki"
              >
                {dictionary["home-page"].learnMore}
                <span className="sr-only">, responsive design</span>
                <svg
                  className="overflow-visible ml-3 text-indigo-300 group-hover:text-indigo-400 dark:text-slate-500 dark:group-hover:text-slate-400"
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0L3 3L0 6"></path>
                </svg>
              </a>
              <div className="mt-6 sm:mt-10 relative z-10 rounded-xl md:px-10  border-2 border-dotted border-slate-400	 dark:border-sky-500">
                <div className="flex  flex-col xl:flex-row p-4 	items-center justify-center ">
                  <Image
                    src="/dark_mobile_2.png"
                    alt="Picture of logo"
                    className="rounded-md p-4 hidden dark:block"
                    width={500}
                    height={1024}
                  />
                  <Image
                    src="/dark_mobile.png"
                    alt="Picture of logo"
                    className="rounded-md p-4 hidden dark:block"
                    width={500}
                    height={1024}
                  />
                  <Image
                    src="/light_mobile_2.png"
                    alt="Picture of logo"
                    className="rounded-md p-4 dark:hidden "
                    width={500}
                    height={1024}
                  />
                  <Image
                    src="/light_mobile.png"
                    alt="Picture of logo"
                    className="rounded-md p-4 dark:hidden"
                    width={500}
                    height={1024}
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="full-text-search" className="my-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="w-16 h-16 flex items-center justify-center rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden dark:bg-slate-600 dark:highlight-white/20">
                <div className="aspect-w-1 aspect-h-1 bg-[length:100%] dark:hidden"></div>
                <div className="hidden aspect-w-1 aspect-h-1 bg-[length:100%] dark:block"></div>
                <AiOutlineFileText className="w-12 h-12  dark:text-slate-200 text-violet-400" />
              </div>
              <h2 className="mt-8 font-semibold text-slate-500">{dictionary["home-page"].fullTextSearch}</h2>
              <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 ">
                {dictionary["home-page"].twoLang}
              </p>
              <p className="mt-4 max-w-3xl space-y-6 ">
                    {dictionary['home-page'].full}
              </p>
              <a
                className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8"
                href="https://github.com/zdlpsina/aiwiki"
              >
                {dictionary["home-page"].learnMore}
                <span className="sr-only">, dark mode</span>
                <svg
                  className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0L3 3L0 6"></path>
                </svg>
              </a>


              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="mt-6 sm:mt-10 relative z-10 rounded-xl md:px-10  border-2 border-dotted border-slate-400	 dark:border-sky-500">
                <div className="flex  flex-col xl:flex-row p-4 	items-center ">
                <Image
                    src="/dark_search.png"
                    alt="Picture of logo"
                    width={1024}
                    height={512}
                    className="relative rounded-md p-4 hidden dark:block "
                  />
                  <Image
                    src="/light_search.png"
                    alt="Picture of logo"
                    width={1024}
                    height={512}
                    className=" relative rounded-md p-4 dark:hidden"
                  />
                </div>
              </div>
            </div>


              
            </div>
          </section>

          <footer className="pb-16 text-sm leading-6">
            <div className="max-w-7xl mx-auto divide-y divide-slate-200 px-4 sm:px-6 md:px-8 dark:divide-slate-700">
              <div className="flex">
                <div className="flex-none w-1/2 space-y-10 sm:space-y-8 lg:flex lg:space-y-0">
                  <div className="lg:flex-none lg:w-1/2">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                      {dictionary["home-page"].getStarted}
                    </h2>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://github.com/zdlpsina/zizdlp"
                        >
                          {dictionary["home-page"].Prerequisite}
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://github.com/zdlpsina/zizdlp"
                        >
                          {dictionary["home-page"].howTo}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:flex-none lg:w-1/2">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                      {dictionary["home-page"].coreConcept}
                    </h2>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://github.com/zdlpsina/zizdlp"
                        >
                          {dictionary["home-page"].responsiveDesign}
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://github.com/zdlpsina/zizdlp"
                        >
                          {dictionary["home-page"].quickResponse}
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://github.com/zdlpsina/zizdlp"
                        >
                          {dictionary["home-page"].darkMode}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex-none w-1/2 space-y-10 sm:space-y-8 lg:flex lg:space-y-0">
                  <div className="lg:flex-none lg:w-1/2">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                      {dictionary["home-page"].community}
                    </h2>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://github.com/zdlpsina/zizdlp"
                        >
                          GitHub
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://github.com/zdlpsina/zizdlp"
                        >
                          Bilibili
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://github.com/zdlpsina/zizdlp"
                        >
                          YouTube
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="lg:flex-none lg:w-1/2">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                      {dictionary["home-page"].friendLink}
                    </h2>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://linchat.zizdlp.com"
                        >
                          LinChat APP
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                          href="https://linchat.zizdlp.com"
                        >
                          Linchat
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-16 pt-10 flex items-center justify-start">
                <Link
                  href="/"
                  className="md:mr-1 flex-none w-[1.8rem] overflow-hidden md:w-auto"
                >
                  <Image
                    src="/logo.png"
                    className=" w-10 h-10 rounded-md"
                    alt="LOGO"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link href="/" className="flex-col items-center">
                  <h1 className="font-bold text-xl md:text-2xl dark:text-slate-50 cursor-pointer px-4">
                    Lin
                    <span className="text-blue-500 dark:text-blue-400">
                      WIKI
                    </span>
                  </h1>
                  <span className="font-sm px-4">
                    {dictionary["home-page"].rightRes}
                  </span>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
