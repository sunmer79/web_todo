import { useState } from 'react';
import TodoList from './TodoList';

export default function TodoSection({ selectedDate, todosByDate, getDateKey, addTodo, deleteTodo, toggleDone }) {
  const [newTodo, setNewTodo] = useState('');
  const currentTodos = todosByDate[getDateKey(selectedDate)] || [];

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    addTodo(newTodo);
    setNewTodo('');
  };

  return (
    <div style={{
      backgroundColor: '#a7d7a7',
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `
        radial-gradient(rgba(255,255,255,0.3) 8%, transparent 9%),
        radial-gradient(rgba(255,255,255,0.3) 8%, transparent 9%)`,
      backgroundSize: '25px 25px',
      backgroundPosition: '0 0, 12.5px 12.5px',
      height: '100%',
    }}>
      <h1 style={{
        fontSize: '2rem',
        color: '#1f2937',
        fontWeight: 'bold',
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        To <span style={{ color: '#4f76ff' }}>Do</span> list!!
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '10px', color: '#666' }}>
        <strong>{getDateKey(selectedDate)}</strong>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="할 일을 입력하세요 ~"
          style={{ flex: 1, padding: '6px', fontSize: '1rem' }}
          onKeyDown={e => { if (e.key === 'Enter') handleAddTodo(); }}
        />
        <button onClick={handleAddTodo} style={{ padding: '5px 10px' }}>추가</button>
      </div>

      <div style={{ overflowY: 'auto', flex: 1 }}>
        <TodoList
          todos={currentTodos}
          onDelete={deleteTodo}
          onToggle={toggleDone}
        />
      </div>
    </div>
  );
}
