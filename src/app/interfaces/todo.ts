 export interface Todo {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  dependsOn?: number; 
}