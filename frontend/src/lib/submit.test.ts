import { afterEach, describe, expect, it, vi } from 'vitest'
import { SubmitError, submitForm } from './submit'

afterEach(() => vi.restoreAllMocks())

describe('submitForm', () => {
  it('POSTs JSON to the submissions endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    vi.stubGlobal('fetch', fetchMock)

    await submitForm({ form_type: 'newsletter', email: 'a@b.com' })

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, opts] = fetchMock.mock.calls[0]
    expect(String(url)).toContain('/v1/submissions')
    expect(opts.method).toBe('POST')
    expect(opts.headers['Content-Type']).toBe('application/json')
    expect(JSON.parse(opts.body)).toMatchObject({ form_type: 'newsletter', email: 'a@b.com' })
  })

  it('throws SubmitError with the envelope message on non-2xx', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: { message: 'One or more fields are invalid.' } }),
      }),
    )

    await expect(submitForm({ form_type: 'newsletter', email: 'bad' })).rejects.toBeInstanceOf(
      SubmitError,
    )
    await expect(submitForm({ form_type: 'newsletter', email: 'bad' })).rejects.toThrow(
      'One or more fields are invalid.',
    )
  })

  it('throws a network SubmitError when fetch rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('boom')))
    await expect(submitForm({ form_type: 'newsletter', email: 'a@b.com' })).rejects.toBeInstanceOf(
      SubmitError,
    )
  })
})
