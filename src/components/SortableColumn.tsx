
import React from "react";
import { Column } from "../types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ColumnComponent from "./Column";

interface SortableColumnProps {
  column: Column;
  onEditTitle: (columnId: string, title: string) => Promise<void>;
  onRemove: (columnId: string) => Promise<void>;
  onAddTask: (columnId: string, title: string) => Promise<void>;
  onEditTaskTitle: (taskId: string, title: string) => Promise<void>;
  onRemoveTask: (taskId: string) => Promise<void>;
  onMoveTask: (taskId: string, sourceColId: string, destColId: string, newIndex: number) => Promise<void>;
}

const SortableColumn: React.FC<SortableColumnProps> = ({
  column,
  onEditTitle,
  onRemove,
  onAddTask,
  onEditTaskTitle,
  onRemoveTask,
  onMoveTask,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 999 : 'auto'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="touch-none cursor-grab"
    >
      <div {...listeners}>
        <ColumnComponent
          column={column}
          onEditTitle={onEditTitle}
          onRemove={onRemove}
          onAddTask={onAddTask}
          onEditTaskTitle={onEditTaskTitle}
          onRemoveTask={onRemoveTask}
          onMoveTask={onMoveTask}
        />
      </div>
    </div>
  );
};

export default SortableColumn;
