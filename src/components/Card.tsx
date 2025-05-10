
import React from "react";
import { Task } from "../types/kanban";

interface CardProps {
  task: Task;
}

const Card: React.FC<CardProps> = ({ task }) => {
  return (
    <div className="bg-white p-3 mb-2 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap gap-1 mb-1">
          {task.tags?.map((tag) => (
            <span 
              key={tag} 
              className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {task.priority && (
          <span 
            className={`text-xs px-2 py-0.5 rounded-full ${
              task.priority === 'high' 
                ? 'bg-red-100 text-red-800' 
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {task.priority}
          </span>
        )}
      </div>
      
      {task.dueDate && (
        <div className="text-xs text-gray-500 mt-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default Card;
