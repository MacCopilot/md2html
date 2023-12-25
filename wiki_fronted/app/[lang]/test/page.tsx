import HtmlParser from "@/components/HtmlParser";
const Home: React.FC = () => {
  const htmlString = `<div><h1>Hello, World!</h1><h2> see me</h2><p>This is a paragraph.</p><div>优秀</div></div>`;
  return (
    <HtmlParser htmlString={htmlString}/>
  );
};

export default Home;
