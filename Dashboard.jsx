import Navbar from "../components/Navbar";
import ProjectHeader from "../components/ProjectHeader";
import TaskColumn from "../components/TaskColumn";
const Dashboard = () => {
  const columns = [
    {
      title: 'Backlog',
      count: 3,
      color: 'border-slate-800',
      tasks: [
        { priority: 'Medium', title: 'Add error handling', description: 'Implement comprehensive error handling and validation', assignee: 'Mike', color: 'bg-green-500' },
        { priority: 'Low', title: 'Write unit tests', description: 'Create test suite for critical functions', assignee: 'John', color: 'bg-pink-500' },
        { priority: 'High', title: 'Setup CI/CD pipeline', description: 'Configure automated testing and deployment', assignee: 'Sarah', color: 'bg-orange-600' },
      ]
    },
    {
      
      title: 'In Progress',
      count: 2,
      color: 'border-blue-400',
      tasks: [
        { priority: 'High', title: 'Implement authentication', description: 'Build user login and registration with JWT', assignee: 'Mike', color: 'bg-green-500' },
        { priority: 'Medium', title: 'Create API endpoints', description: 'Develop REST API for core features', assignee: 'John', color: 'bg-pink-500' },
      ]
    },
    {
      title: 'Review',
      count: 1,
      color: 'border-purple-500',
      tasks: [
        { priority: 'Medium', title: 'Build component library', description: 'Design and implement reusable UI components', assignee: 'Sarah', color: 'bg-orange-600' },
      ]
    },
    {
      title: 'Done',
      count: 2,
      color: 'border-emerald-400',
      tasks: [
        { priority: 'High', title: 'Set up project repository', description: 'Initialize Git repository and set up project structure', assignee: 'John', color: 'bg-pink-500' },
        { priority: 'High', title: 'Design database schema', description: 'Create ERD and define table relationships', assignee: 'Sarah', color: 'bg-orange-600' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <Navbar />
      <main className="p-8 max-w-[1600px] mx-auto">
        <button className="text-xs text-gray-500 mb-6 flex items-center gap-2 hover:text-gray-800">
          ← Back to Dashboard
        </button>

        <ProjectHeader />

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 bg-white">
              ☰ Filter
            </button>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors">
            + Add Task
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-10">
          {columns.map((col, index) => (
            <TaskColumn key={index} {...col} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;