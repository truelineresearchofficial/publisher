/// <reference types="vite/client" />

// Google Apps Script Web App endpoint that appends each Contact submission as a
// row to the marketing team's Google Sheet. This is a public web-app URL (it is
// baked into the client bundle regardless). Overridable via VITE_GOOGLE_SCRIPT_URL,
// with a sensible default — same pattern as VITE_API_BASE in submit.ts.
const GOOGLE_SCRIPT_URL =
  (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined) ??
  'https://script.google.com/macros/s/AKfycbzfD8FMZxAVWlCh5epy9RLKxdCfWTDShUfyQEJtKbWKah9Swp69TN-Lkfd0E93xlKpt4A/exec'

export interface ContactSheetPayload {
  name: string
  email: string
  phone: string
  subject: string
  organization: string
  message: string
  form_type: string
  variant: string
  website: string // honeypot
}

/**
 * Best-effort append of a Contact submission to the Google Sheet.
 *
 * Fire-and-forget: this never throws and never blocks the form's success UI.
 * The FastAPI backend remains the source of truth; this is a parallel mirror
 * into the team's spreadsheet. Called only after the FastAPI request succeeds.
 *
 * Uses `no-cors` and sends the JSON as a plain-text body (no explicit
 * `Content-Type` header). `application/json` is NOT a CORS-safelisted value, so
 * setting it makes this a "non-simple" request: the Apps Script `/exec` URL then
 * 302-redirects to script.googleusercontent.com, which surfaces as a 401 in the
 * browser and no row is appended. Omitting the header keeps this a simple request
 * (default `text/plain`); Apps Script still receives the JSON string via
 * `e.postData.contents` and parses it. In `no-cors` the response is opaque
 * (status unreadable), so failures are logged to the console only.
 */
export async function postToContactSheet(payload: ContactSheetPayload): Promise<void> {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('[contact] Google Sheet sync failed:', err)
  }
}
