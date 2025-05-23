
import React from "react";
import { Board as BoardType } from "../types/kanban";
import Column from "./Column";
import { 
  DndContext, 
  DragOverlay, 
  DragStartEvent, 
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragOverEvent
} from "@dnd-kit/core";
import { 
  SortableContext, 
  horizontalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import Card from "./Card";
import SortableColumn from "./SortableColumn";

interface BoardProps {
  board: BoardType;
  onAddColumn: (title: string) => Promise<void>;
  onEditColumnTitle: (columnId: string, title: string) => Promise<void>;
  onRemoveColumn: (columnId: string) => Promise<void>;
  onAddTask: (columnId: string, title: string) => Promise<void>;
  onEditTaskTitle: (taskId: string, title: string) => Promise<void>;
  onRemoveTask: (taskId: string) => Promise<void>;
  onMoveTask: (taskId: string, sourceColId: string, destColId: string, newIndex: number) => Promise<void>;
  onMoveColumn: (columnId: string, newIndex: number) => Promise<void>;
}

const Board: React.FC<BoardProps> = ({ 
  board,
  onAddColumn,
  onEditColumnTitle,
  onRemoveColumn,
  onAddTask,
  onEditTaskTitle,
  onRemoveTask,
  onMoveTask,
  onMoveColumn
}) => {
  const [newColumnTitle, setNewColumnTitle] = React.useState("");
  const [isAddingColumn, setIsAddingColumn] = React.useState(false);
  const [activeTaskId, setActiveTaskId] = React.useState<UniqueIdentifier | null>(null);
  const [activeColumnId, setActiveColumnId] = React.useState<UniqueIdentifier | null>(null);
  
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      onAddColumn(newColumnTitle.trim());
      setNewColumnTitle("");
      setIsAddingColumn(false);
    }
  };

  const getActiveTask = () => {
    if (!activeTaskId) return null;
    
    for (const column of board.columns) {
      const task = column.tasks.find(task => task.id === activeTaskId);
      if (task) return task;
    }
    return null;
  };

  const getActiveColumn = () => {
    if (!activeColumnId) return null;
    return board.columns.find(column => column.id === activeColumnId) || null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    
    if (active.data.current?.type === 'task') {
      setActiveTaskId(active.id);
    } else if (active.data.current?.type === 'column') {
      setActiveColumnId(active.id);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    // Handle moving a task
    if (active.data.current?.type === 'task' && over.data.current?.type === 'column') {
      const taskId = active.id as string;
      const sourceColId = active.data.current.columnId as string;
      const destColId = over.id as string;
      
      if (sourceColId !== destColId) {
        // Get the destination column
        const destColumn = board.columns.find(col => col.id === destColId);
        
        if (destColumn) {
          // Move to a new column at the end
          onMoveTask(taskId, sourceColId, destColId, destColumn.tasks.length);
        }
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTaskId(null);
      setActiveColumnId(null);
      return;
    }

    // Handle moving a task
    if (active.data.current?.type === 'task' && over.data.current?.type === 'column') {
      const taskId = active.id as string;
      const sourceColId = active.data.current.columnId as string;
      const destColId = over.id as string;
      
      // Get the source column
      const sourceColumn = board.columns.find(col => col.id === sourceColId);
      
      if (sourceColId !== destColId && sourceColumn) {
        // Move to a new column at the end
        onMoveTask(taskId, sourceColId, destColId, 0);
      }
    }
    
    // Handle reordering columns
    if (
      active.data.current?.type === 'column' &&
      over.data.current?.type === 'column' &&
      active.id !== over.id
    ) {
      const activeColumnIndex = board.columns.findIndex(col => col.id === active.id);
      const overColumnIndex = board.columns.findIndex(col => col.id === over.id);
      
      if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
        onMoveColumn(active.id as string, overColumnIndex);
      }
    }
    
    setActiveTaskId(null);
    setActiveColumnId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-64px)]">
        <SortableContext 
          items={board.columns.map(column => column.id)}
          strategy={horizontalListSortingStrategy}
        >
          {board.columns.map((column) => (
            <SortableColumn
              key={column.id}
              column={column}
              onEditTitle={onEditColumnTitle}
              onRemove={onRemoveColumn}
              onAddTask={onAddTask}
              onEditTaskTitle={onEditTaskTitle}
              onRemoveTask={onRemoveTask}
              onMoveTask={onMoveTask}
            />
          ))}
        </SortableContext>
        
        <div className="w-72 flex-shrink-0">
          {isAddingColumn ? (
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200">
              <input
                type="text"
                className="w-full border border-gray-300 p-2 mb-2 rounded"
                placeholder="Enter column title"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={handleAddColumn}
                >
                  Add
                </button>
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => setIsAddingColumn(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-md text-gray-700 w-full text-left"
              onClick={() => setIsAddingColumn(true)}
            >
              + Add another column
            </button>
          )}
        </div>

        <DragOverlay>
          {activeTaskId ? (
            <div className="opacity-80">
              <Card 
                task={getActiveTask() || { id: '', title: '', column_id: '', order: 0 }}
                onEditTitle={onEditTaskTitle}
                onRemove={onRemoveTask}
              />
            </div>
          ) : null}
          {activeColumnId ? (
            <div className="opacity-80">
              <Column
                column={getActiveColumn() || { id: '', title: '', order: 0, tasks: [] }}
                onEditTitle={onEditColumnTitle}
                onRemove={onRemoveColumn}
                onAddTask={onAddTask}
                onEditTaskTitle={onEditTaskTitle}
                onRemoveTask={onRemoveTask}
                onMoveTask={onMoveTask}
              />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Board;
