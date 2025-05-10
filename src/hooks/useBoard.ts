
import { useState, useEffect } from "react";
import { Board, Column, Task } from "../types/kanban";
import { 
  fetchBoard, 
  createColumn, 
  updateColumn, 
  deleteColumn, 
  createTask, 
  updateTask, 
  deleteTask, 
  updateTaskPosition,
  updateColumnOrder
} from "../api/kanbanApi";
import { toast } from "sonner";

export const useBoard = () => {
  const [board, setBoard] = useState<Board>({ columns: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial board data
  useEffect(() => {
    const loadBoard = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBoard();
        setBoard(data);
        setError(null);
      } catch (err) {
        setError("Failed to load board data");
        toast.error("Failed to load board data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBoard();
  }, []);

  // Add a new column
  const addColumn = async (title: string) => {
    try {
      const newOrder = board.columns.length;
      const newColumn = await createColumn(title, newOrder);
      
      setBoard(prev => ({
        ...prev,
        columns: [...prev.columns, newColumn]
      }));
      
      toast.success("Column added");
    } catch (err) {
      toast.error("Failed to add column");
      console.error(err);
    }
  };

  // Update column title
  const editColumnTitle = async (columnId: string, newTitle: string) => {
    try {
      await updateColumn(columnId, newTitle);
      
      setBoard(prev => ({
        ...prev,
        columns: prev.columns.map(col => 
          col.id === columnId ? { ...col, title: newTitle } : col
        )
      }));
    } catch (err) {
      toast.error("Failed to update column");
      console.error(err);
    }
  };

  // Delete a column
  const removeColumn = async (columnId: string) => {
    try {
      await deleteColumn(columnId);
      
      setBoard(prev => ({
        ...prev,
        columns: prev.columns.filter(col => col.id !== columnId)
      }));
      
      toast.success("Column deleted");
    } catch (err) {
      toast.error("Failed to delete column");
      console.error(err);
    }
  };

  // Add a task to a column
  const addTask = async (columnId: string, title: string) => {
    try {
      const column = board.columns.find(col => col.id === columnId);
      if (!column) return;
      
      const newOrder = column.tasks.length;
      const newTask = await createTask(columnId, title, newOrder);
      
      setBoard(prev => ({
        ...prev,
        columns: prev.columns.map(col => {
          if (col.id === columnId) {
            return {
              ...col,
              tasks: [...col.tasks, newTask]
            };
          }
          return col;
        })
      }));
    } catch (err) {
      toast.error("Failed to add task");
      console.error(err);
    }
  };

  // Update task title
  const editTaskTitle = async (taskId: string, newTitle: string) => {
    try {
      await updateTask(taskId, newTitle);
      
      setBoard(prev => ({
        ...prev,
        columns: prev.columns.map(col => ({
          ...col,
          tasks: col.tasks.map(task => 
            task.id === taskId ? { ...task, title: newTitle } : task
          )
        }))
      }));
    } catch (err) {
      toast.error("Failed to update task");
      console.error(err);
    }
  };

  // Delete a task
  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      
      setBoard(prev => ({
        ...prev,
        columns: prev.columns.map(col => ({
          ...col,
          tasks: col.tasks.filter(task => task.id !== taskId)
        }))
      }));
    } catch (err) {
      toast.error("Failed to delete task");
      console.error(err);
    }
  };

  // Move a task between columns or reorder within a column
  const moveTask = async (taskId: string, sourceColId: string, destColId: string, newIndex: number) => {
    try {
      const sourceColumn = board.columns.find(col => col.id === sourceColId);
      const destColumn = board.columns.find(col => col.id === destColId);
      
      if (!sourceColumn || !destColumn) return;
      
      const taskToMove = sourceColumn.tasks.find(task => task.id === taskId);
      if (!taskToMove) return;
      
      // Update the task position in the database
      await updateTaskPosition(taskId, destColId, newIndex);
      
      // Update local state
      setBoard(prev => {
        const newColumns = prev.columns.map(col => {
          // Remove task from source column
          if (col.id === sourceColId) {
            return {
              ...col,
              tasks: col.tasks.filter(task => task.id !== taskId)
            };
          }
          
          // Add task to destination column
          if (col.id === destColId) {
            const newTasks = [...col.tasks];
            
            // Insert task at new position
            newTasks.splice(newIndex, 0, {
              ...taskToMove,
              column_id: destColId
            });
            
            // Update order for all tasks in the destination column
            const updatedTasks = newTasks.map((task, index) => ({
              ...task,
              order: index
            }));
            
            return {
              ...col,
              tasks: updatedTasks
            };
          }
          
          return col;
        });
        
        return {
          ...prev,
          columns: newColumns
        };
      });
    } catch (err) {
      toast.error("Failed to move task");
      console.error(err);
    }
  };

  // Reorder columns
  const moveColumn = async (columnId: string, newIndex: number) => {
    try {
      await updateColumnOrder(columnId, newIndex);
      
      setBoard(prev => {
        const columnToMove = prev.columns.find(col => col.id === columnId);
        if (!columnToMove) return prev;
        
        const newColumns = prev.columns.filter(col => col.id !== columnId);
        newColumns.splice(newIndex, 0, columnToMove);
        
        // Update order for all columns
        const updatedColumns = newColumns.map((col, index) => ({
          ...col,
          order: index
        }));
        
        return {
          ...prev,
          columns: updatedColumns
        };
      });
    } catch (err) {
      toast.error("Failed to reorder columns");
      console.error(err);
    }
  };

  return {
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
  };
};
