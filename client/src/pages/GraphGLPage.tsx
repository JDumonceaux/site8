import { useEffect, useState } from 'react';

import { CreateTodoInput, Todo } from 'API';
import { generateClient } from 'aws-amplify/api';
import { createTodo } from 'graphql/mutations';
import { listTodos } from 'graphql/queries';

const initialState: CreateTodoInput = { name: '', description: '' };
const client = generateClient();

const GraphGLPage = () => {
  const [formState, setFormState] = useState<CreateTodoInput>(initialState);
  const [todos, setTodos] = useState<Todo[] | CreateTodoInput[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todoData = await client.graphql({
        query: listTodos,
      });
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  };

  const addTodo = async () => {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await client.graphql({
        query: createTodo,
        variables: {
          input: todo,
        },
      });
    } catch (err) {
      console.log('error creating todo:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) =>
          setFormState({ ...formState, name: event.target.value })
        }
        placeholder="Name"
        style={styles.input}
        value={formState.name}
      />
      <input
        onChange={(event) =>
          setFormState({ ...formState, description: event.target.value })
        }
        placeholder="Description"
        style={styles.input}
        value={formState.description as string}
      />
      <button onClick={addTodo} style={styles.button} type="button">
        Create Todo
      </button>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
  },
} as const;

export default GraphGLPage;
