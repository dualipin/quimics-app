/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_API_URL: string
  // You can add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
