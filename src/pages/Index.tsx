
import React from "react";
import Board from "../components/Board";
import Header from "../components/Header";
import { initialBoard } from "../utils/mockData";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow overflow-hidden">
        <Board board={initialBoard} />
      </main>
    </div>
  );
};

export default Index;
