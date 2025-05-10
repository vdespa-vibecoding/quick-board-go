
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-gray-800">Kanban Board</h1>
      </div>
    </header>
  );
};

export default Header;
