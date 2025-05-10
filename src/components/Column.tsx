
import React, { useState } from "react";
import { Column as ColumnType } from "../types/kanban";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableCard from "./SortableCard";

interface ColumnProps {
  column: ColumnType;
  onEditTitle: (columnId: string, title: string) => Promise<void>;
  onRemove: (columnId: string) => Promise<void>;
  onAddTask: (columnId: string, title: string) => Promise<void>;
  onEditTaskTitle: (taskId: string, title: string) => Promise<void>;
  onRemoveTask: (taskId: string) => Promise<void>;
  onMoveTask: (taskId: string, sourceColId: string, destColId: string, newIndex: number) => Promise<void>;
}

const Column: React.FC<ColumnProps> = ({ 
  column,
  onEditTitle,
  onRemove,
  onAddTask,
  onEditTaskTitle,
  onRemoveTask,
  onMoveTask
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column
    }
  });

  const handleEditSave = () => {
    if (editedTitle.trim() && editedTitle !== column.title) {
      onEditTitle(column.id, editedTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      setEditedTitle(column.title);
      setIsEditing(false);
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(column.id, newTaskTitle);
      setNewTaskTitle("");
      setIsAddingTask(false);
    }
  };
  
  const handleDeleteColumn = () => {
    if (window.confirm(`Are you sure you want to delete the column "${column.title}"?`)) {
      onRemove(column.id);
    }
  };

  return (
    <div 
      className="bg-gray-100 rounded-md w-72 flex-shrink-0 flex flex-col"
      ref={setNodeRef}
    >
      <div className="bg-gray-200 p-3 rounded-t-md border-b border-gray-300 flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            className="flex-grow border border-gray-300 p-1 rounded"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div className="flex items-center justify-between w-full">
            <h2 className="font-semibold text-gray-700 flex items-center" onClick={() => setIsEditing(true)}>
              {column.title}
              <span className="ml-2 bg-gray-300 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                {column.tasks.length}
              </span>
            </h2>
            <button 
              onClick={handleDeleteColumn}
              className="text-gray-500 hover:text-red-600"
              title="Delete column"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div className="p-2 flex-grow overflow-y-auto max-h-[calc(100vh-180px)]">
        <SortableContext 
          items={column.tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <SortableCard
              key={task.id}
              task={task}
              onEditTitle={onEditTaskTitle}
              onRemove={onRemoveTask}
              columnId={column.id}
            />
          ))}
        </SortableContext>
      </div>
      <div className="p-2 border-t border-gray-200">
        {isAddingTask ? (
          <div className="p-2">
            <input
              type="text"
              className="w-full border border-gray-300 p-2 mb-2 rounded"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
                onClick={handleAddTask}
              >
                Add
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors text-sm"
                onClick={() => setIsAddingTask(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button 
            className="w-full text-left text-gray-500 text-sm py-1 px-2 hover:bg-gray-200 rounded-md transition-colors"
            onClick={() => setIsAddingTask(true)}
          >
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default Column;
