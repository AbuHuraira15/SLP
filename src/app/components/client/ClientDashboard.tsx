import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Plus, Briefcase, Clock, CheckCircle, MapPin, DollarSign } from "lucide-react";
import { PostTaskWizard } from "./PostTaskWizard";
import { MyTasks } from "./MyTasks";
import { TaskDetail } from "./TaskDetail";
import { ClientProfile } from "./ClientProfile";
import { Payments } from "./Payments";
import { useState } from "react";
import { format } from "date-fns";

interface ClientDashboardProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function ClientDashboard({ currentPage, onNavigate }: ClientDashboardProps) {
  const [showPostTask, setShowPostTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Fix leaking kitchen faucet",
      description: "The kitchen faucet has been leaking for a few days and needs professional repair. The leak is from the base of the faucet.",
      category: "Plumbing",
      status: "in-progress",
      budget: 80,
      bids: 5,
      location: "Downtown",
      address: "456 Oak Avenue, Apt 12B",
      date: "Jan 13, 2026",
      time: "Morning (8 AM - 12 PM)",
      duration: "2-4 hours",
      postedDate: "2 hours ago",
      worker: "Rahim Uddin",
      workerRating: 4.9
    },
    {
      id: "2",
      title: "Deep clean 2-bedroom apartment",
      description: "I need a thorough deep cleaning of my 2-bedroom apartment including kitchen, bathrooms, living room, and bedrooms. Should include dusting, vacuuming, mopping, and cleaning all surfaces. Special attention needed for the kitchen and bathrooms.",
      category: "Cleaning",
      status: "open",
      budget: 120,
      bids: 8,
      location: "Midtown",
      address: "123 Main Street, Apt 4B",
      date: "Jan 15, 2026",
      time: "Afternoon (12 PM - 5 PM)",
      duration: "4-8 hours",
      postedDate: "5 hours ago"
    },
    {
      id: "3",
      title: "Help move furniture to new apartment",
      description: "Need help moving furniture from my current apartment to a new place. Includes sofa, bed, dresser, and dining table. Both apartments have elevator access.",
      category: "Moving",
      status: "completed",
      budget: 100,
      bids: 0,
      location: "Uptown",
      address: "789 Elm Street, Apt 5C",
      date: "Jan 9, 2026",
      time: "All day (8 AM - 8 PM)",
      duration: "4-8 hours",
      postedDate: "2 days ago",
      worker: "Sarah Williams",
      workerRating: 5.0,
      completedDate: "1 day ago"
    },
    {
      id: "4",
      title: "Install ceiling fan in bedroom",
      description: "Looking for an electrician to install a new ceiling fan in the master bedroom. The fan is already purchased and includes all mounting hardware.",
      category: "Electrical",
      status: "open",
      budget: 90,
      bids: 3,
      location: "Downtown",
      address: "321 Pine Road, Apt 7A",
      date: "Jan 14, 2026",
      time: "Morning (8 AM - 12 PM)",
      duration: "1-2 hours",
      postedDate: "1 day ago"
    },
    {
      id: "5",
      title: "Garden maintenance and lawn mowing",
      description: "Regular garden maintenance needed including lawn mowing, hedge trimming, and weed removal. Medium-sized backyard.",
      category: "Gardening",
      status: "completed",
      budget: 60,
      bids: 0,
      location: "Suburbs",
      address: "555 Garden Lane",
      date: "Jan 5, 2026",
      time: "Morning (8 AM - 12 PM)",
      duration: "2-4 hours",
      postedDate: "1 week ago",
      worker: "Tom Anderson",
      workerRating: 4.8,
      completedDate: "5 days ago"
    }
  ]);

  const handleAddTask = (taskData: any) => {
    const newTask = {
      id: String(tasks.length + 1),
      title: taskData.title,
      category: taskData.category.charAt(0).toUpperCase() + taskData.category.slice(1),
      status: "open",
      budget: parseInt(taskData.budget),
      bids: 0,
      location: taskData.location,
      postedDate: "Just now",
      description: taskData.description,
      address: taskData.address,
      date: taskData.date instanceof Date ? format(taskData.date, "MMM d, yyyy") : taskData.date,
      time: taskData.time,
      duration: taskData.duration
    };
    setTasks([newTask, ...tasks]);
    setShowPostTask(false);
    onNavigate("my-tasks");
  };

  const handleUpdateTask = (taskId: string, updates: any) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleCancelTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    onNavigate("my-tasks");
  };

  // Route to sub-pages
  if (currentPage === "post-task" || showPostTask) {
    return (
      <PostTaskWizard
        onClose={() => {
          setShowPostTask(false);
          onNavigate("dashboard");
        }}
        onComplete={handleAddTask}
      />
    );
  }

  if (currentPage === "my-tasks") {
    return <MyTasks tasks={tasks} onNavigate={onNavigate} onSelectTask={(id) => {
      setSelectedTask(id);
      onNavigate("task-detail");
    }} />;
  }

  if (currentPage === "task-detail" && selectedTask) {
    const task = tasks.find(t => t.id === selectedTask);
    if (!task) {
      onNavigate("my-tasks");
      return null;
    }
    return (
      <TaskDetail
        task={task}
        onBack={() => onNavigate("my-tasks")}
        onNavigate={onNavigate}
        onUpdateTask={handleUpdateTask}
        onCancelTask={handleCancelTask}
      />
    );
  }

  if (currentPage === "profile" || currentPage === "settings") {
    return <ClientProfile currentPage={currentPage} onNavigate={onNavigate} />;
  }

  if (currentPage === "payments") {
    return <Payments onNavigate={onNavigate} />;
  }

  // Main Dashboard
  // Main Dashboard return
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-slate-900">Welcome back, Karim!</h1>
          <p className="text-sm text-slate-500">Manage your tasks and find trusted workers</p>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-none w-full sm:w-auto rounded-xl"
          onClick={() => setShowPostTask(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Post new task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/60 rounded-2xl shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-blue-500 mb-1">Active tasks</p>
              <h2 className="text-3xl font-semibold text-blue-700">
                {tasks.filter(t => t.status === "in-progress").length}
              </h2>
            </div>
            <div className="w-11 h-11 bg-blue-200/60 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5 border-green-100 bg-gradient-to-br from-green-50 to-green-100/60 rounded-2xl shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-green-600 mb-1">Completed</p>
              <h2 className="text-3xl font-semibold text-green-700">
                {tasks.filter(t => t.status === "completed").length}
              </h2>
            </div>
            <div className="w-11 h-11 bg-green-200/60 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5 border-purple-100 bg-gradient-to-br from-purple-50 to-violet-100/60 rounded-2xl shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-purple-500 mb-1">Total spent</p>
              <h2 className="text-3xl font-semibold text-purple-700">
                ৳{tasks.reduce((total, task) => total + task.budget, 0)}
              </h2>
            </div>
            <div className="w-11 h-11 bg-purple-200/60 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-medium text-slate-900">Recent tasks</h2>
          <Button variant="ghost" className="text-blue-500 hover:text-blue-600 text-sm" onClick={() => onNavigate("my-tasks")}>
            View all
          </Button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => {
            const categoryColor: Record<string, string> = {
              Plumbing: "bg-blue-50 text-blue-600 border-blue-200",
              Cleaning: "bg-green-50 text-green-600 border-green-200",
              Moving: "bg-orange-50 text-orange-600 border-orange-200",
              Electrical: "bg-yellow-50 text-yellow-700 border-yellow-200",
              Gardening: "bg-emerald-50 text-emerald-600 border-emerald-200",
            };
            return (
              <Card
                key={task.id}
                className="p-4 border-slate-100 bg-white rounded-2xl hover:shadow-md hover:border-slate-200 transition-all cursor-pointer"
                onClick={() => { setSelectedTask(task.id); onNavigate("task-detail"); }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-[14px] font-medium text-slate-900 mb-1.5">{task.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <Badge variant="outline" className={`text-[11px] font-medium border rounded-full px-2.5 py-0.5 ${categoryColor[task.category] ?? "bg-slate-50 text-slate-500 border-slate-200"}`}>
                        {task.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{task.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{task.postedDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none text-right">
                      <p className="text-[11px] text-slate-400">Budget</p>
                      <p className="text-[15px] font-semibold text-slate-900">৳{task.budget}</p>
                    </div>
                    {task.status === "open" && (
                      <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 text-[11px] font-medium rounded-full px-3">
                        {task.bids} bids
                      </Badge>
                    )}
                    {task.status === "in-progress" && (
                      <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 text-[11px] font-medium rounded-full px-3">
                        In progress
                      </Badge>
                    )}
                    {task.status === "completed" && (
                      <Badge className="bg-green-50 text-green-600 hover:bg-green-50 text-[11px] font-medium rounded-full px-3">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Banner */}
      <Card className="p-6 rounded-2xl border-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 relative overflow-hidden">
        <div className="absolute right-[-20px] top-[-20px] w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute right-[50px] bottom-[-30px] w-20 h-20 rounded-full bg-white/5" />
        <h3 className="text-[15px] font-medium text-white mb-1.5">Need help with a task?</h3>
        <p className="text-sm text-white/75 mb-4 max-w-sm leading-relaxed">
          Post your task and get competitive bids from verified workers in your area
        </p>
        <Button
          className="h-9 px-5 bg-white/20 hover:bg-white/30 text-white border border-white/30 text-sm font-medium rounded-xl shadow-none backdrop-blur-sm"
          onClick={() => setShowPostTask(true)}
        >
          Post your first task
        </Button>
      </Card>
    </div>
  );
}