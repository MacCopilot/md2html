export default function SearchButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center text-sm leading-6 text-slate-400 rounded-md ring-1 
                ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:hover:ring-slate-700 
                dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700 h-12"
    >
      <svg
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        className="mr-3 flex-none"
      >
        <path
          d="m19 19-3.5-3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <circle
          cx="11"
          cy="11"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></circle>
      </svg>
      快速搜索...
      <span className="ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span>
    </button>
  );
}
