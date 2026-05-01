import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User, Mail, Phone, MapPin, Star, Award } from "lucide-react";

interface ClientProfileProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function ClientProfile({ currentPage, onNavigate }: ClientProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Karim Hasan",
    email: "karim.hasan@example.com",
    phone: "+1 (555) 123-4567",
    location: "Dhaka, BD",
    bio: "Regular client looking for reliable help with home tasks",
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    taskUpdates: true,
    bidAlerts: true,
    newsletter: false,
    language: "en",
  });

  const stats = {
    tasksPosted: 15,
    tasksCompleted: 12,
    activeWorkers: 5,
    loyaltyPoints: 240,
  };

  const taskHistory = [
    { id: "1", title: "Deep clean 2-bedroom apartment", worker: "Sarah Williams", rating: 5, amount: 120, date: "Jan 10, 2026", status: "completed" },
    { id: "2", title: "Fix leaking kitchen faucet", worker: "Rahim Uddin", rating: 4, amount: 80, date: "Jan 8, 2026", status: "completed" },
    { id: "3", title: "Garden maintenance", worker: "Tom Anderson", rating: 5, amount: 60, date: "Jan 5, 2026", status: "completed" },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const inputClass = "pl-10 h-[46px] text-[18px] bg-slate-50 border-slate-200 rounded-xl focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all disabled:opacity-60";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 pointer-events-none";

  const notifItems = [
    { key: "emailNotifications", label: "Email notifications", desc: "Receive updates via email" },
    { key: "smsNotifications", label: "SMS notifications", desc: "Get text messages for important updates" },
    { key: "pushNotifications", label: "Push notifications", desc: "Receive push notifications on your device" },
    { key: "taskUpdates", label: "Task updates", desc: "Notifications about your task status" },
    { key: "bidAlerts", label: "Bid alerts", desc: "Get notified when you receive new bids" },
    { key: "newsletter", label: "Newsletter", desc: "Receive tips and platform updates" },
  ] as const;

  if (currentPage === "settings") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6" style={{ fontSize: 18 }}>
        <div>
          <h1 className="text-[26px] font-semibold text-slate-900">Settings</h1>
          <p className="text-[18px] text-slate-500">Manage your account preferences</p>
        </div>

        <Tabs defaultValue="notifications">
          <TabsList className="grid w-full grid-cols-3 h-[52px] rounded-2xl bg-slate-100 p-1">
            <TabsTrigger value="notifications" className="rounded-xl text-[18px] font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Notifications</TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-xl text-[18px] font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Preferences</TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl text-[18px] font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="mt-6">
            <Card className="p-6 rounded-2xl border-slate-200 shadow-sm space-y-1">
              <h2 className="text-[22px] font-semibold text-slate-900 mb-5">Notification settings</h2>
              <div className="divide-y divide-slate-100">
                {notifItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-[18px] font-medium text-slate-800">{item.label}</p>
                      <p className="text-[15px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Switch
                      checked={settings[item.key]}
                      onCheckedChange={(checked) => setSettings({ ...settings, [item.key]: checked })}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card className="p-6 rounded-2xl border-slate-200 shadow-sm">
              <h2 className="text-[22px] font-semibold text-slate-900 mb-5">Preferences</h2>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="language" className="text-[18px] font-medium text-slate-700">Language</Label>
                  <Select value={settings.language} onValueChange={(v) => setSettings({ ...settings, language: v })}>
                    <SelectTrigger id="language" className="h-[46px] text-[18px] rounded-xl border-slate-200 bg-slate-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en" className="text-[18px]">English</SelectItem>
                      <SelectItem value="es" className="text-[18px]">Español</SelectItem>
                      <SelectItem value="fr" className="text-[18px]">Français</SelectItem>
                      <SelectItem value="de" className="text-[18px]">Deutsch</SelectItem>
                      <SelectItem value="zh" className="text-[18px]">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="timezone" className="text-[18px] font-medium text-slate-700">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger id="timezone" className="h-[46px] text-[18px] rounded-xl border-slate-200 bg-slate-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est" className="text-[18px]">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst" className="text-[18px]">Central Time (CT)</SelectItem>
                      <SelectItem value="mst" className="text-[18px]">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst" className="text-[18px]">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="p-6 rounded-2xl border-slate-200 shadow-sm">
              <h2 className="text-[22px] font-semibold text-slate-900 mb-5">Security</h2>
              <div className="space-y-4">
                {["Current password", "New password", "Confirm new password"].map((label, i) => (
                  <div key={i} className="space-y-1.5">
                    <Label className="text-[18px] font-medium text-slate-700">{label}</Label>
                    <Input type="password" className="h-[46px] text-[18px] rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500" />
                  </div>
                ))}
                <Button className="h-[46px] px-6 text-[18px] bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-none mt-2">
                  Update password
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-[20px] font-semibold text-slate-900 mb-1.5">Two-factor authentication</h3>
                <p className="text-[16px] text-slate-500 mb-4">Add an extra layer of security to your account</p>
                <Button variant="outline" className="h-[46px] px-6 text-[18px] rounded-xl border-slate-200 hover:bg-slate-50">
                  Enable 2FA
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Profile View
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-5" style={{ fontSize: 18 }}>
      <div>
        <h1 className="text-[26px] font-semibold text-slate-900">Profile</h1>
        <p className="text-[18px] text-slate-500">Manage your profile information</p>
      </div>

      {/* Profile Header */}
      <Card className="p-6 rounded-2xl border-slate-200 shadow-sm bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="w-20 h-20 ring-4 ring-white shadow-md">
            <AvatarFallback className="text-[24px] font-semibold bg-gradient-to-br from-blue-500 to-indigo-500 text-white">KH</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-[22px] font-semibold text-slate-900">{profileData.name}</h2>
            <p className="text-[16px] text-slate-500 mb-4">{profileData.bio}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Tasks posted", value: stats.tasksPosted, color: "bg-blue-50 border-blue-100", num: "text-blue-600", lbl: "text-blue-400" },
                { label: "Completed", value: stats.tasksCompleted, color: "bg-green-50 border-green-100", num: "text-green-600", lbl: "text-green-400" },
                { label: "Workers", value: stats.activeWorkers, color: "bg-orange-50 border-orange-100", num: "text-orange-600", lbl: "text-orange-400" },
                { label: "Points", value: stats.loyaltyPoints, color: "bg-purple-50 border-purple-100", num: "text-purple-600", lbl: "text-purple-400" },
              ].map((s) => (
                <div key={s.label} className={`${s.color} border rounded-xl p-3 text-center`}>
                  <p className={`text-[24px] font-bold ${s.num}`}>{s.value}</p>
                  <p className={`text-[13px] font-medium ${s.lbl}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            className={`h-[44px] px-6 text-[18px] rounded-xl shadow-none font-medium ${
              isEditing
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
            }`}
          >
            {isEditing ? "Save changes" : "Edit profile"}
          </Button>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6 rounded-2xl border-slate-200 shadow-sm">
        <h2 className="text-[22px] font-semibold text-slate-900 mb-5">Personal information</h2>
        <div className="space-y-4">
          {[
            { id: "name", label: "Full name", type: "text", icon: User, field: "name" as const },
            { id: "email", label: "Email", type: "email", icon: Mail, field: "email" as const },
            { id: "phone", label: "Phone number", type: "tel", icon: Phone, field: "phone" as const },
            { id: "location", label: "Location", type: "text", icon: MapPin, field: "location" as const },
          ].map(({ id, label, type, icon: Icon, field }) => (
            <div key={id} className="space-y-1.5">
              <Label htmlFor={id} className="text-[18px] font-medium text-slate-600">{label}</Label>
              <div className="relative">
                <Icon className={iconClass} />
                <Input
                  id={id}
                  type={type}
                  className={inputClass}
                  value={profileData[field]}
                  onChange={(e) => setProfileData({ ...profileData, [field]: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Task History */}
      <Card className="p-6 rounded-2xl border-slate-200 shadow-sm">
        <h2 className="text-[22px] font-semibold text-slate-900 mb-5">Recent task history</h2>
        <div className="space-y-3">
          {taskHistory.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-slate-200 transition-all">
              <div className="flex-1">
                <h4 className="text-[18px] font-medium text-slate-900 mb-1">{task.title}</h4>
                <div className="flex items-center gap-3 text-[15px] text-slate-500 flex-wrap">
                  <span>{task.worker}</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {task.rating}.0
                  </span>
                  <span>{task.date}</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-[20px] font-bold text-slate-900">৳{task.amount}</p>
                <Badge className="bg-green-50 text-green-600 hover:bg-green-50 text-[13px] font-medium rounded-full px-3 mt-1">
                  {task.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 h-[46px] text-[18px] rounded-xl border-slate-200 hover:bg-slate-50">
          View all history
        </Button>
      </Card>

      {/* Loyalty */}
      <Card className="p-6 rounded-2xl border-0 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400 relative overflow-hidden">
        <div className="absolute right-[-16px] top-[-16px] w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute right-12 bottom-[-20px] w-16 h-16 rounded-full bg-white/10" />
        <div className="flex items-start gap-4 relative">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-[20px] font-semibold text-white mb-1">Loyalty points: {stats.loyaltyPoints}</h3>
            <p className="text-[16px] text-white/80 mb-4 leading-relaxed">
              Earn points with every completed task. Redeem for discounts on future tasks!
            </p>
            <Button className="h-[44px] px-6 text-[18px] bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl shadow-none backdrop-blur-sm">
              Redeem points
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}