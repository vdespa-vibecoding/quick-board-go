
import React from "react";
import { Board as BoardType } from "../types/kanban";
import Column from "./Column";

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

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      onAddColumn(newColumnTitle.trim());
      setNewColumnTitle("");
      setIsAddingColumn(false);
    }
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-64px)]">
      {board.columns.map((column) => (
        <Column 
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
    </div>
  );
};

export default Board;
