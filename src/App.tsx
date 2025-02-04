import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ event</button>
      <ul>
        {todos.map(todo => <li 
        
          onClick={() => deleteTodo(todo.id)}
          key={todo.id}>
            {todo.content}
        </li>)}
      </ul>
      <div>
        🥳 Use this doc to choose your nationals events: 
        <a href="https://docs.google.com/document/d/11g-V50oBkDWGl0DcCVbD5Pf6VAJgL_kqvZ0JlVRiR6I/edit?usp=sharing"> doc here
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  )
}

export default App;
