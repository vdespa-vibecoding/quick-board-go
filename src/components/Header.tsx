
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-xl text-gray-800">Kanban Board</h1>
          <div className="hidden md:flex gap-2">
            <button className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
              Board
            </button>
            <button className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md text-sm">
              Timeline
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
            New Task
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
