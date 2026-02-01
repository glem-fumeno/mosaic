import type { Language } from "$lib/types";
import en from "./en_US";
import pl from "./pl_PL";

let language = $state<typeof en>(en);

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

type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

function t(key: Leaves<typeof en>): string {
  let n: any = language;
  key.split(".").forEach((k) => {
    n = n?.[k];
  });
  return typeof n !== "string" ? key : n;
}

export default t;
