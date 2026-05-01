import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { ChevronLeft, Eye, EyeOff, Mail, Phone, User, Lock, Chrome, Apple, Upload, FileCheck, Hash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion } from "motion/react";

interface SignUpProps {
  role: "client" | "worker";
  onSignUp: () => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export function SignUp({ role, onSignUp, onBack, onSwitchToLogin }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    language: "en",
    tinNumber: "",
    certificateFile: null as File | null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [certificateFileName, setCertificateFileName] = useState("");

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    switch (field) {
      case "name":
        if (!value.trim()) newErrors.name = "Name is required";
        else delete newErrors.name;
        break;
      case "email":
        if (!value.trim()) newErrors.email = "Email is required";
        else delete newErrors.email;
        break;
      case "phone":
        if (!value.trim()) newErrors.phone = "Phone number is required";
        else delete newErrors.phone;
        break;
      case "password":
        if (!value) newErrors.password = "Password is required";
        else if (value.length < 8) newErrors.password = "Password must be at least 8 characters";
        else delete newErrors.password;
        break;
      case "confirmPassword":
        if (!value) newErrors.confirmPassword = "Please confirm your password";
        else if (value !== formData.password) newErrors.confirmPassword = "Passwords do not match";
        else delete newErrors.confirmPassword;
        break;
      case "tinNumber":
        if (role === "worker" && !value.trim()) newErrors.tinNumber = "TIN number is required";
        else delete newErrors.tinNumber;
        break;
      case "certificateFile":
        if (role === "worker" && !value) newErrors.certificateFile = "Certificate file is required";
        else delete newErrors.certificateFile;
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, certificateFile: file });
      setCertificateFileName(file.name);
      validateField("certificateFile", file.name);
    } else {
      setFormData({ ...formData, certificateFile: null });
      setCertificateFileName("");
      validateField("certificateFile", "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("phone", formData.phone);
    validateField("password", formData.password);
    validateField("confirmPassword", formData.confirmPassword);
    if (role === "worker") {
      validateField("tinNumber", formData.tinNumber);
      validateField("certificateFile", certificateFileName);
    }
    const hasErrors = Object.keys(errors).length > 0;
    let hasEmptyFields = !formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword;
    if (role === "worker") hasEmptyFields = hasEmptyFields || !formData.tinNumber || !formData.certificateFile;
    if (!hasErrors && !hasEmptyFields) onSignUp();
  };

  const isFormValid = role === "worker"
    ? formData.name && formData.email && formData.phone && formData.password && formData.confirmPassword && formData.tinNumber && formData.certificateFile && Object.keys(errors).length === 0
    : formData.name && formData.email && formData.phone && formData.password && formData.confirmPassword && Object.keys(errors).length === 0;

  const inputClass = "pl-9 h-[42px] text-sm bg-slate-50 border-slate-200 rounded-lg focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[420px]">

        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="p-10 border border-slate-200/80 rounded-2xl shadow-sm bg-white">

            <div className="mb-7">
              <h1 className="text-[22px] font-medium text-slate-900 mb-1.5">
                Sign up as {role === "client" ? "client" : "worker"}
              </h1>
              <p className="text-sm text-slate-500">Create your account to get started.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-[13px] font-medium text-slate-600">Full name</Label>
                <div className="relative">
                  <User className={iconClass} />
                  <Input id="name" type="text" placeholder="Karim Hasan" className={inputClass}
                    value={formData.name} onChange={(e) => handleChange("name", e.target.value)} onBlur={(e) => validateField("name", e.target.value)} />
                </div>
                {errors.name && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.name}</motion.p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[13px] font-medium text-slate-600">Email</Label>
                <div className="relative">
                  <Mail className={iconClass} />
                  <Input id="email" type="email" placeholder="karim@example.com" className={inputClass}
                    value={formData.email} onChange={(e) => handleChange("email", e.target.value)} onBlur={(e) => validateField("email", e.target.value)} />
                </div>
                {errors.email && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.email}</motion.p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-[13px] font-medium text-slate-600">Phone number</Label>
                <div className="relative">
                  <Phone className={iconClass} />
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className={inputClass}
                    value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} onBlur={(e) => validateField("phone", e.target.value)} />
                </div>
                {errors.phone && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.phone}</motion.p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[13px] font-medium text-slate-600">Password</Label>
                <div className="relative">
                  <Lock className={iconClass} />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Minimum 8 characters"
                    className="pl-9 pr-10 h-[42px] text-sm bg-slate-50 border-slate-200 rounded-lg focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                    value={formData.password} onChange={(e) => handleChange("password", e.target.value)} onBlur={(e) => validateField("password", e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? <EyeOff className="w-[15px] h-[15px]" /> : <Eye className="w-[15px] h-[15px]" />}
                  </button>
                </div>
                {errors.password && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.password}</motion.p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-[13px] font-medium text-slate-600">Confirm password</Label>
                <div className="relative">
                  <Lock className={iconClass} />
                  <Input id="confirmPassword" type="password" placeholder="Re-enter password" className={inputClass}
                    value={formData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} onBlur={(e) => validateField("confirmPassword", e.target.value)} />
                </div>
                {errors.confirmPassword && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.confirmPassword}</motion.p>}
              </div>

              {/* Language */}
              <div className="space-y-1.5">
                <Label htmlFor="language" className="text-[13px] font-medium text-slate-600">Preferred language</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                  <SelectTrigger id="language" className="h-[42px] text-sm bg-slate-50 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Worker-only fields */}
              {role === "worker" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

                  {/* Section divider */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      Worker details
                    </span>
                    <div className="flex-1 h-px bg-slate-100" />
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">

                    {/* TIN */}
                    <div className="space-y-1.5">
                      <Label htmlFor="tinNumber" className="text-[13px] font-medium text-slate-600">TIN number (Tax ID)</Label>
                      <div className="relative">
                        <Hash className={iconClass} />
                        <Input id="tinNumber" type="text" placeholder="123-45-6789" className={inputClass}
                          value={formData.tinNumber} onChange={(e) => handleChange("tinNumber", e.target.value)} onBlur={(e) => validateField("tinNumber", e.target.value)} />
                      </div>
                      {errors.tinNumber && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.tinNumber}</motion.p>}
                      <p className="text-[11px] text-slate-400">Required for tax purposes and payment processing</p>
                    </div>

                    {/* Certificate upload */}
                    <div className="space-y-1.5">
                      <Label htmlFor="certificateFile" className="text-[13px] font-medium text-slate-600">Worker certificate</Label>
                      <input id="certificateFile" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} onBlur={() => validateField("certificateFile", certificateFileName)} />
                      <label
                        htmlFor="certificateFile"
                        className={`flex flex-col items-center justify-center gap-1.5 w-full py-5 border rounded-xl cursor-pointer transition-all ${
                          certificateFileName
                            ? "border-green-300 bg-green-50 hover:bg-green-50/80"
                            : "border-dashed border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/30"
                        }`}
                      >
                        {certificateFileName ? (
                          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-1">
                            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                              <FileCheck className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-[13px] font-medium text-green-700 truncate max-w-[200px]">{certificateFileName}</span>
                            <span className="text-[11px] text-green-500">File attached successfully</span>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                              <Upload className="w-4 h-4 text-slate-400" />
                            </div>
                            <span className="text-[13px] font-medium text-slate-600">Click to upload document</span>
                            <span className="text-[11px] text-slate-400">PDF, JPG, or PNG · Max 5MB</span>
                          </div>
                        )}
                      </label>
                      {errors.certificateFile && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.certificateFile}</motion.p>}
                    </div>

                  </div>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full h-[44px] mt-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-none transition-all active:scale-[0.99]"
                disabled={!isFormValid}
              >
                Create account
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400 font-medium">Or continue with</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-2.5">
              <Button variant="outline" type="button" className="h-[42px] text-sm font-medium border-slate-200 bg-white hover:bg-slate-50 rounded-lg">
                <Chrome className="w-[15px] h-[15px] mr-2" />
                Google
              </Button>
              <Button variant="outline" type="button" className="h-[42px] text-sm font-medium border-slate-200 bg-white hover:bg-slate-50 rounded-lg">
                <Apple className="w-[15px] h-[15px] mr-2" />
                Apple
              </Button>
            </div>

            <p className="text-center text-[13px] text-slate-500 mt-6">
              Already have an account?{" "}
              <button type="button" onClick={onSwitchToLogin}
                className="text-blue-500 font-medium hover:underline transition-colors">
                Sign in
              </button>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
