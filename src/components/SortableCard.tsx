
import React from "react";
import { Task } from "../types/kanban";
import Card from "./Card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableCardProps {
  task: Task;
  onEditTitle: (taskId: string, title: string) => Promise<void>;
  onRemove: (taskId: string) => Promise<void>;
  columnId: string;
}

const SortableCard: React.FC<SortableCardProps> = ({ task, onEditTitle, onRemove, columnId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
      columnId
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none cursor-grab"
    >
      <Card
        task={task}
        onEditTitle={onEditTitle}
        onRemove={onRemove}
      />
    </div>
  );
};

export default SortableCard;
