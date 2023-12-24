import "server-only";
import { unstable_noStore as noStore } from 'next/cache';

interface ImageWrapperProps {
  path: string;
}
export default function ImageWrapper(props: ImageWrapperProps) {

    noStore(); // Opt into dynamic rendering
    const backend_url = process.env.BACKEND_URL;

  return <img className="w-full my-4 rounded-md" src={props.path} />;
}
