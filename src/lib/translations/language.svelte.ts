import type { Language } from "$lib/types";
import en from "./en_US";
import pl from "./pl_PL";

let language = $state<any>(en);

export function setLanguage(lang: Language) {
  switch (lang) {
    case "English":
      language = en;
      break;
    case "Polski":
      language = pl;
      break;
  }
}

function t(key: string): string {
  let n = language;
  key.split(".").forEach((k) => {
    n = n?.[k];
  });
  return typeof n !== "string" ? key : n;
}

export default t;
