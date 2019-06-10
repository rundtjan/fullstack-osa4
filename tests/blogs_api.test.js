const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})

  var firstBlog = new Blog(blogs[0])
  await firstBlog.save()

  var secondBlog = new Blog(blogs[1])
  await secondBlog.save()

  var thirdBlog = new Blog(blogs[2])
  await thirdBlog.save()

  var fourthBlog = new Blog(blogs[3])
  await fourthBlog.save()

  var fifthBlog = new Blog(blogs[4])
  await fifthBlog.save()

  var sixthBlog = new Blog(blogs[5])
  await sixthBlog.save()
})

test('blogit jsonina', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('on 6 blogia', async () => {
    const tulos = await api.get('/api/blogs')
  
    expect(tulos.body.length).toBe(6)
  })

  test('id-kenttä on määritelty', async () => {
    const tulos = await api.get('/api/blogs')
    console.log(tulos.body[0].id)
    expect(tulos.body[0].id).toBeDefined()
  })

  test('post lisää yhden blogin', async () => {
    const tulos = await api.get('/api/blogs')
    const alkupituus = tulos.body.length
    
    const uusiblogi = new Blog({
      _id: "5a422bc62b54a676234d17fc",
      title: "Type wars 2",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    })
    
    await api.post('/api/blogs').send(uusiblogi).expect(201)

    const toinentulos = await api.get('/api/blogs')
    //console.log(tulos.body[tulos.body.length-1])
    expect(toinentulos.body.length).toBe(alkupituus+1)
  })

  test('likes on defaultina 0', async () => {
    const uusiblogi = new Blog({
      _id: "5a422bc62b54a676234d17fc",
      title: "Type wars 2",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: null,
      __v: 0
    })
    
    await api.post('/api/blogs').send(uusiblogi).expect(201)

    const tulos = await api.get('/api/blogs')
    expect(tulos.body[tulos.body.length-1].likes).toBe(0)
  })

  /*test('ilman title tai url ei voi tallettaa', async () => {
    const titleblogi = new Blog({
      _id: "5a422bc62b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: null,
      __v: 0
    })
    
    await api.post('/api/blogs').send(titleblogi).expect(400)

    const urlblogi = new Blog({
      _id: "5a422bc62b54a676234d17fc",
      title: "Type wars 2",
      author: "Robert C. Martin",
      likes: null,
      __v: 0
    })

    await api.post('/api/blogs').send(urlblogi).expect(400)

  })*/

  test('delete toimii', async () => {
    
    await api.delete('/api/blogs/5a422bc61b54a676234d17fc').expect(204)

  })

  test('pystyy lisäämään likeseja', async () => {
    
    const tulos = await api.put('/api/blogs/5a422a851b54a676234d17f7')
    //console.log(tulos.body)
    expect(tulos.body.likes).toBe(8)

  })
  

afterAll(() => {
  mongoose.connection.close()
})