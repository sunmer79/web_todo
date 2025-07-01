import { useState } from 'react';
import CalendarBox from './components/Calendar/CalendarBox';
import TodoSection from './components/Todo/TodoSection';
import SongSection from './components/YouTubePlayer/SongSection';
import MemoPad from './components/Memo/MemoPad';
import './styles/App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todosByDate, setTodosByDate] = useState({});
  const [todaySong, setTodaySong] = useState({
    videoId: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio – beats to relax/study to',
  });

  const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const dateKey = getDateKey(selectedDate);

  const addTodo = (text) => {
    setTodosByDate((prev) => {
      const todos = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: [...todos, { id: Date.now(), text, done: false }],
      };
    });
  };

  const toggleDone = (id) => {
    setTodosByDate((prev) => {
      const todos = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      };
    });
  };

  const deleteTodo = (id) => {
    setTodosByDate((prev) => {
      const todos = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: todos.filter((todo) => todo.id !== id),
      };
    });
  };

  const updateSong = (videoId) => {
    setTodaySong({
      videoId,
      title: `YouTube Video (${videoId})`,
    });
  };

  return (
    <div className="app-container">
      {/* 윗줄: 캘린더 + 노래 */}
      <div className="row">
        <div className="calendar-box">
          <CalendarBox
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            todosByDate={todosByDate}
            getDateKey={getDateKey}
          />
        </div>

        <div className="song-section">
          <SongSection todaySong={todaySong} updateSong={updateSong} />
        </div>
      </div>

      {/* 아랫줄: 투두 + 메모 */}
      <div className="row">
        <div className="todo-section">
          <TodoSection
            selectedDate={selectedDate}
            todosByDate={todosByDate}
            getDateKey={getDateKey}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
            toggleDone={toggleDone}
          />
        </div>

        <div className="memo-pad-wrapper">
          <MemoPad />
        </div>
      </div>
    </div>
  );
}

export default App;
