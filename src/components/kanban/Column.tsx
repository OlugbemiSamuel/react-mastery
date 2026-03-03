import { useTaskStore, type Status } from "../../store/useTaskStore";


interface ColumnProps {
    title: string;
    status: Status;
    
   
}

const Column = ({title, status, }: ColumnProps) => {
    const  tasks  = useTaskStore((state) => state.tasks);
    const addTask = useTaskStore((state) => state.addTask);
    // const deleteTask = useTaskStore((state) => state.deleteTask)

    const filteredTasks = tasks.filter((task) => task.status === status );
    


    return(
      <div className="flex-1 bg-gray-50/50 rounded-xl p-4 min-h-125 border border-gray-200">
        <h2 className="font-bold text-gray-700 mb-4 uppercase tracking-wider text-sm">
            {title} {filteredTasks.length}

        </h2>

        <div className="space-y-3">
            {filteredTasks.map((task) => (
                
               
                <div key={task.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    {task.title}

                </div>
               
                
                
            )) }

        </div>

        <button 
        onClick={() => addTask('New Task', status)}
        className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors border-dashed border-2 border-gray-200">
            + Add Task
        </button>
        
      
        
        </div>
    )
}

export default Column