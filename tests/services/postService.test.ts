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
  beforeEach(async () => {
    await TodoService.deleteTodoByTitle(todoData.title)
  })
  afterAll(async () => {
    await TodoService.deleteTodoByTitle(todoData.title)
  })

  test('create todo', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    expect(todo.id).toBeDefined()
    expect(todo.title).toBe(todoData.title)
  })
  test('update todo', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    const id = todo.id
    const newTitle = 'New title'
    const saveTodo = await TodoService.updateTodo(todoData.userId, id, { title: newTitle })
    expect(saveTodo.id).toBeDefined()
    expect(saveTodo.title).toBe(newTitle)
    await TodoService.deleteTodo(todoData.userId, id)
  })
  test('getOne', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    const id = todo.id
    const saveTodo = await TodoService.getOneTodo(todoData.userId, id)
    expect(saveTodo.id).toBeDefined()
    expect(saveTodo.title).toBe(todoData.title)
  })
  test('getAll', async () => {
    const todos = await TodoService.getAllTodos(todoData.userId)
    expect.arrayContaining(todos.rows)
  })
  test('delete', async () => {
    const todo = await TodoService.createTodo(todoData.userId, todoData)
    const id = todo.id
    const deletedTodo = await TodoService.deleteTodo(todoData.userId, id)
    expect(deletedTodo).toBe(1)
  })
})
