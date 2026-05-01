import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Clock, MapPin, Search, Filter } from "lucide-react";

interface MyTasksProps {
  tasks: any[];
  onNavigate: (page: string) => void;
  onSelectTask: (id: string) => void;
}

export function MyTasks({ tasks, onNavigate, onSelectTask }: MyTasksProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || task.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const categoryColor: Record<string, string> = {
    Plumbing:   "bg-blue-50 text-blue-600 border-blue-200",
    Cleaning:   "bg-green-50 text-green-600 border-green-200",
    Moving:     "bg-orange-50 text-orange-600 border-orange-200",
    Electrical: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Gardening:  "bg-emerald-50 text-emerald-600 border-emerald-200",
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 text-[13px] font-medium rounded-full px-3 border-0">Open</Badge>;
      case "in-progress":
        return <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 text-[13px] font-medium rounded-full px-3 border-0">In progress</Badge>;
      case "completed":
        return <Badge className="bg-green-50 text-green-600 hover:bg-green-50 text-[13px] font-medium rounded-full px-3 border-0">Completed</Badge>;
      default:
        return null;
    }
  };

  const tabCounts = {
    all: tasks.length,
    open: tasks.filter(t => t.status === "open").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
  };

  const tabDotColor: Record<string, string> = {
    all: "bg-slate-400",
    open: "bg-blue-500",
    "in-progress": "bg-orange-500",
    completed: "bg-green-500",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-semibold text-slate-900">My tasks</h1>
          <p className="text-[16px] text-slate-500">Manage and track all your posted tasks</p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { label: "All", value: tabCounts.all, color: "bg-slate-100 text-slate-600" },
            { label: "Open", value: tabCounts.open, color: "bg-blue-50 text-blue-600" },
            { label: "Active", value: tabCounts["in-progress"], color: "bg-orange-50 text-orange-600" },
            { label: "Done", value: tabCounts.completed, color: "bg-green-50 text-green-600" },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-xl px-3 py-1.5 text-center hidden sm:block`}>
              <p className="text-[18px] font-bold leading-none">{s.value}</p>
              <p className="text-[11px] font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 pointer-events-none" />
          <Input
            placeholder="Search tasks..."
            className="pl-10 h-[46px] text-[16px] bg-white border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="h-[46px] px-5 text-[16px] font-medium border-slate-200 rounded-xl bg-white hover:bg-slate-50"
        >
          <Filter className="w-[16px] h-[16px] mr-2 text-slate-500" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 h-[50px] rounded-2xl bg-slate-100 p-1 gap-1">
          {(["all", "open", "in-progress", "completed"] as const).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-xl text-[14px] font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <span className={`w-2 h-2 rounded-full ${tabDotColor[tab]} hidden sm:inline-block`} />
              {tab === "all" ? `All (${tabCounts.all})` :
               tab === "open" ? `Open (${tabCounts.open})` :
               tab === "in-progress" ? `Active (${tabCounts["in-progress"]})` :
               `Done (${tabCounts.completed})`}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-5">
          {filteredTasks.length === 0 ? (
            <Card className="p-14 text-center rounded-2xl border-slate-100 bg-slate-50">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-[18px] font-medium text-slate-500">No tasks found</p>
              <p className="text-[15px] text-slate-400 mt-1">Try adjusting your search or filter</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <Card
                  key={task.id}
                  className="p-5 bg-white border-slate-100 rounded-2xl hover:shadow-md hover:border-slate-200 transition-all cursor-pointer"
                  onClick={() => onSelectTask(task.id)}
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex-1">
                          <h3 className="text-[17px] font-semibold text-slate-900 mb-2">{task.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-[13px] text-slate-400">
                            <Badge
                              variant="outline"
                              className={`text-[12px] font-medium border rounded-full px-2.5 py-0.5 ${categoryColor[task.category] ?? "bg-slate-50 text-slate-500 border-slate-200"}`}
                            >
                              {task.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />{task.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />{task.postedDate}
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(task.status)}
                      </div>

                      {task.worker && (
                        <div className="mt-2 inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
                            {task.worker.charAt(0)}
                          </div>
                          <span className="text-[13px] font-medium text-slate-700">{task.worker}</span>
                          <span className="text-[13px] text-yellow-500 font-medium">★ {task.workerRating}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="text-right bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
                        <p className="text-[12px] text-slate-400 font-medium">Budget</p>
                        <p className="text-[22px] font-bold text-slate-900">৳{task.budget}</p>
                      </div>
                      {task.status === "open" && task.bids > 0 && (
                        <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 text-[13px] font-medium rounded-full px-3 border-0">
                          {task.bids} bids
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}