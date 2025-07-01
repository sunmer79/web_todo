const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-item-content">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className="todo-text"
          style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
        >
          {todo.text}
        </span>
      </div>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </div>
  );
};

export default TodoItem;
