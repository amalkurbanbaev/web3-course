/// <reference types="vite/client" />
declare interface ImportMetaEnv {
  readonly VITE_PROJECT_ID: string
  readonly ETHERSCAN_API_KEY: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}

