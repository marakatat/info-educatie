/**
 * Returns the correct site URL based on the environment
 * In production, it returns the hardcoded production URL
 * In development, it returns the current origin
 */
export function getSiteUrl(): string {
  // The production URL of your application
  const productionUrl = "https://v0-info-educatie.vercel.app"

  // Check if we're in the browser
  const isBrowser = typeof window !== "undefined"

  // In production, return the hardcoded URL
  if (process.env.NODE_ENV === "production") {
    return productionUrl
  }

  // In development in the browser, return the current origin
  if (isBrowser) {
    return window.location.origin
  }

  // In development on the server, return localhost
  return "http://localhost:3000"
}
