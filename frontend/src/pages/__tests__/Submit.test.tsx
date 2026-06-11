import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Submit from '../Submit'

afterEach(() => vi.restoreAllMocks())

function renderSubmit() {
  return render(
    <MemoryRouter>
      <Submit />
    </MemoryRouter>,
  )
}

async function fillManuscript(user: ReturnType<typeof userEvent.setup>) {
  // 4 text inputs + the abstract textarea (honeypot is aria-hidden -> excluded)
  for (const box of screen.getAllByRole('textbox')) {
    await user.type(box, box.getAttribute('type') === 'email' ? 'a@b.com' : 'x')
  }
  await user.selectOptions(screen.getByRole('combobox'), 'Original research')
  await user.click(screen.getByRole('checkbox'))
}

describe('Submit (manuscript)', () => {
  it('posts article_type + originality and shows the success view', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ id: 'x', status: 'received' }) })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    renderSubmit()
    await fillManuscript(user)
    await user.click(screen.getByRole('button', { name: /start submission/i }))

    await waitFor(() => expect(screen.getByText(/Submission received/i)).toBeInTheDocument())
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body).toMatchObject({
      form_type: 'submit',
      article_type: 'Original research',
      originality_confirmed: true,
      email: 'a@b.com',
    })
  })

  it('shows an inline error when the API rejects', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          error: { message: 'You must confirm the originality declaration to submit.' },
        }),
      }),
    )
    const user = userEvent.setup()

    renderSubmit()
    await fillManuscript(user)
    await user.click(screen.getByRole('button', { name: /start submission/i }))

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/originality/i))
  })
})
