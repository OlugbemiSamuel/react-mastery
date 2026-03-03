
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: string;
  title: string;
  status: Status;
}

interface TaskState {
    tasks: Task[];
    addTask: (title: string, status: Status) => void;
    deleteTask: (id:string) => void;
    updateTask: (id: string, status: Status) => void;
}

export const useTaskStore = create<TaskState>() (
    persist(
        (set) => ({
            tasks: [],

            // adding task to the task array by using the current state of the task array by spreading it and add a new task object
            addTask: (title, status) =>
                set((state) => ({
                    tasks: [...state.tasks, {id:Math.random().toString(), title, status}],
                })),
                // deleting a task by the id once the id of the selcted taks matches a task in the tasks array
                deleteTask: (id) =>
                    set((state) => ({
                        tasks: state.tasks.filter((task) => task.id !== id),
                    })),

                    
                    // updating a task in the tasks by spreading the task array and checking if the id matches any task in the task arrray we update task by changing the status alone
                updateTask: (id, status) => 
                    set((state) => ({
                        tasks: state.tasks.map((task) =>
                             task.id === id ? {...task, status} : task
                    ),
                    })),
        }),

       { name: "task-store" }
    )

    
);


// export default useTaskStore