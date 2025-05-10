
import { useState } from "react";
import { Board } from "../types/kanban";
import { initialBoard } from "../utils/mockData";

export const useBoard = () => {
  const [board, setBoard] = useState<Board>(initialBoard);

  // These functions will be implemented later when we add drag and drop
  const moveTask = () => {
    // Will be implemented with dnd-kit
  };

  const moveColumn = () => {
    // Will be implemented with dnd-kit
  };

  return {
    board,
    setBoard,
    moveTask,
    moveColumn,
  };
};
