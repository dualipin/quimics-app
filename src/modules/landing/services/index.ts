const BASE_URL = '/v1/landing'

export function getLandingElementAudio(fromPath: string, number: number) {
  return `${import.meta.env.VITE_API_HOST}/api${BASE_URL}/${fromPath}/${number}/stream`
}
