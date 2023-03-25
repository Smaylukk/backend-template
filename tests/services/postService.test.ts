import sequelize from '../../src/db'
import PostService from '../../src/services/postService'
import { PostDTO } from '../../src/models/dto/PostDTO'

let postData = new PostDTO({
  body: 'tests post',
  userId: 1,
})

beforeAll(async () => {
  await sequelize.authenticate()
  await sequelize.sync({ logging: false })
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test Post service', () => {
  beforeEach(async () => {
    await PostService.deletePostByBody(postData.body)
  })
  afterAll(async () => {
    await PostService.deletePostByBody(postData.body)
  })

  test('createPost', async () => {
    const post = await PostService.createPost(postData)
    expect(post.id).toBeDefined()
    expect(post.body).toBe(postData.body)
  })
  test('updateDoctor', async () => {
    const post = await PostService.createPost(postData)
    const id = post.id
    const newBody = 'New body'
    const savePost = await PostService.updatePost(id, { body: newBody })
    expect(savePost.id).toBeDefined()
    expect(savePost.body).toBe(newBody)
    await PostService.deletePost(id)
  })
  test('getOne', async () => {
    const post = await PostService.createPost(postData)
    const id = post.id
    const savePost = await PostService.getOnePost(id)
    expect(savePost.id).toBeDefined()
    expect(savePost.body).toBe(postData.body)
  })
  test('getAll', async () => {
    const posts = await PostService.getAllPosts()
    expect.arrayContaining(posts.rows)
  })
  test('delete', async () => {
    const post = await PostService.createPost(postData)
    const id = post.id
    const deletedDoc = await PostService.deletePost(id)
    expect(deletedDoc).toBe(1)
  })
})
