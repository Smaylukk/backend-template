import TodoService from '../../src/services/todoService'
import { TodoDTO } from '../../src/models/dto/TodoDTO'
import { connectDb, disconnectDb } from '../../src/services/dbConnector'
import { UserDTO } from '../../src/models/dto/UserDTO'
import UserService from '../../src/repositories/userRepository'

let todoData = new TodoDTO({
  title: 'tests todo',
  complete: false,
})
let userId = ''

beforeAll(async () => {
  await connectDb(true)
  let userData = new UserDTO({
    email: 'userTodo@tests.org',
    name: 'test todo user',
    password: 'test',
  })
  const user = await UserService.createUser(userData)
  userId = user.id
})

afterAll(async () => {
  await UserService.deleteUser(userId)
  await disconnectDb()
})

describe('Test Todo service', () => {
  test('create todo', async () => {
    const todo = await TodoService.createTodo(userId, todoData)
    const todoId = todo.id
    expect(todo.id).toBeDefined()
    expect(todo.title).toBe(todoData.title)

    await TodoService.deleteTodo(userId, todoId)
  })
  test('update todo', async () => {
    const todo = await TodoService.createTodo(userId, todoData)
    const todoId = todo.id
    const newTitle = 'New title'
    const saveTodo = await TodoService.updateTodo(userId, todoId, {
      title: newTitle,
    })
    expect(saveTodo.id).toBeDefined()
    expect(saveTodo.title).toBe(newTitle)

    await TodoService.deleteTodo(userId, todoId)
  })
  test('getOne', async () => {
    const todo = await TodoService.createTodo(userId, todoData)
    const todoId = todo.id
    const saveTodo = await TodoService.getOneTodo(userId, todoId)
    expect(saveTodo.id).toBeDefined()
    expect(saveTodo.title).toBe(todoData.title)

    await TodoService.deleteTodo(userId, todoId)
  })
  test('getAll', async () => {
    const todo = await TodoService.createTodo(userId, todoData)
    const todoId = todo.id
    const todos = await TodoService.getAllTodos(userId)
    expect.arrayContaining(todos)

    await TodoService.deleteTodo(userId, todoId)
  })
  test('delete', async () => {
    const todo = await TodoService.createTodo(userId, todoData)
    const todoId = todo.id
    const deletedTodo = await TodoService.deleteTodo(userId, todoId)
    expect(deletedTodo.id).toBe(todoId)
  })
})
