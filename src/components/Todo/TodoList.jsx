import TodoItem from './TodoItem';

const TodoList = ({ todos = [], onToggle, onDelete }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
export default TodoList;
