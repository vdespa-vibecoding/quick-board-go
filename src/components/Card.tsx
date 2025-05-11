import React, { useState } from "react";
import { Task } from "../types/kanban";

interface CardProps {
  task: Task;
  onEditTitle: (taskId: string, title: string) => Promise<void>;
  onRemove: (taskId: string) => Promise<void>;
}

const Card: React.FC<CardProps> = ({ task, onEditTitle, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEditSave = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onEditTitle(task.id, editedTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      onRemove(task.id);
    }
  };

  return (
    <div className="bg-white p-3 mb-2 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {isEditing ? (
        <input
          type="text"
          className="w-full border border-gray-300 p-1 rounded"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="flex justify-between">
          <h3 
            className="font-medium text-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            {task.title}
          </h3>
          <button 
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-600 ml-2"
            title="Delete task"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
