
import React from "react";
import { Column as ColumnType } from "../types/kanban";
import Card from "./Card";

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div className="bg-kanban-column rounded-md w-72 flex-shrink-0 flex flex-col">
      <div className="bg-kanban-columnHeader p-3 rounded-t-md border-b border-gray-300">
        <h2 className="font-semibold text-gray-700 flex items-center">
          {column.title}
          <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </h2>
      </div>
      <div className="p-2 flex-grow overflow-y-auto max-h-[calc(100vh-180px)]">
        {column.tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
      <div className="p-2 border-t border-gray-200">
        <button className="w-full text-left text-gray-500 text-sm py-1 px-2 hover:bg-gray-100 rounded-md transition-colors">
          + Add a card
        </button>
      </div>
    </div>
  );
};

export default Column;
