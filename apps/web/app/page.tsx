"use client";
import dynamic from "next/dynamic";

const Browser = dynamic(() => import("@features/browser/components/Browser").then((module) => module.Browser), { ssr: false });

export default function Home() {
  return <Browser />;
}
