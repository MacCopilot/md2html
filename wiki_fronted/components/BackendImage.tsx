import "server-only";
import { unstable_noStore as noStore } from "next/cache";

interface BackendImageProps {
  path: string;
}

async function fetchData(url: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "image/png", // Default content type
      "Cache-Control": "no-cache",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data.image Status: ${response.status}, url: ${url}`
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64String = btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return `data:${response.headers.get("Content-Type")};base64,${base64String}`;
}

async function getImageData(path: string) {
  try {
    noStore(); // Opt into dynamic rendering
    const backend_url = process.env.BACKEND_URL;
    const url = `${backend_url}/${path}`;
    return await fetchData(url);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function getFileExtension(url: string): string {
  const match = url.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : "";
}

export default async function BackendImage(props: BackendImageProps) {
  try {
    const imageData = await getImageData(props.path);
    const fileExtension = getFileExtension(props.path);
    return (
      <img
        className="w-full my-4 rounded-md"
        src={imageData}
        alt="image"
        decoding="async"
        loading="lazy"
        {...(fileExtension === "svg"
          ? { style: { objectFit: "contain" } }
          : {})}
      />
    );
  } catch (error) {
    return (
      <div
        className={`h-96 my-4 rounded-md w-full animate-pulse bg-slate-300 dark:bg-slate-700`}
      />
    );
  }
}
