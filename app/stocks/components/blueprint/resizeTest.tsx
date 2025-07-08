import React, { useState, useRef } from 'react';

const ResizableBox = () => {
  const [size, setSize] = useState({ width: 300, height: 200 });
  const boxRef = useRef(null);
  const isResizing = useRef(false);

  const startResize = (e) => {
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  const handleResize = (e) => {
    if (isResizing.current) {
      setSize(prevSize => ({
            width: e.clientX - boxRef.current.getBoundingClientRect().left,
            height: e.clientY - boxRef.current.getBoundingClientRect().top
      }));
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  return (
    <div
      ref={boxRef}
      style={{
        width: size.width,
        height: size.height,
        background: '#ddd',
        position: 'relative',
        border: '1px solid #999',
      }}
    >
      <div
        onMouseDown={startResize}
        style={{
          width: 10,
          height: 10,
          background: '#333',
          position: 'absolute',
          right: 0,
          bottom: 0,
          cursor: 'se-resize',
        }}
      />
    </div>
  );
};

export default ResizableBox;
