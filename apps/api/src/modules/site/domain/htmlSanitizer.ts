import { normalizeAddress } from "@repo/dtos/address";
import { convert } from "html-to-text";
import sanitizeHtml from "sanitize-html";

export interface SanitizedPage {
  safeHtml: string;
  text: string;
}

export function sanitizePage(html: string): SanitizedPage {
  const safeHtml = sanitizeHtml(html, {
    allowedAttributes: {
      "*": ["class", "title", "style"],
      a: ["href", "data-address"]
    },
    allowedStyles: {
      "*": {
        color: [/^#[0-9a-f]{3,8}$/i, /^[a-z]+$/i],
        "background-color": [/^#[0-9a-f]{3,8}$/i, /^[a-z]+$/i],
        "text-align": [/^(?:left|right|center|justify)$/],
        "font-weight": [/^(?:normal|bold)$/],
        "font-style": [/^(?:normal|italic)$/]
      }
    },
    transformTags: {
      a: (_tag, attribs) => {
        const address = normalizeAddress(attribs.href ?? "");
        const attributes: Record<string, string> = address ? { href: "#", "data-address": address } : {};
        return { tagName: "a", attribs: attributes };
      }
    }
  });

  const text = convert(safeHtml, {
    wordwrap: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "ul", options: { itemPrefix: " " } },
      ...["h1", "h2", "h3", "h4", "h5", "h6"].map((selector) => ({ selector, options: { uppercase: false } }))
    ]
  });

  return { safeHtml, text: text.replace(/\s+/g, " ").trim() };
}
