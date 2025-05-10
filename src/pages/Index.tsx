
import React from "react";
import Board from "../components/Board";
import Header from "../components/Header";
import { useBoard } from "../hooks/useBoard";

const Index: React.FC = () => {
  const { 
    board, 
    isLoading, 
    error,
    addColumn,
    editColumnTitle,
    removeColumn,
    addTask,
    editTaskTitle,
    removeTask,
    moveTask,
    moveColumn
  } = useBoard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading board data...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-lg text-red-600">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow overflow-hidden">
        <Board 
          board={board}
          onAddColumn={addColumn}
          onEditColumnTitle={editColumnTitle}
          onRemoveColumn={removeColumn}
          onAddTask={addTask}
          onEditTaskTitle={editTaskTitle}
          onRemoveTask={removeTask}
          onMoveTask={moveTask}
          onMoveColumn={moveColumn}
        />
      </main>
    </div>
  );
};

export default Index;
