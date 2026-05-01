import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { ChevronLeft, Eye, EyeOff, Mail, Lock, Chrome, Apple } from "lucide-react";
import { motion } from "motion/react";

interface LoginProps {
  role: "client" | "worker" | "admin";
  onLogin: () => void;
  onBack: () => void;
  onSwitchToSignUp?: () => void;
  onForgotPassword: () => void;
}

export function Login({ role, onLogin, onBack, onSwitchToSignUp, onForgotPassword }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    switch (field) {
      case "email":
        if (!value.trim()) newErrors.email = "Email is required";
        else delete newErrors.email;
        break;
      case "password":
        if (!value) newErrors.password = "Password is required";
        else delete newErrors.password;
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateField("email", formData.email);
    validateField("password", formData.password);
    if (formData.email && formData.password && Object.keys(errors).length === 0) {
      onLogin();
    }
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[420px]">

        {role !== "admin" && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="p-10 border border-slate-200/80 rounded-2xl shadow-sm bg-white">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-[22px] font-medium text-slate-900 mb-1.5">
                {role === "admin" ? "Admin login" : `Sign in as ${role === "client" ? "client" : "worker"}`}
              </h1>
              <p className="text-sm text-slate-500">
                Welcome back! Enter your details to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[13px] font-medium text-slate-600">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none transition-colors peer-focus:text-blue-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="karim@example.com"
                    className="peer pl-9 h-[42px] text-sm bg-slate-50 border-slate-200 rounded-lg focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={(e) => validateField("email", e.target.value)}
                  />
                </div>
                {errors.email && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.email}</motion.p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[13px] font-medium text-slate-600">Password</Label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-[13px] text-blue-500 hover:text-blue-400 hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-9 pr-10 h-[42px] text-sm bg-slate-50 border-slate-200 rounded-lg focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={(e) => validateField("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-[15px] h-[15px]" /> : <Eye className="w-[15px] h-[15px]" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-destructive">{errors.password}</motion.p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-[44px] mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-none transition-all active:scale-[0.99]"
                disabled={!isFormValid}
              >
                Sign in
              </Button>
            </form>

            {role !== "admin" && (
              <>
                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-xs text-slate-400 font-medium">Or continue with</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="outline"
                    type="button"
                    className="h-[42px] text-sm font-medium border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-all"
                  >
                    <Chrome className="w-[15px] h-[15px] mr-2" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="h-[42px] text-sm font-medium border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-all"
                  >
                    <Apple className="w-[15px] h-[15px] mr-2" />
                    Apple
                  </Button>
                </div>

                {/* Sign up */}
                {onSwitchToSignUp && (
                  <p className="text-center text-[13px] text-slate-500 mt-7">
                    Don't have an account?{" "}
                    <button
                      onClick={onSwitchToSignUp}
                      className="text-blue-500 font-medium hover:underline transition-colors"
                    >
                      Sign up
                    </button>
                  </p>
                )}
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
