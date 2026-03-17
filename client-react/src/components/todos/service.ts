import { getApiClient, hasRemoteApi } from "@/lib/api"
import type { Todo } from "./types"

const LS_KEY = "todos_data_v1"

function readLocal(): Todo[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(LS_KEY)
  try {
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}
function writeLocal(data: Todo[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

export async function listTodos(): Promise<Todo[]> {
  if (hasRemoteApi()) {
    const api = getApiClient()
    const { data } = await api.get("/api/v1/todo")
    return data as Todo[]
  }
  return readLocal()
}

export async function createTodo(input: Pick<Todo, "title"> & Partial<Todo>): Promise<Todo> {
  if (hasRemoteApi()) {
    const api = getApiClient()
    const { data } = await api.post("/api/v1/todo", {
      title: input.title,
      completed: !!input.completed
    })
    return data as Todo
  }
  const curr = readLocal()
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: input.title,
    completed: !!input.completed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const next = [newTodo, ...curr]
  writeLocal(next)
  return newTodo
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  if (hasRemoteApi()) {
    const api = getApiClient()
    const { data } = await api.put("/api/v1/todo", {
      ...todo,
      id: typeof todo.id === "string" ? parseInt(todo.id) : todo.id
    })
    return data as Todo
  }
  const list = readLocal()
  const idx = list.findIndex((t) => t.id === todo.id)
  if (idx !== -1) {
    list[idx] = { ...todo, updatedAt: new Date().toISOString() }
    writeLocal(list)
  }
  return todo
}

export async function deleteTodo(id: string | number): Promise<void> {
  if (hasRemoteApi()) {
    const api = getApiClient()
    await api.delete("/api/v1/todo", {
      data: { id: typeof id === "string" ? parseInt(id) : id }
    })
    return
  }
  const list = readLocal().filter((t) => t.id !== id)
  writeLocal(list)
}
