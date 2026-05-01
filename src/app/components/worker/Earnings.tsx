import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DollarSign, TrendingUp, Clock, CheckCircle, Download, CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface EarningsProps {
  onNavigate: (page: string) => void;
}

export function Earnings({ onNavigate }: EarningsProps) {
  const summary = {
    totalEarnings: 3420,
    thisMonth: 680,
    pendingPayout: 280,
    availableBalance: 125
  };

  const transactions = [
    {
      id: "1",
      taskTitle: "Deep clean apartment",
      client: "Karim Hasan",
      amount: 110,
      platformFee: 11,
      netAmount: 99,
      status: "completed",
      date: "Jan 12, 2026",
      payoutDate: "Jan 19, 2026"
    },
    {
      id: "2",
      taskTitle: "Fix kitchen faucet",
      client: "Sarah Williams",
      amount: 75,
      platformFee: 7.5,
      netAmount: 67.5,
      status: "completed",
      date: "Jan 10, 2026",
      payoutDate: "Jan 17, 2026"
    },
    {
      id: "3",
      taskTitle: "Garden maintenance",
      client: "Emily Chen",
      amount: 60,
      platformFee: 6,
      netAmount: 54,
      status: "pending",
      date: "Jan 14, 2026",
      payoutDate: "Jan 21, 2026"
    },
    {
      id: "4",
      taskTitle: "Move furniture",
      client: "Rahim Uddin",
      amount: 95,
      platformFee: 9.5,
      netAmount: 85.5,
      status: "completed",
      date: "Jan 8, 2026",
      payoutDate: "Paid Jan 15, 2026"
    }
  ];

  const stats = [
    { label: "Total Earned", value: summary.totalEarnings, icon: DollarSign, color: "text-green-600", bgColor: "bg-green-100" },
    { label: "This Month", value: summary.thisMonth, icon: TrendingUp, color: "text-blue-600", bgColor: "bg-blue-100" },
    { label: "Pending", value: summary.pendingPayout, icon: Clock, color: "text-orange-600", bgColor: "bg-orange-100" },
    { label: "Available", value: summary.availableBalance, icon: CheckCircle, color: "text-purple-600", bgColor: "bg-purple-100" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1>Earnings</h1>
          <p className="text-muted-foreground">Track your income and transaction history</p>
        </div>
        <Select defaultValue="all-time">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Earnings Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className={`w-8 h-8 ৳{stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ৳{stat.color}`} />
                </div>
              </div>
              <h2 className={`text-3xl ৳{stat.color}`}>৳{stat.value}</h2>
            </Card>
          );
        })}
      </div>

      {/* Payout Card */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="mb-1">Available for Withdrawal</h3>
              <p className="text-3xl text-green-600 mb-1">৳{summary.availableBalance}</p>
              <p className="text-sm text-muted-foreground">
                Pending: ৳{summary.pendingPayout} (will be available in 3-7 days)
              </p>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
            Withdraw Funds
          </Button>
        </div>
      </Card>

      {/* Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2>Transaction History</h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h4 className="mb-1">{transaction.taskTitle}</h4>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>Client: {transaction.client}</span>
                    <span>•</span>
                    <span>{transaction.date}</span>
                    <span>•</span>
                    {transaction.status === "completed" ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {transaction.payoutDate}
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        Payout on {transaction.payoutDate}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-semibold text-green-600">+৳{transaction.netAmount}</p>
                  <p className="text-xs text-muted-foreground">
                    Total: ৳{transaction.amount} (Fee: ৳{transaction.platformFee})
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {transactions.filter((t) => t.status === "completed").map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="mb-1">{transaction.taskTitle}</h4>
                  <p className="text-sm text-muted-foreground">{transaction.date} • {transaction.payoutDate}</p>
                </div>
                <p className="text-xl font-semibold text-green-600">+৳{transaction.netAmount}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-3">
            {transactions.filter((t) => t.status === "pending").map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                <div className="flex-1">
                  <h4 className="mb-1">{transaction.taskTitle}</h4>
                  <p className="text-sm text-muted-foreground">
                    Completed on {transaction.date} • Payout on {transaction.payoutDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-orange-600">৳{transaction.netAmount}</p>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 mt-1">
                    Processing
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Payment Method */}
      <Card className="p-6">
        <h2 className="mb-4">Payment Method</h2>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
              BANK
            </div>
            <div>
              <p className="font-medium">Bank Account ****3456</p>
              <p className="text-sm text-muted-foreground">Primary payment method</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Change
          </Button>
        </div>
      </Card>
    </div>
  );
}
