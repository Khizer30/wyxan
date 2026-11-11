"use client";
import { type RefObject, useEffect, useRef } from "react";

const BASE_CSS = `
  :root { color-scheme: light; }
  html { background: #fbfaf7; }
  body { margin: 0; color: #1d1d1f; font: 17px/1.7 Georgia, "Iowan Old Style", "Times New Roman", serif; }
  main { max-width: 44rem; margin: 0 auto; padding: 3rem 1.5rem 6rem; overflow-wrap: anywhere; }
  h1, h2, h3, h4 { font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.2; letter-spacing: -0.01em; }
  h1 { font-size: 2.1rem; margin: 0 0 1rem; }
  a[data-address] { color: #1a5fb4; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
  a:not([data-address]) { color: inherit; text-decoration: underline dotted; cursor: default; }
  blockquote { margin: 1.2em 0; padding: 0.1em 1.1em; border-left: 3px solid #cfc9bb; color: #55524b; }
  pre, code, kbd, samp { font-family: ui-monospace, Menlo, monospace; font-size: 0.9em; background: #f0eee8; border-radius: 4px; }
  code, kbd, samp { padding: 0.1em 0.35em; }
  pre { padding: 0.9em 1.1em; overflow-x: auto; }
  table { border-collapse: collapse; margin: 1em 0; }
  td, th { border: 1px solid #ddd8cc; padding: 0.4em 0.75em; text-align: left; }
  hr { border: 0; border-top: 1px solid #ddd8cc; margin: 2rem 0; }
`;

const CSP = "default-src 'none'; style-src 'unsafe-inline'";

function buildDocument(safeHtml: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${CSP}"><style>${BASE_CSS}</style></head><body><main>${safeHtml}</main></body></html>`;
}

interface PageViewerProps {
  title: string;
  safeHtml: string;
  scrollY: number;
  onFollow: (address: string) => void;
  scrollReaderRef: RefObject<() => number>;
}

export function PageViewer({ title, safeHtml, scrollY, onFollow, scrollReaderRef }: PageViewerProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const followRef = useRef(onFollow);

  useEffect(() => {
    followRef.current = onFollow;
  }, [onFollow]);

  useEffect(() => {
    const reader = scrollReaderRef;
    reader.current = () => frameRef.current?.contentWindow?.scrollY ?? 0;
    return () => {
      reader.current = () => 0;
    };
  }, [scrollReaderRef]);

  const handleLoad = () => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc) {
      return;
    }

    frame.contentWindow?.scrollTo(0, scrollY);

    doc.addEventListener("click", (event) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) {
        return;
      }
      event.preventDefault();

      const address = anchor.getAttribute("data-address");
      if (address) {
        followRef.current(address);
      }
    });
  };

  return (
    <iframe
      ref={frameRef}
      title={title}
      sandbox="allow-same-origin"
      srcDoc={buildDocument(safeHtml)}
      onLoad={handleLoad}
      className="block size-full border-0 bg-[#fbfaf7]"
    />
  );
}
