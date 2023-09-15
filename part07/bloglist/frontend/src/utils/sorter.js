import { createSelector } from '@reduxjs/toolkit'

const sortBlogsByLikes = (a, b) => {
  if (a.likes > b.likes) return -1
  else if (a.likes < b.likes) return 1
  // If not, order alphabetially
  else return a.title.localeCompare(b.title)
}

export const sortedBlogsSelector = createSelector(
  [(state) => state.blogs],
  (blogs) => {
    return [...blogs].sort(sortBlogsByLikes)
  }
)
