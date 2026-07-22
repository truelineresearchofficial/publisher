/// <reference types="vite/client" />

// Same-origin in production (host nginx routes /api -> backend container).
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? '/api'

export class SubmitError extends Error {}

/**
 * POST a form payload to the submissions API.
 * Resolves on 2xx; throws SubmitError (with a user-facing message) otherwise.
 * Shared by every form on the site.
 */
export async function submitForm(payload: Record<string, unknown>): Promise<void> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(`${API_BASE}/v1/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!res.ok) {
      let message = 'Something went wrong. Please try again.'
      try {
        const body = await res.json()
        if (body?.error?.message) message = body.error.message
      } catch {
        /* non-JSON error body — keep the default message */
      }
      throw new SubmitError(message)
    }
  } catch (err) {
    if (err instanceof SubmitError) throw err
    throw new SubmitError('Network error. Please check your connection and try again.')
  } finally {
    clearTimeout(timeout)
  }
}
