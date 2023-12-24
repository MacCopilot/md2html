import "server-only";
import { unstable_noStore as noStore } from 'next/cache';

interface ImageWrapperProps {
  path: string;
}
async function getImage(href: string) {
  try {
    noStore(); // Opt into dynamic rendering
    const backend_url = process.env.BACKEND_URL;
    const url = `${backend_url}/${href}`;
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "image/png", // Set the appropriate content type for your image
        "Cache-Control": "no-cache",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}, url: ${url}`);
    }

    // // Instead of using response.json(), use response.blob()
    // const imageData = await response.blob();
    // console.log("url:",url,imageData)
    // return URL.createObjectURL(imageData); // Create a URL for the blob


    // Instead of using response.blob(), use response.arrayBuffer()
    const arrayBuffer = await response.arrayBuffer();

    // Convert the ArrayBuffer to base64 using Uint8Array
    const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));

    return `data:${response.headers.get('Content-Type')};base64,${base64String}`;



  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default async function ImageWrapperS(props: ImageWrapperProps) {
  const imageData = await getImage(props.path)
  if (!imageData) {
    return <div>Loading...</div>;
  }

  return <img className="w-full my-4 rounded-md" src={`${imageData}`}       alt="image"/>;
}
