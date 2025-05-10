
import React from "react";
import { Board as BoardType } from "../types/kanban";
import Column from "./Column";

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-64px)]">
      {board.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <div className="w-72 flex-shrink-0">
        <button className="bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-md text-gray-700 w-full text-left">
          + Add another column
        </button>
      </div>
    </div>
  );
};

export default Board;
