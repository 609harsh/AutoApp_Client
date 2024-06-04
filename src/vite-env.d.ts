/// <reference types="vite/client" />

declare type AnyFunction = (...args: any[]) => any;
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_COMPANY_LOGO_URL_SMALL: string;
  readonly VITE_COMPANY_LOGO_URL_LARGE: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ANCHOR_PREFIX: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
