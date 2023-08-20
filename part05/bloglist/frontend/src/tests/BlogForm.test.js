import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

describe('testing blog form', () => {

  test('blog form receives props properly', async () => {
    const user = userEvent.setup()

    const createBlogMock = jest.fn()
    render(<BlogForm createBlog={createBlogMock}/>)

    const titleInput = screen.getByPlaceholderText('Blog title')
    const authorInput = screen.getByPlaceholderText('Blog author')
    const urlInput = screen.getByPlaceholderText('Blog URL')
    const sendButton = screen.getByText('create')

    const title = 'test title'
    const author = 'test author'
    const url = 'test url'

    await user.type(titleInput, title)
    await user.type(authorInput, author)
    await user.type(urlInput, url)
    await user.click(sendButton)

    expect(createBlogMock.mock.calls[0][0]).toBe(title)
    expect(createBlogMock.mock.calls[0][1]).toBe(author)
    expect(createBlogMock.mock.calls[0][2]).toBe(url)
    expect(createBlogMock.mock.calls[0][3]).toBe(0)
  })
})