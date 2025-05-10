
import React from "react";
import { Task } from "../types/kanban";

interface CardProps {
  task: Task;
}

const Card: React.FC<CardProps> = ({ task }) => {
  return (
    <div className="bg-white p-3 mb-2 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="font-medium text-gray-800">{task.title}</h3>
    </div>
  );
};

export default Card;
