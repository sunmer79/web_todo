import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TodoList from './components/Todo/TodoList';
import MemoPad from './components/Memo/MemoPad';
import YouTubePlayer from './components/YouTubePlayer/YouTubePlayer';

function App() {
  const [todosByDate, setTodosByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTodo, setNewTodo] = useState('');

  const [todaySong, setTodaySong] = useState({
    videoId: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio – beats to relax/study to',
  });
  const [inputSongValue, setInputSongValue] = useState('');

  const getDateKey = (date) => date.toISOString().slice(0, 10);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const dateKey = getDateKey(selectedDate);

    setTodosByDate(prev => {
      const todosForDate = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: [...todosForDate, { id: Date.now(), text: newTodo, done: false }]
      };
    });
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    const dateKey = getDateKey(selectedDate);
    setTodosByDate(prev => {
      const todosForDate = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: todosForDate.filter(todo => todo.id !== id)
      };
    });
  };

  const toggleDone = (id) => {
    const dateKey = getDateKey(selectedDate);
    setTodosByDate(prev => {
      const todosForDate = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: todosForDate.map(todo =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      };
    });
  };

  const extractVideoId = (input) => {
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\s]+)/;
    const shortUrlPattern = /(?:https?:\/\/)?youtu\.be\/([^?&\s]+)/;

    if (!input) return '';

    let match = input.match(urlPattern);
    if (match && match[1]) return match[1];

    match = input.match(shortUrlPattern);
    if (match && match[1]) return match[1];

    return input.trim();
  };

  const handleTodaySongChange = () => {
    if (!inputSongValue.trim()) return;

    const videoId = extractVideoId(inputSongValue);
    setTodaySong({
      videoId,
      title: `YouTube Video (${videoId})`
    });
    setInputSongValue('');
  };

  const currentTodos = todosByDate[getDateKey(selectedDate)] || [];
<Calendar
  onChange={setSelectedDate}
  value={selectedDate}
  className="custom-calendar"
/>
  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '30px',
        gap: '40px',
        backgroundColor: '#d1e8d7',
        boxSizing: 'border-box',
      }}>
        {/* 왼쪽 컬럼: 달력 위, 투두 리스트 아래 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '420px' }}>
          {/* 달력: 가운데 정렬 */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',   // 가로 중앙
            alignItems: 'center',       // 세로 중앙
            backgroundColor: '#a7d7a7',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            position: 'relative',
            width: '400px',
            height: '400px',
            overflow: 'hidden',
            minHeight: '400px',
           backgroundImage: `
              radial-gradient(rgba(255,255,255,0.3) 8%, transparent 9%),
              radial-gradient(rgba(255,255,255,0.3) 8%, transparent 9%)`,
            backgroundSize: '25px 25px',
            backgroundPosition: '0 0, 12.5px 12.5px',
          }}>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date, view }) => {
                if (view !== 'month') return null;
                const dateKey = getDateKey(date);
                const todos = todosByDate[dateKey] || [];
                if (todos.length === 0) return null;
                const allDone = todos.every(todo => todo.done);
                return (
                  <div style={{
                    marginTop: '2px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2px'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: allDone ? '#199e45' : '#555'
                    }} />
                  </div>
                );
              }}
              style={{ borderRadius: '15px' }}
            />
          </div>

          {/* 투두 리스트 */}
          <div style={{
            backgroundColor: '#a7d7a7',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '400px',
            backgroundImage: `
              radial-gradient(rgba(255,255,255,0.3) 8%, transparent 9%),
              radial-gradient(rgba(255,255,255,0.3) 8%, transparent 9%)`,
            backgroundSize: '25px 25px',
            backgroundPosition: '0 0, 12.5px 12.5px',
          }}>
            <h1 style={{
              fontSize: '2rem',
              color: '#1f2937',
              fontWeight: 'bold',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              To <span style={{ color: '#2c6748' }}>Do</span> list!!
            </h1>

            <div style={{ textAlign: 'center', marginBottom: '10px', color: '#666' }}>
              <strong></strong>{getDateKey(selectedDate)}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              <input
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                placeholder="할 일을 입력하세요 ~"
                style={{ flex: 1, padding: '6px', fontSize: '1rem' }}
                onKeyDown={e => {
                  if (e.key === 'Enter') addTodo();
                }}
              />
              <button onClick={addTodo} style={{ padding: '5px 10px' }}>추가</button>
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              <TodoList
                todos={currentTodos}
                onDelete={deleteTodo}
                onToggle={toggleDone}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽 컬럼: 노래 위, 메모 아래 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          width: '600px',
          minHeight: '700px',
        }}>
          {/* 오늘의 노래 박스 */}
          <div style={{
            backgroundColor: '#a7d7a7',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            flex: '0 0 300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '400px',
           backgroundImage: `
              radial-gradient(rgba(255,255,255,0.3) 8%, transparent 9%),
              radial-gradient(rgba(255,255,255,0.3) 8%, transparent 9%)`,
            backgroundSize: '25px 25px',
            backgroundPosition: '0 0, 12.5px 12.5px',
          }}>
            <h2 style={{ marginTop: 0, color: '#1f2937', marginBottom: '20px' }}>
              ♫ 오늘의 노래     ⊹ ࣪ ﹏𓊝﹏𓂁﹏⊹ ࣪ ˖
            </h2>

            <div style={{ marginBottom: '15px', width: '100%', textAlign: 'center' }}>
              <input
                type="text"
                placeholder="YouTube 영상 ID 또는 URL을 입력하세요"
                value={inputSongValue}
                onChange={e => setInputSongValue(e.target.value)}
                style={{ width: '80%', padding: '8px', fontSize: '1rem' }}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleTodaySongChange();
                }}
              />
              <button
                onClick={handleTodaySongChange}
                style={{
                  padding: '7px 10px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                  backgroundColor: '#2c6748',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}
              >
                재생
              </button>
            </div>

            <YouTubePlayer videoId={todaySong.videoId} title={todaySong.title} />
          </div>

          {/* 메모패드 박스 */}
          <div style={{
            backgroundColor: '#a7d7a7',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            flex: '1',
            overflowY: 'auto',
            backgroundImage: `
              radial-gradient(rgba(255,255,255,0.3) 6%, transparent 7%),
              radial-gradient(rgba(255,255,255,0.3) 6%, transparent 7%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}>
            <MemoPad />
          </div>
        </div>
      </div>

      {/* CSS 애니메이션 */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
}

export default App;
