import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { ChevronLeft, Mail, CheckCircle } from "lucide-react";

interface PasswordRecoveryProps {
  onBack: () => void;
}

export function PasswordRecovery({ onBack }: PasswordRecoveryProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+৳/.test(value)) {
      setError("Invalid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-[420px]">
          <Card className="p-10 border border-slate-200/80 rounded-2xl shadow-sm bg-white text-center">

            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-full mb-5">
              <CheckCircle className="w-[22px] h-[22px] text-green-500" />
            </div>

            <h1 className="text-[20px] font-medium text-slate-900 mb-2">
              Check your email
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-1">
              We've sent a reset link to{" "}
              <span className="font-medium text-slate-800">{email}</span>
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              If you don't see it, check your spam folder.
            </p>

            <Button
              onClick={onBack}
              variant="outline"
              className="w-full h-[42px] mt-7 text-sm font-medium border-slate-200 bg-white hover:bg-slate-50 rounded-lg"
            >
              Back to sign in
            </Button>
          </Card>
        </div>
      </div>
    );
  }

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

        <Card className="p-10 border border-slate-200/80 rounded-2xl shadow-sm bg-white">

          <div className="mb-8">
            <h1 className="text-[22px] font-medium text-slate-900 mb-1.5">
              Reset password
            </h1>
            <p className="text-sm text-slate-500">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[13px] font-medium text-slate-600">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="karim@example.com"
                  className="pl-9 h-[42px] text-sm bg-slate-50 border-slate-200 rounded-lg focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => validateEmail(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-[44px] bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-none transition-all active:scale-[0.99]"
              disabled={!email}
            >
              Send reset link
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
