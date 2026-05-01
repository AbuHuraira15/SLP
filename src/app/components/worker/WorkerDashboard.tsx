import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { DollarSign, Briefcase, Star, TrendingUp, MapPin, Clock, AlertCircle } from "lucide-react";
import { BrowseTasks } from "./BrowseTasks";
import { MyBids } from "./MyBids";
import { ActiveJobs } from "./ActiveJobs";
import { Earnings } from "./Earnings";
import { WorkerProfile } from "./WorkerProfile";
import { TaskDetail } from "./TaskDetail";

interface WorkerDashboardProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function WorkerDashboard({ currentPage, onNavigate }: WorkerDashboardProps) {
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);

  // Mock data
  const stats = {
    totalEarnings: 3420,
    pendingPayout: 280,
    completedJobs: 47,
    rating: 4.9,
    activeBids: 3,
    activeJobs: 1
  };

  const nearbyTasks = [
    {
      id: "1",
      title: "Deep clean 2-bedroom apartment",
      description: "Need thorough cleaning including kitchen, bathrooms, and bedrooms. Looking for someone with experience in deep cleaning.",
      category: "Cleaning",
      budget: 120,
      distance: "0.8 mi",
      location: "Midtown, 123 Main St",
      date: "Jan 15, 2026",
      time: "Afternoon",
      postedTime: "2h ago",
      bids: 5,
      client: "Karim Hasan",
      clientRating: 4.7,
      clientJobs: 12
    },
    {
      id: "2",
      title: "Fix leaking kitchen faucet",
      description: "Kitchen faucet has been leaking for a few days. Need it fixed ASAP.",
      category: "Plumbing",
      budget: 80,
      distance: "1.2 mi",
      location: "Downtown, 456 Oak Ave",
      date: "Jan 14, 2026",
      time: "Morning",
      postedTime: "4h ago",
      bids: 3,
      client: "Sarah Williams",
      clientRating: 5.0,
      clientJobs: 25
    },
    {
      id: "3",
      title: "Help move furniture",
      description: "Need help moving some heavy furniture. Couch, bed, and dining table to new apartment.",
      category: "Moving",
      budget: 100,
      distance: "2.1 mi",
      location: "Uptown, 789 Elm Rd",
      date: "Jan 16, 2026",
      time: "Flexible",
      postedTime: "6h ago",
      bids: 7,
      client: "Rahim Uddin",
      clientRating: 4.9,
      clientJobs: 8
    }
  ];

  const activeJob = {
    id: "active-1",
    title: "Garden maintenance and lawn mowing",
    client: "Emily Chen",
    clientRating: 4.8,
    location: "123 Oak Street",
    amount: 60,
    status: "accepted",
    startTime: "2:00 PM Today"
  };

  // Route to sub-pages
  if (currentPage === "browse-tasks") {
    return <BrowseTasks onNavigate={onNavigate} onSelectTask={setSelectedTask} />;
  }

  if (currentPage === "my-bids") {
    return <MyBids onNavigate={onNavigate} />;
  }

  if (currentPage === "active-job") {
    return <ActiveJobs onNavigate={onNavigate} onBack={() => onNavigate("dashboard")} />;
  }

  if (currentPage === "earnings") {
    return <Earnings onNavigate={onNavigate} />;
  }

  if (currentPage === "profile" || currentPage === "settings") {
    return <WorkerProfile currentPage={currentPage} onNavigate={onNavigate} />;
  }

  if (currentPage === "task-detail" && selectedTask) {
    return <TaskDetail task={selectedTask} onBack={() => onNavigate("browse-tasks")} onNavigate={onNavigate} />;
  }

  // Main Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Emergency Button - Always visible */}
      <div className="fixed bottom-24 right-4 md:bottom-8 z-40">
        <Button
          className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90 shadow-lg"
          onClick={() => setShowEmergency(true)}
          title="Emergency - Hold to activate"
        >
          <AlertCircle className="w-8 h-8" />
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1>Welcome, Rahim!</h1>
          <p className="text-muted-foreground">Find new tasks and grow your earnings</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
          onClick={() => onNavigate("browse-tasks")}
        >
          Browse Tasks
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Earnings</p>
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
          <h2 className="text-3xl text-green-600">৳{stats.totalEarnings}</h2>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending</p>
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </div>
          <h2 className="text-3xl">৳{stats.pendingPayout}</h2>
          <p className="text-xs text-muted-foreground mt-1">To be paid</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Jobs Done</p>
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-3xl">{stats.completedJobs}</h2>
          <p className="text-xs text-muted-foreground mt-1">Completed</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Rating</p>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
          <h2 className="text-3xl">{stats.rating}</h2>
          <p className="text-xs text-muted-foreground mt-1">From 47 reviews</p>
        </Card>
      </div>

      {/* Active Job Alert */}
      {activeJob && (
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-orange-500 hover:bg-orange-600">Active Job</Badge>
                <h3>{activeJob.title}</h3>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Client: {activeJob.client} ★ {activeJob.clientRating}</p>
                <p className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {activeJob.location}
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activeJob.startTime}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold mb-2">৳{activeJob.amount}</p>
              <Button onClick={() => onNavigate("active-job")} size="sm">
                View Details
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Nearby Tasks */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2>Nearby Tasks</h2>
            <Button variant="ghost" onClick={() => onNavigate("browse-tasks")}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {nearbyTasks.map((task) => (
              <Card 
                key={task.id} 
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedTask(task);
                  onNavigate("task-detail");
                }}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2">{task.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.distance} away
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.postedTime}
                      </span>
                      <span>{task.bids} bids</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl">৳{task.budget}</p>
                    <Button size="sm" className="mt-2 bg-primary hover:bg-primary/90">
                      Place Bid
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Bids</span>
                <Badge variant="secondary">{stats.activeBids}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Jobs</span>
                <Badge className="bg-orange-100 text-orange-700">{stats.activeJobs}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-semibold text-green-600">+৳180</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate("earnings")}
            >
              View Earnings
            </Button>
          </Card>

          {/* Tips */}
          <Card className="p-6 bg-blue-50 border-primary/20">
            <h4 className="mb-2">💡 Tips for Success</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Respond to tasks quickly</li>
              <li>• Write detailed bid messages</li>
              <li>• Keep your profile updated</li>
              <li>• Maintain high ratings</li>
              <li>• Complete profile verification</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
