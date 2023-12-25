import React from "react";

interface HeadingProps {
  tagName: string;
  idAttribute: string | null;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  tagName,
  idAttribute,
  children,
}) => {
  const HeadingComponent = tagName.toLowerCase() as keyof JSX.IntrinsicElements;
  const level = parseInt(tagName.substring(1), 10);
  const className =
    level == 1
      ? "text-xl md:text-3xl font-black text-slate-900 tracking-tight text-center dark:text-slate-200 pb-3 md:pb-6 md:my-3"
      : level == 2
      ? "text-lg md:text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2 md:py-4"
      : level == 3
      ? "text-base md:text-xl font-extrabold	text-slate-900 tracking-tight dark:text-slate-200  py-1.5"
      : level == 4
      ? "text-base md:text-lg  font-bold	text-slate-900 tracking-tight  dark:text-slate-200  py-1.5"
      : level == 5
      ? "text-sm md:text-base font-bold text-slate-900 tracking-tight  dark:text-slate-200  py-1"
      : level == 6
      ? "text-sm md:text-base font-semibold text-slate-900 tracking-tight dark:text-slate-200 py-0.5"
      : "text-sm md:text-base font-semibold text-slate-900 tracking-tight dark:text-slate-200 py-0.5";
  return (
    <HeadingComponent
      key={Math.random()}
      id={idAttribute || undefined}
      className={className}
    >
      {children}
    </HeadingComponent>
  );
};

export default Heading;
