/// <reference types="vite/client" />

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ??
  "https://script.google.com/macros/s/AKfycbzfD8FMZxAVWlCh5epy9RLKxdCfWTDShUfyQEJtKbWKah9Swp69TN-Lkfd0E93xlKpt4A/exec";

export class SubmitError extends Error {}

export async function submitForm(payload: Record<string, unknown>): Promise<void> {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new SubmitError(
      "Network error. Please check your connection and try again."
    );
  }
}