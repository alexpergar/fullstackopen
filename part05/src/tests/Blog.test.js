import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

test('renders blog title and author but not url or likes', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 0,
    url: 'blog url',
    user: 'test user',
  }
  const blogs = [ blog ]
  const setBlogs = jest.fn()
  const notify = jest.fn()

  render(<Blog blog={blog}
    blogs={blogs}
    setBlogs={setBlogs}
    notify={notify} />)

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
  const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 0,
    url: 'blog url',
    user: 'test user',
  }
  const blogs = [ blog ]
  const setBlogs = jest.fn()
  const notify = jest.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog}
    blogs={blogs}
    setBlogs={setBlogs}
    notify={notify} />)

  const urlParent = screen.getByText(/blog.url/).closest('div')
  const likesParent = screen.getByText('like').closest('div')

  expect(urlParent).toHaveStyle('display: none')
  expect(likesParent).toHaveStyle('display: none')

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  expect(urlParent).not.toHaveStyle('display: none')
  expect(likesParent).not.toHaveStyle('display: none')
})

test('check if like button is recording clicks properly', async () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 0,
    url: 'blog url',
    user: 'test user',
  }
  const blogs = [ blog ]
  const setBlogs = jest.fn()
  const notify = jest.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog}
    blogs={blogs}
    setBlogs={setBlogs}
    notify={notify} />)

  const viewButton = screen.getByText('view')
  const likeButton = screen.getByText('like')

  await user.click(viewButton)
  await user.click(likeButton)
  await user.click(likeButton)


})