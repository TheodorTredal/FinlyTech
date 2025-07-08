import React, { useEffect, useState } from 'react';

// wrapper container


interface PositionProps {
    x: number;
    y: number
}

interface DraggableWrapperProps {
    children: React.ReactNode;
    initialPosition?: PositionProps;
    className?: string;
    style?: React.CSSProperties;
    onPositionChange?: (position: PositionProps) => void;
    draggable: boolean;
    gridSize?: number;
    snapToGrid?: boolean;
}

const snapComponentToGrid = (position: PositionProps, gridSize: number) => {
  return {
    x: Math.round(position.x / gridSize) * gridSize, 
    y: Math.round(position.y / gridSize) * gridSize
  }
}

const useDraggable = (
    initialPosition = { x:0, y:0 },
    onPositionChange?: (position: PositionProps) => void,
    gridSize: number = 30,
    snapToGrid: boolean = false
) => {
  
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y:0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    let newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
    }
    
    if (snapToGrid) {
      newPosition = snapComponentToGrid(newPosition, gridSize)
    }

    setPosition(newPosition);
    onPositionChange?.(newPosition);
  }

  
  const handleMouseUp = () => {
    setIsDragging(false);
  }


  useEffect(() => {
    if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    } else {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

  }, [isDragging, dragStart, gridSize, snapToGrid])

    return {
        position,
        isDragging,
        dragHandlers: {
            onMouseDown: handleMouseDown
        }
    };
}


export const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
    children,
    initialPosition,
    className = "",
    style = {},
    onPositionChange,
    draggable = true,
    gridSize = 30,
    snapToGrid = false
  }) => {
    const {position, isDragging, dragHandlers} = useDraggable(
      initialPosition, 
      onPositionChange,
      gridSize,
      snapToGrid      
    )
    
    return (
      <div
        className={`transition-shadow duration-200 ${
          isDragging ? 'shadow-xl z-10' : 'shadow-lg'
        } ${draggable ? 'cursor-move select-none' : ''} ${className}`}
        style={{
          position: 'absolute',
          transform: `translate(${position.x}px, ${position.y}px)`,
          // width: 'max-content',
          ...style
        }}
        {...(draggable ? dragHandlers : {})}
      >
        {children}
      </div>
    );
  };
