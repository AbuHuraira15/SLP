import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { User, Wrench, ChevronLeft } from "lucide-react";

interface RoleSelectionProps {
  onSelectRole: (role: "client" | "worker") => void;
  onSelectRoleForLogin: (role: "client" | "worker") => void;
  onBack: () => void;
}

export function RoleSelection({ onSelectRole, onSelectRoleForLogin, onBack }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">

        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-[22px] font-medium text-slate-900 mb-1.5">
            Choose your role
          </h1>
          <p className="text-sm text-slate-500">
            How would you like to use MiniMates?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Client Card */}
          <Card className="p-8 border-slate-200 bg-white rounded-2xl shadow-sm transition-all hover:border-blue-300 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.06)]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-13 h-13 w-[52px] h-[52px] bg-blue-50 rounded-[14px] mb-5">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-base font-medium text-slate-900 mb-1.5">I'm a client</h2>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                I need help with tasks and want to hire workers
              </p>
              <ul className="text-sm text-left space-y-2.5 mb-6">
                {["Post unlimited tasks", "Get competitive bids", "Secure payments", "Rate & review workers"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                <Button
                  className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-none transition-all active:scale-[0.99]"
                  onClick={(e) => { e.stopPropagation(); onSelectRole("client"); }}
                >
                  Sign up as client
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-10 text-sm font-medium border-slate-200 bg-white hover:bg-slate-50 rounded-lg"
                  onClick={(e) => { e.stopPropagation(); onSelectRoleForLogin("client"); }}
                >
                  Login as client
                </Button>
              </div>
            </div>
          </Card>

          {/* Worker Card */}
          <Card className="p-8 border-slate-200 bg-white rounded-2xl shadow-sm transition-all hover:border-green-300 hover:shadow-[0_0_0_4px_rgba(34,197,94,0.06)]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-[52px] h-[52px] bg-green-50 rounded-[14px] mb-5">
                <Wrench className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-base font-medium text-slate-900 mb-1.5">I'm a worker</h2>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                I want to find work and earn money by completing tasks
              </p>
              <ul className="text-sm text-left space-y-2.5 mb-6">
                {["Browse nearby tasks", "Flexible schedule", "Fast payouts", "Build your reputation"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-100 flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-green-700" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                <Button
                  className="w-full h-10 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-none transition-all active:scale-[0.99]"
                  onClick={(e) => { e.stopPropagation(); onSelectRole("worker"); }}
                >
                  Sign up as worker
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-10 text-sm font-medium border-slate-200 bg-white hover:bg-slate-50 rounded-lg"
                  onClick={(e) => { e.stopPropagation(); onSelectRoleForLogin("worker"); }}
                >
                  Login as worker
                </Button>
              </div>
            </div>
          </Card>

        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          You can switch roles anytime in your account settings
        </p>
      </div>
    </div>
  );
}
