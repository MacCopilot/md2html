"use client";
import { toast } from "react-toastify";
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string; // 将结果断言为 string 类型
      resolve(result.split(",")[1]); // 获取base64字符串
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function convertTime(givenTime: string): string {
  // 解析给定时间字符串
  const t = new Date(givenTime);

  // 获取当前时间和时区
  const now = new Date();
  const nowZoneOffset = now.getTimezoneOffset() * -60;

  // 计算时间差
  const diff = now.getTime() - t.getTime();

  // 小于一小时
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes} 分钟前`;
  }
  // 小于一天
  else if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours} 小时前`;
  }
  // 大于一天
  else {
    // 转换为当前时区的时间
    const tLocal = new Date(t.getTime() + nowZoneOffset * 1000);
    return tLocal.toLocaleDateString();
  }
}

export function isContains(str: string | undefined, substr: string) {
  if (str == undefined) {
    return false;
  }
  return str.indexOf(substr) >= 0;
}
export function generateRandomId() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
export function copy2ClipBoard(id: string): void {
  const element = document.getElementById(id);
  const lines = element?.querySelectorAll(
    ".cl"
  ) as NodeListOf<HTMLElement> | null;
  if (!lines) {
    console.log("not found line");
    return;
  }
  const buffer: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    buffer.push(lines[i].textContent || "");
  }
  let res = buffer.join("");
  if (res === "") {
    res = element?.innerText || element?.textContent || "";
  }
  console.log("=====res:",res)
  // Copy the text inside the text field
  //navigator.clipboard.writeText(buffer.join(""));
  navigator.clipboard.writeText(res).then(
    () => {
      /* Resolved - text copied to clipboard */
      toast("已拷贝至粘贴板", {
        type: toast.TYPE.SUCCESS,
        autoClose: 500,
      });
    },
    () => {
      /* Rejected - clipboard failed */
      toast("拷贝到粘贴板失败", {
        type: toast.TYPE.ERROR,
        autoClose: 500,
      });
    }
  );
}
