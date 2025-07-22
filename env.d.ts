/// <reference types="vite/client" />

declare module '*.pdb' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_API_URL: string
  // You can add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
