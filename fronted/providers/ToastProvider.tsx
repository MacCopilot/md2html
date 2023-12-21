"use client";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <div>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}
