import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.username ?? "User"} 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of your projects and tasks.
          </p>
        </div>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-lg">📁</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Projects</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Tasks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-lg">🚀</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No projects yet
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Create your first AI-powered project to get started with sprint
            planning.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm">
            <span>＋</span> Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
