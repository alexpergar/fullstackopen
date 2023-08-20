import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'


const blog = {
  title: 'blog title',
  author: 'blog author',
  likes: 0,
  url: 'blog url',
  user: 'test user',
}
let likeFunction
let deleteFunction


describe('rendering blogs test', () => {
  beforeEach(() => {
    likeFunction = jest.fn()
    deleteFunction = jest.fn()

    render(<Blog blog={blog}
      likeBlog={likeFunction}
      deleteBlog={deleteFunction}/>)
  })

  test('renders blog title and author but not url or likes', () => {
    const titleParent = screen.getByText(/blog.title/).closest('div')
    const authorParent = screen.getByText(/blog.author/).closest('div')
    const urlParent = screen.getByText(/blog.url/).closest('div')
    const likesParent = screen.getByText('like').closest('div')

    expect(titleParent).not.toHaveStyle('display: none')
    expect(authorParent).not.toHaveStyle('display: none')
    expect(urlParent).toHaveStyle('display: none')
    expect(likesParent).toHaveStyle('display: none')
  })

  test('renders url and likes after clicking the view button', async () => {

    const user = userEvent.setup()

    const urlParent = screen.getByText(/blog.url/).closest('div')
    const likesParent = screen.getByText('like').closest('div')

    expect(urlParent).toHaveStyle('display: none')
    expect(likesParent).toHaveStyle('display: none')

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(urlParent).not.toHaveStyle('display: none')
    expect(likesParent).not.toHaveStyle('display: none')
  })

  test('check if like button is recording clicks properly (two times)', async () => {

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    const likeButton = screen.getByText('like')

    await user.click(viewButton)
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeFunction.mock.calls).toHaveLength(2)
  })
})