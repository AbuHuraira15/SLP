import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Wrench, Home, Scissors, Package, Car, Laptop, Calendar as CalendarIcon, MapPin, DollarSign, Clock, Zap } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Progress } from "../ui/progress";

interface PostTaskWizardProps {
  onClose: () => void;
  onComplete: (taskData: any) => void;
}

const categories = [
  { id: "plumbing", name: "Plumbing", icon: Wrench },
  { id: "electrical", name: "Electrician", icon: Zap },
  { id: "cleaning", name: "Cleaning", icon: Home },
  { id: "gardening", name: "Gardening", icon: Scissors },
  { id: "moving", name: "Moving", icon: Package },
  { id: "delivery", name: "Delivery", icon: Car },
  { id: "tech", name: "Tech Support", icon: Laptop },
];

export function PostTaskWizard({ onClose, onComplete }: PostTaskWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    address: "",
    date: undefined as Date | undefined,
    time: "",
    duration: "",
    budget: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
    }
    if (currentStep === 2) {
      if (!formData.category) newErrors.category = "Please select a category";
    }
    if (currentStep === 3) {
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
    }
    if (currentStep === 4) {
      if (!formData.date) newErrors.date = "Date is required";
      if (!formData.time) newErrors.time = "Time is required";
      if (!formData.duration) newErrors.duration = "Duration is required";
    }
    if (currentStep === 5) {
      if (!formData.budget) newErrors.budget = "Budget is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        onComplete(formData);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const inputClass = "h-[44px] text-[15px] bg-slate-50 border-slate-200 rounded-xl mt-1.5 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all";

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-[14px] font-medium text-slate-700">Task Title</Label>
              <Input
                id="title"
                placeholder="e.g., Fix leaking kitchen faucet"
                className={`${inputClass} ${errors.title ? "border-red-200 bg-red-50" : ""}`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="text-[14px] font-medium text-slate-700">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the task in detail. What needs to be done? Any specific requirements?"
                rows={6}
                className={`${inputClass.replace('h-[44px]','h-[160px]')} ${errors.description ? "border-red-200 bg-red-50" : ""}`}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              <p className="text-[13px] text-slate-500 mt-1">
                Be clear and specific to get better bids
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Label className="text-[18px] font-semibold text-slate-900 block">Select Category</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Card
                    key={cat.id}
                    className={`p-5 border-slate-100 rounded-2xl shadow-none hover:shadow-md hover:border-slate-200 transition-all cursor-pointer ${
                      formData.category === cat.id
                        ? "border-blue-200 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${
                      formData.category === cat.id 
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600" 
                        : "bg-slate-100"
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        formData.category === cat.id ? "text-white" : "text-slate-600"
                      }`} />
                    </div>
                    <span className="text-[15px] font-medium text-slate-900 block text-center">{cat.name}</span>
                  </Card>
                );
              })}
            </div>
            {errors.category && <p className="text-sm text-red-500 mt-2">{errors.category}</p>}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location" className="text-[14px] font-medium text-slate-700">City/Area</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="location"
                  placeholder="e.g., Downtown, Brooklyn"
                  className={`${inputClass} pl-10 ${errors.location ? "border-red-200 bg-red-50" : ""}`}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
            </div>

            <div>
              <Label htmlFor="address" className="text-[14px] font-medium text-slate-700">Full Address</Label>
              <Textarea
                id="address"
                placeholder="Street address, apartment/unit number"
                rows={3}
                className={`${inputClass.replace('h-[44px]','h-[100px]')} ${errors.address ? "border-red-200 bg-red-50" : ""}`}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
              <p className="text-[13px] text-slate-500 mt-1">
                Exact address will only be shared with the hired worker
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-[14px] font-medium text-slate-700">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${inputClass} justify-start text-left border-slate-200 ${errors.date ? "border-red-200 bg-red-50" : ""}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                    {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData({ ...formData, date })}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <Label htmlFor="time" className="text-[14px] font-medium text-slate-700">Preferred Time</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                <SelectTrigger id="time" className={`${inputClass} ${errors.time ? "border-red-200 bg-red-50" : ""}`}>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 9 PM)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
            </div>

            <div>
              <Label htmlFor="duration" className="text-[14px] font-medium text-slate-700">Estimated Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger id="duration" className={`${inputClass} ${errors.duration ? "border-red-200 bg-red-50" : ""}`}>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Less than 1 hour</SelectItem>
                  <SelectItem value="2">1-2 hours</SelectItem>
                  <SelectItem value="4">2-4 hours</SelectItem>
                  <SelectItem value="8">4-8 hours</SelectItem>
                  <SelectItem value="full">Full day (8+ hours)</SelectItem>
                </SelectContent>
              </Select>
              {errors.duration && <p className="text-sm text-red-500 mt-1">{errors.duration}</p>}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="budget" className="text-[14px] font-medium text-slate-700">Your Budget (BDT)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="e.g., 100"
                  className={`${inputClass} pl-10 ${errors.budget ? "border-red-200 bg-red-50" : ""}`}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
              {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget}</p>}
              <p className="text-[13px] text-slate-500 mt-1">
                Set a competitive budget to attract quality workers
              </p>
            </div>

            {/* Summary */}
            <Card className="p-6 border-slate-100 bg-slate-50 rounded-2xl shadow-none">
              <h4 className="text-[18px] font-semibold text-slate-900 mb-4">Task Summary</h4>
              <div className="space-y-3 text-sm divide-y divide-slate-200">
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 font-medium">Title:</span>
                  <span className="font-semibold text-slate-900">{formData.title || "—"}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 font-medium">Category:</span>
                  <span className="font-semibold text-slate-900">
                    {categories.find((c) => c.id === formData.category)?.name || "—"}
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 font-medium">Location:</span>
                  <span className="font-semibold text-slate-900">{formData.location || "—"}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 font-medium">Date:</span>
                  <span className="font-semibold text-slate-900">
                    {formData.date ? format(formData.date, "PPP") : "—"}
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-slate-500 font-medium">Budget:</span>
                  <span className="font-semibold text-blue-600 text-lg">৳{formData.budget || "—"}</span>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
        <div className="bg-white border-b border-slate-100 p-5 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-[26px] font-semibold text-slate-900">Post a Task</h2>
            <p className="text-[15px] text-slate-500">Fill in the details to get started</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-[44px] w-[44px] rounded-xl border-slate-200 hover:bg-slate-50">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 flex-1 min-h-0 flex flex-col">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[15px] font-semibold text-slate-900">Step {step} of {totalSteps}</span>
              <span className="text-[14px] text-slate-500 font-medium">
                {step === 1 && "Task Details"}
                {step === 2 && "Category"}
                {step === 3 && "Location"}
                {step === 4 && "Schedule"}
                {step === 5 && "Budget & Review"}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300 shadow-sm" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="h-[44px] px-6 text-[15px] border-slate-200 rounded-xl hover:bg-slate-50 font-medium"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              className="h-[44px] px-8 text-[15px] bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-lg font-semibold"
              size="sm"
            >
              {step === totalSteps ? "Post Task" : "Next"}
              {step < totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}