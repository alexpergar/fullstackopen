const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const users = [
  {
    _id: "5a422b891b54a676234d17fa",
    name: "User 1",
    username: "user-name-1",
    passwordHash: "asdfgg9348th9823hgifuyg87r32h9824yfb",
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fb",
    name: "User 2",
    username: "user-name-2",
    passwordHash: "asdfgg934dfhsdhjfgsdhsdfsgdrsg824yfb",
    __v: 0
  }  
]

beforeAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = blogs.map(blog => new Blog(blog))
  const promiseArrayBlogs = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArrayBlogs)

  const userObjects = users.map(user => new User(user))
  const promiseArrayUsers = userObjects.map(user => user.save())
  await Promise.all(promiseArrayUsers)
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when the list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('when the list has multiple blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('when the list has multiple blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})

describe('tests for 4.b', () => {

  // Necessary for autentification
  test('a user is correctly created', async () => {
    const user = {
      'name': 'test user',
      'username': 'my-users',
      'password': '123abc'
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
  })

  test('supertest is making a get request correctly', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the id is saved in an property called "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('post request works', async () => {
    const getResponseBefore = await api.get('/api/blogs')

    // Login
    const user = {
      "username": "my-users",
      "password": "123abc"
    }
    const loginResponse = await api
      .post('/api/login')
      .send(user)
    const token = loginResponse.body.token

    // Create blog
    const newBlog = {
      'title': 'test',
      'author': 'test',
      'url': 'test',
      'likes': 5,
    }
    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const getResponseAfter = await api.get('/api/blogs')

    // Check if there's one new element.
    expect(getResponseAfter.body.length)
      .toEqual(getResponseBefore.body.length + 1)

    // Check if the last element is the one we added.
    expect(postResponse.body.id)
    .toEqual(getResponseAfter.body[getResponseAfter.body.length-1].id)

    // Cleaning.
    const blogs = await Blog.find({})
    await blogs[blogs.length-1].deleteOne()
  })

  test('no likes in post initializes likes to 0', async () => {
    // Login
    const user = {
      "username": "my-users",
      "password": "123abc"
    }
    const loginResponse = await api
      .post('/api/login')
      .send(user)
    const token = loginResponse.body.token

    // Create blog
    const newBlog = {
      'title': 'test',
      'author': 'test',
      'url': 'test',
    }
    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Check if the last element is the one we added.
    expect(postResponse.body.likes)
    .toBe(0)

    // Cleaning.
    const blogs = await Blog.find({})
    await blogs[blogs.length-1].deleteOne()

  })

  test('no url or title returns 400 bad request', async () => {
    let newBlog = {
      'author': 'test',
      'url': 'test',
      'likes': 5,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    newBlog = {
      'title': 'test',
      'author': 'test',
      'likes': 5,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('delete request is working', async () => {
    const getResponse = await api.get('/api/blogs')
    const targetId = getResponse.body[0].id

    // Login
    const user = {
      "username": "my-users",
      "password": "123abc"
    }
    const loginResponse = await api
      .post('/api/login')
      .send(user)
    const token = loginResponse.body.token

    // Create new blog
    const newBlog = {
      'title': 'test',
      'author': 'test',
      'url': 'test',
      'likes': 5,
    }
    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect('Content-Type', /application\/json/)

    // Delete the new blog
    await api
      .delete(`/api/blogs/${postResponse.body.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)
  })

  test('put request is working', async () => {
    const getResponse = await api.get('/api/blogs')
    const targetBlog = getResponse.body[0]

    const modifiedBlog = {
      ...targetBlog,
      likes: 9999,
    }

    await api
      .put(`/api/blogs/${targetBlog.id}`)
      .send(modifiedBlog)
      .expect(200)
  })
})

describe('tests for 4.d', () => {
  test('invalid user creation: invalid password', async () => {
    const user = {
      'name': 'test user',
      'username': 'test_user',
      'password': 'ab'
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('invalid user creation: invalid username', async () => {
    const user = {
      'name': 'test user',
      'username': 'tu',
      'password': 'fmfiuaua39fASnw3ofiNFDsd93'
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('invalid user creation: username is not unique', async () => {
    const user = {
      'name': 'test user',
      'username': 'user123',
      'password': 'fmfiuaua39fASnw3ofiNFDsd93'
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})