
import { Board } from "../types/kanban";

export const initialBoard: Board = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "task-1",
          title: "Research user requirements",
          description: "Interview stakeholders and gather requirements for the new feature.",
          priority: "high",
          tags: ["research", "planning"],
        },
        {
          id: "task-2",
          title: "Create wireframes",
          description: "Design initial wireframes for the dashboard layout.",
          priority: "medium",
          dueDate: "2025-05-20",
          tags: ["design"],
        },
        {
          id: "task-3",
          title: "Update documentation",
          description: "Update project documentation with new API endpoints.",
          priority: "low",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          id: "task-4",
          title: "Implement authentication flow",
          description: "Build login and registration functionality with JWT tokens.",
          priority: "high",
          dueDate: "2025-05-15",
          tags: ["frontend", "backend"],
        },
        {
          id: "task-5",
          title: "Design database schema",
          description: "Create the database schema for user profiles and settings.",
          priority: "medium",
          tags: ["database"],
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "task-6",
          title: "Set up project repository",
          description: "Initialize GitHub repository with template and basic readme.",
          priority: "medium",
          tags: ["setup"],
        },
        {
          id: "task-7",
          title: "Configure CI/CD pipeline",
          description: "Set up automated testing and deployment workflow.",
          priority: "high",
          tags: ["devops"],
        },
        {
          id: "task-8",
          title: "Install dependencies",
          description: "Set up project with required npm packages.",
          priority: "low",
          tags: ["setup"],
        },
      ],
    },
  ],
};
