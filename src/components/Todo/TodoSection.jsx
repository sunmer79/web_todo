import React, { useState } from 'react';
import TodoList from './TodoList';
import '../../styles/TodoSection.css';

const TodoSection = ({ selectedDate, todosByDate, getDateKey, addTodo, deleteTodo, toggleDone }) => {
  const [newTodo, setNewTodo] = useState('');
  const currentTodos = todosByDate[getDateKey(selectedDate)] || [];

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    addTodo(newTodo);
    setNewTodo('');
  };

  return (
    <>
      <h1 className="section-title">
        To <span className="highlight">Do</span> list - !!
      </h1>

      <div className="date-display">{getDateKey(selectedDate)}</div>

      <div className="todo-input-wrapper">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="할 일을 입력하세요 ~"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddTodo();
          }}
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>

      <div className="todo-list-wrapper">
        <TodoList todos={currentTodos} onDelete={deleteTodo} onToggle={toggleDone} />
      </div>
    </>
  );
};

export default TodoSection;
