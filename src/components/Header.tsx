import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm p-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-800">My cool board</h1>
      </div>
    </header>
  );
};

export default Header;
