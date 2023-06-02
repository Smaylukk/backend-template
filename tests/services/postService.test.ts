import sequelize from '../../src/services/db'
import TodoService from '../../src/services/todoService'
import { TodoDTO } from '../../src/models/dto/TodoDTO'

let todoData = new TodoDTO({
  title: 'tests todo',
  userId: 1,
})

beforeAll(async () => {
  await sequelize.authenticate()
  await sequelize.sync({ logging: false })
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test Todo service', () => {
  test('create todo', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    const todoId = todo.id
    expect(todo.id).toBeDefined()
    expect(todo.title).toBe(todoData.title)

    await TodoService.deleteTodo(todoData.userId, todoId)
  })
  test('update todo', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    const todoId = todo.id
    const newTitle = 'New title'
    const saveTodo = await TodoService.updateTodo(todoData.userId, todoId, { title: newTitle })
    expect(saveTodo.id).toBeDefined()
    expect(saveTodo.title).toBe(newTitle)

    await TodoService.deleteTodo(todoData.userId, todoId)
  })
  test('getOne', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    const todoId = todo.id
    const saveTodo = await TodoService.getOneTodo(todoData.userId, todoId)
    expect(saveTodo.id).toBeDefined()
    expect(saveTodo.title).toBe(todoData.title)

    await TodoService.deleteTodo(todoData.userId, todoId)
  })
  test('getAll', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    const todoId = todo.id
    const todos = await TodoService.getAllTodos(todoData.userId)
    expect.arrayContaining(todos)

    await TodoService.deleteTodo(todoData.userId, todoId)
  })
  test('delete', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    const todoId = todo.id
    const deletedTodo = await TodoService.deleteTodo(todoData.userId, todoId)
    expect(deletedTodo).toBe(1)
  })
})
