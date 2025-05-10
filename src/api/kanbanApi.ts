
import { supabase } from "@/integrations/supabase/client";
import { Board, Column, Task } from "../types/kanban";

// Fetch all columns with their tasks
export const fetchBoard = async (): Promise<Board> => {
  // Get all columns ordered by their order value
  const { data: columns, error: columnsError } = await supabase
    .from('columns')
    .select('*')
    .order('order');

  if (columnsError) {
    console.error('Error fetching columns:', columnsError);
    throw new Error('Failed to fetch board data');
  }

  // Get all tasks
  const { data: tasks, error: tasksError } = await supabase
    .from('cards')
    .select('*')
    .order('order');

  if (tasksError) {
    console.error('Error fetching tasks:', tasksError);
    throw new Error('Failed to fetch board data');
  }

  // Group tasks by column
  const columnsWithTasks: Column[] = columns.map((column: any) => ({
    id: column.id,
    title: column.title,
    order: column.order,
    tasks: tasks
      .filter((task: any) => task.column_id === column.id)
      .map((task: any) => ({
        id: task.id,
        title: task.title,
        column_id: task.column_id,
        order: task.order,
      })),
  }));

  return { columns: columnsWithTasks };
};

// Create a new column
export const createColumn = async (title: string, order: number): Promise<Column> => {
  const { data, error } = await supabase
    .from('columns')
    .insert({ title, order })
    .select()
    .single();

  if (error) {
    console.error('Error creating column:', error);
    throw new Error('Failed to create column');
  }

  return { ...data, tasks: [] };
};

// Update a column
export const updateColumn = async (id: string, title: string): Promise<void> => {
  const { error } = await supabase
    .from('columns')
    .update({ title })
    .eq('id', id);

  if (error) {
    console.error('Error updating column:', error);
    throw new Error('Failed to update column');
  }
};

// Delete a column
export const deleteColumn = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('columns')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting column:', error);
    throw new Error('Failed to delete column');
  }
};

// Create a new task
export const createTask = async (columnId: string, title: string, order: number): Promise<Task> => {
  const { data, error } = await supabase
    .from('cards')
    .insert({ column_id: columnId, title, order })
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }

  return {
    id: data.id,
    title: data.title,
    column_id: data.column_id,
    order: data.order,
  };
};

// Update a task
export const updateTask = async (id: string, title: string): Promise<void> => {
  const { error } = await supabase
    .from('cards')
    .update({ title })
    .eq('id', id);

  if (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
};

// Update task column and/or order
export const updateTaskPosition = async (id: string, columnId: string, order: number): Promise<void> => {
  const { error } = await supabase
    .from('cards')
    .update({ column_id: columnId, order })
    .eq('id', id);

  if (error) {
    console.error('Error updating task position:', error);
    throw new Error('Failed to update task position');
  }
};

// Update column order
export const updateColumnOrder = async (id: string, order: number): Promise<void> => {
  const { error } = await supabase
    .from('columns')
    .update({ order })
    .eq('id', id);

  if (error) {
    console.error('Error updating column order:', error);
    throw new Error('Failed to update column order');
  }
};
