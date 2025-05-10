
export interface Task {
  id: string;
  title: string;
  column_id: string;
  order: number;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface Board {
  columns: Column[];
}
