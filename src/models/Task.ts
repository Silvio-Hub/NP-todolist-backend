export interface Task {
  id: string;
  description: string;
  data: string;
  status: "completed" | "in_progress";
}
