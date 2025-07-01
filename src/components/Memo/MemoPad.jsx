import React, { useState } from 'react';

const initialMemos = [
  { id: 1, content: ' ♡̷̷̷  오늘의 생각  ', x: 20, y: 20 },
  { id: 2, content: ' ✰ 중요한 일 ✰ ', x: 160, y: 80 }
];

const MemoPad = () => {
  const [memos, setMemos] = useState(initialMemos);
  const [deletedMemos, setDeletedMemos] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showTrash, setShowTrash] = useState(false);

  const handleMouseDown = (e, id) => {
    setMemos(prev => {
      const memoToMove = prev.find(m => m.id === id);
      const others = prev.filter(m => m.id !== id);
      return [...others, memoToMove];
    });

    const rect = e.currentTarget.getBoundingClientRect();

    setDraggingId(id);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (draggingId === null) return;

    const parent = document.getElementById('memo-area');
    if (!parent) return;

    const bounds = parent.getBoundingClientRect();

    const newX = e.clientX - bounds.left - offset.x;
    const newY = e.clientY - bounds.top - offset.y;

    setMemos(prev =>
      prev.map(memo =>
        memo.id === draggingId
          ? {
              ...memo,
              x: Math.max(0, Math.min(bounds.width - 200, newX)),
              y: Math.max(0, Math.min(bounds.height - 200, newY))
            }
          : memo
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const addMemo = () => {
    const newId = Date.now();
    setMemos(prev => [
      ...prev,
      { id: newId, content: 'new..', x: 30, y: 30 }
    ]);
  };

  const deleteMemo = (id) => {
    setMemos(prevMemos => {
      const memoToDelete = prevMemos.find(m => m.id === id);
      if (!memoToDelete) return prevMemos;

      setDeletedMemos(prevDeleted => {
        if (!prevDeleted.some(memo => memo.id === id)) {
          return [...prevDeleted, memoToDelete];
        }
        return prevDeleted;
      });

      return prevMemos.filter(m => m.id !== id);
    });
  };

  const restoreMemo = (id) => {
    setDeletedMemos(prevDeleted => {
      const memoToRestore = prevDeleted.find(m => m.id === id);
      if (!memoToRestore) return prevDeleted;

      setMemos(prevMemos => {
        if (prevMemos.some(m => m.id === id)) return prevMemos;
        return [...prevMemos, memoToRestore];
      });

      return prevDeleted.filter(m => m.id !== id);
    });
  };

  const permanentlyDelete = (id) => {
    setDeletedMemos(prev => prev.filter(m => m.id !== id));
  };

  const emptyTrash = () => {
    setDeletedMemos([]);
    setShowTrash(false);
  };

  return (
    <div
      id="memo-area"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
        padding: 0,
        overflow: 'visible',
        marginTop: 0,
        userSelect: 'none',
      }}
    >
      {/* 메모 추가 버튼 */}
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={addMemo}
          style={{
            padding: '6px 12px',
            backgroundColor: '#548b6e',
            border: 'none',
            borderRadius: 6,
            color: 'white',
            cursor: 'pointer',
            userSelect: 'auto',
          }}
        >
          !! new Memo ˖◛⁺˖
        </button>
      </div>

      {/* 메모들 */}
      {memos.map((memo, index) => (
        <div
          key={memo.id}
          onMouseDown={(e) => handleMouseDown(e, memo.id)}
          style={{
            position: 'absolute',
            left: memo.x,
            top: memo.y,
            width: 200,
            height: 200,
            backgroundColor: '#fff9a5',
            border: '1px solid #e0d98a',
            borderRadius: 8,
            boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
            cursor: draggingId === memo.id ? 'grabbing' : 'grab',
            padding: 8,
            fontSize: '0.85rem',
            fontFamily: 'Nanum Pen Script, sans-serif',
            color: '#333',
            userSelect: draggingId === memo.id ? 'none' : 'text',
            display: 'flex',
            flexDirection: 'column',
            zIndex: index + 1,
          }}
        >
          {/* 삭제 버튼: 동그라미 없이 × 문자만 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteMemo(memo.id);
            }}
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 20,
              height: 20,
              background: 'transparent',
              border: 'none',
              color: '#aaa',
              fontWeight: 'bold',
              cursor: 'pointer',
              lineHeight: '20px',
              textAlign: 'center',
              padding: 0,
              userSelect: 'none',
              fontSize: '18px',
              fontFamily: 'Arial, sans-serif',
              zIndex: 20,
            }}
            title="메모 삭제"
          >
            ×
          </button>

          <div
            style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 12,
              height: 12,
              backgroundColor: '#548b6e',
              borderRadius: '50%',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          ></div>

          {/* 메모 내용 */}
          <div
            contentEditable
            suppressContentEditableWarning={true}
            style={{
              flex: 1,
              marginTop: 30,
              overflow: 'auto',
              outline: 'none',
              userSelect: 'text',
              cursor: 'text',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
            onBlur={(e) => {
              const newText = e.currentTarget.textContent;
              setMemos(prev =>
                prev.map(m =>
                  m.id === memo.id ? { ...m, content: newText } : m
                )
              );
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {memo.content}
          </div>
        </div>
      ))}

      {/* 휴지통 버튼 - 전체 박스 좌측 하단 고정 */}
      <button
        onClick={() => setShowTrash(!showTrash)}
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          padding: '6px 12px',
          backgroundColor: '#548b6e',
          border: 'none',
          borderRadius: 6,
          color: 'white',
          cursor: 'pointer',

          userSelect: 'auto',
          zIndex: 100,
        }}
        title="휴지통 열기/닫기"
      >
        ☁︎︎*. ({deletedMemos.length})
      </button>

      {/* 휴지통 모달 */}
      {showTrash && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 50,
            left: 10,
            width: 220,
            maxHeight: 180,
            overflowY: 'auto',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: 6,
            boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
            zIndex: 110,
            padding: 10,
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
            삭제된 메모
            <button
              onClick={emptyTrash}
              style={{
                float: 'right',
                fontSize: 10,
                cursor: 'pointer',
                background: '#95c491',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '2px 6px',
              }}
              title="휴지통 비우기"
            >
              비우기
            </button>
          </div>
          {deletedMemos.length === 0 && <div>휴지통이 비었습니다.</div>}
          {deletedMemos.map((delMemo) => (
            <div
              key={delMemo.id}
              style={{
                marginBottom: 6,
                borderBottom: '1px solid #eee',
                paddingBottom: 4,
                fontSize: 13,
                wordBreak: 'break-word',
              }}
            >
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '140px',
                }}
                title={delMemo.content}
              >
                {delMemo.content}
              </div>
              <button
                onClick={() => restoreMemo(delMemo.id)}
                style={{
                  fontSize: 11,
                  marginRight: 6,
                  cursor: 'pointer',
                }}
                title="복구"
              >
                복구
              </button>
              <button
                onClick={() => permanentlyDelete(delMemo.id)}
                style={{
                  fontSize: 11,
                  cursor: 'pointer',
                  color: '#f44336',
                }}
                title="완전 삭제"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoPad;
