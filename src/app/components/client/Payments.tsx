import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  CreditCard,
  Plus,
  Trash2,
  Calendar,
  DollarSign,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Wallet,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface PaymentsProps {
  onNavigate: (page: string) => void;
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank";
  name: string;
  last4?: string;
  expiry?: string;
  isDefault: boolean;
  brand?: string;
}

interface Transaction {
  id: string;
  type: "payment" | "refund" | "fee";
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  taskId?: string;
  workerName?: string;
  paymentMethod?: string;
}

export function Payments({ onNavigate }: PaymentsProps) {
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showPaymentDetail, setShowPaymentDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPeriod, setFilterPeriod] = useState<string>("all");

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", type: "card", name: "Visa ending in 4242", last4: "4242", expiry: "12/25", isDefault: true, brand: "visa" },
    { id: "2", type: "card", name: "Mastercard ending in 5555", last4: "5555", expiry: "09/26", isDefault: false, brand: "mastercard" },
    { id: "3", type: "paypal", name: "PayPal (karim@email.com)", isDefault: false },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "payment", description: "Payment for Fix leaking kitchen faucet", amount: 88.00, status: "completed", date: "Jan 11, 2026", taskId: "1", workerName: "Rahim Uddin", paymentMethod: "Visa •••• 4242" },
    { id: "2", type: "payment", description: "Payment for Garden maintenance and lawn mowing", amount: 66.00, status: "completed", date: "Jan 7, 2026", taskId: "5", workerName: "Tom Anderson", paymentMethod: "Visa •••• 4242" },
    { id: "3", type: "payment", description: "Payment for Help move furniture to new apartment", amount: 110.00, status: "completed", date: "Jan 10, 2026", taskId: "3", workerName: "Sarah Williams", paymentMethod: "Visa •••• 4242" },
    { id: "4", type: "fee", description: "Platform fee for completed task", amount: 8.80, status: "completed", date: "Jan 11, 2026", paymentMethod: "Visa •••• 4242" },
    { id: "5", type: "payment", description: "Pending payment for Deep clean 2-bedroom apartment", amount: 132.00, status: "pending", date: "Jan 12, 2026", taskId: "2", workerName: "Jessica Brown", paymentMethod: "Visa •••• 4242" },
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "card" as "card" | "paypal" | "bank",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((m) => m.id !== id));
  };

  const handleAddPaymentMethod = () => {
    const newMethod: PaymentMethod = {
      id: String(paymentMethods.length + 1),
      type: newPaymentMethod.type,
      name: newPaymentMethod.type === "card" ? `Card ending in ${newPaymentMethod.cardNumber.slice(-4)}` : newPaymentMethod.type === "paypal" ? "PayPal Account" : "Bank Account",
      last4: newPaymentMethod.type === "card" ? newPaymentMethod.cardNumber.slice(-4) : undefined,
      expiry: newPaymentMethod.type === "card" ? newPaymentMethod.expiry : undefined,
      isDefault: paymentMethods.length === 0,
      brand: newPaymentMethod.type === "card" ? "visa" : undefined,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddPaymentMethod(false);
    setNewPaymentMethod({ type: "card", cardNumber: "", cardName: "", expiry: "", cvv: "" });
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    return true;
  });

  const totalSpent = transactions.filter((t) => t.type === "payment" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0);
  const pendingPayments = transactions.filter((t) => t.status === "pending").length;

  const handleViewTransactionDetail = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowPaymentDetail(true);
  };

  const inputClass = "h-[44px] text-[15px] bg-slate-50 border-slate-200 rounded-xl mt-1.5 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-semibold text-slate-900">Payments</h1>
          <p className="text-[15px] text-slate-500">Manage your payment methods and transaction history</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-purple-100 bg-gradient-to-br from-purple-50 to-violet-100/60 rounded-2xl shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-purple-500 mb-1">Total spent</p>
              <h2 className="text-[28px] font-bold text-purple-700">৳{totalSpent.toFixed(2)}</h2>
            </div>
            <div className="w-11 h-11 bg-purple-200/60 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/60 rounded-2xl shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-blue-500 mb-1">Payment methods</p>
              <h2 className="text-[28px] font-bold text-blue-700">{paymentMethods.length}</h2>
            </div>
            <div className="w-11 h-11 bg-blue-200/60 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5 border-orange-100 bg-gradient-to-br from-orange-50 to-amber-100/60 rounded-2xl shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-orange-500 mb-1">Pending payments</p>
              <h2 className="text-[28px] font-bold text-orange-700">{pendingPayments}</h2>
            </div>
            <div className="w-11 h-11 bg-orange-200/60 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="methods" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md h-[50px] rounded-2xl bg-slate-100 p-1">
          <TabsTrigger value="methods" className="rounded-xl text-[15px] font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
            Payment methods
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl text-[15px] font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
            Transaction history
          </TabsTrigger>
        </TabsList>

        {/* Payment Methods */}
        <TabsContent value="methods" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-slate-900">Your payment methods</h2>
            <Button
              onClick={() => setShowAddPaymentMethod(true)}
              className="h-[42px] px-5 text-[14px] bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-none"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add method
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="p-5 border-slate-100 rounded-2xl shadow-none hover:shadow-md hover:border-slate-200 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      method.type === "card" ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                      : method.type === "paypal" ? "bg-gradient-to-br from-sky-400 to-blue-500"
                      : "bg-gradient-to-br from-green-500 to-emerald-600"
                    }`}>
                      {method.type === "card" ? <CreditCard className="w-5 h-5 text-white" />
                       : method.type === "paypal" ? <Wallet className="w-5 h-5 text-white" />
                       : <DollarSign className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-slate-900">{method.name}</p>
                      {method.expiry && (
                        <p className="text-[13px] text-slate-400">Expires {method.expiry}</p>
                      )}
                    </div>
                  </div>
                  {method.isDefault && (
                    <Badge className="bg-green-50 text-green-600 hover:bg-green-50 text-[12px] font-medium rounded-full px-3 border-0">
                      Default
                    </Badge>
                  )}
                </div>

                <Separator className="my-3 bg-slate-100" />

                <div className="flex gap-2 pt-1">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-[36px] text-[13px] border-slate-200 rounded-xl hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all"
                      onClick={() => handleSetDefaultPaymentMethod(method.id)}
                    >
                      Set as default
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-[36px] w-[36px] p-0 border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                    onClick={() => handleDeletePaymentMethod(method.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {paymentMethods.length === 0 && (
            <Card className="p-14 text-center rounded-2xl border-slate-100 bg-slate-50">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-[18px] font-semibold text-slate-700 mb-1">No payment methods</h3>
              <p className="text-[14px] text-slate-400 mb-5">Add a payment method to start paying for tasks</p>
              <Button
                onClick={() => setShowAddPaymentMethod(true)}
                className="h-[44px] px-6 text-[15px] bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add your first method
              </Button>
            </Card>
          )}

          {/* Security notice */}
          <Card className="p-4 border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-none">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-green-800 mb-0.5">Your payments are secure</p>
                <p className="text-[13px] text-green-700 leading-relaxed">
                  All payment information is encrypted and processed securely. We never store your full card details on our servers.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Transaction History */}
        <TabsContent value="history" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-[18px] font-semibold text-slate-900">Transaction history</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[160px] h-[42px] text-[14px] rounded-xl border-slate-200 bg-white">
                  <Filter className="w-4 h-4 mr-2 text-slate-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-[42px] px-4 text-[14px] border-slate-200 rounded-xl bg-white hover:bg-slate-50">
                <Download className="w-4 h-4 mr-2 text-slate-400" />
                Export
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="p-4 border-slate-100 rounded-2xl hover:shadow-md hover:border-slate-200 transition-all cursor-pointer"
                onClick={() => handleViewTransactionDetail(transaction)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      transaction.type === "payment" ? "bg-red-50"
                      : transaction.type === "refund" ? "bg-green-50"
                      : "bg-slate-100"
                    }`}>
                      {transaction.type === "payment" ? <ArrowUpRight className="w-5 h-5 text-red-500" />
                       : transaction.type === "refund" ? <ArrowDownLeft className="w-5 h-5 text-green-500" />
                       : <DollarSign className="w-5 h-5 text-slate-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-slate-900 mb-1 truncate">{transaction.description}</p>
                      <div className="flex flex-wrap items-center gap-2 text-[13px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />{transaction.date}
                        </span>
                        {transaction.workerName && <><span>·</span><span>{transaction.workerName}</span></>}
                        {transaction.paymentMethod && <><span>·</span><span>{transaction.paymentMethod}</span></>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className={`text-[17px] font-bold mb-1.5 ${transaction.type === "payment" ? "text-red-500" : "text-green-500"}`}>
                      {transaction.type === "payment" || transaction.type === "fee" ? "−" : "+"}৳{transaction.amount.toFixed(2)}
                    </p>
                    {transaction.status === "completed" && (
                      <Badge className="bg-green-50 text-green-600 hover:bg-green-50 text-[12px] font-medium rounded-full px-2.5 border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />Completed
                      </Badge>
                    )}
                    {transaction.status === "pending" && (
                      <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 text-[12px] font-medium rounded-full px-2.5 border-0">
                        <Clock className="w-3 h-3 mr-1" />Pending
                      </Badge>
                    )}
                    {transaction.status === "failed" && (
                      <Badge className="bg-red-50 text-red-600 hover:bg-red-50 text-[12px] font-medium rounded-full px-2.5 border-0">
                        <AlertCircle className="w-3 h-3 mr-1" />Failed
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <Card className="p-14 text-center rounded-2xl border-slate-100 bg-slate-50">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-[18px] font-semibold text-slate-700 mb-1">No transactions found</h3>
              <p className="text-[14px] text-slate-400">Your transaction history will appear here once you complete tasks</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Payment Method Dialog */}
      <Dialog open={showAddPaymentMethod} onOpenChange={setShowAddPaymentMethod}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-semibold text-slate-900">Add payment method</DialogTitle>
            <DialogDescription className="text-[14px] text-slate-500">Add a new payment method to your account</DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => { e.preventDefault(); handleAddPaymentMethod(); }} className="space-y-4 mt-1">
            <div className="space-y-1.5">
              <Label className="text-[14px] font-medium text-slate-700">Payment type</Label>
              <Select value={newPaymentMethod.type} onValueChange={(v) => setNewPaymentMethod({ ...newPaymentMethod, type: v as "card" | "paypal" | "bank" })}>
                <SelectTrigger className="h-[44px] text-[15px] rounded-xl border-slate-200 bg-slate-50 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit / Debit card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank account</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newPaymentMethod.type === "card" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="cardNumber" className="text-[14px] font-medium text-slate-700">Card number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className={inputClass}
                    value={newPaymentMethod.cardNumber}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cardNumber: e.target.value })}
                    maxLength={19} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cardName" className="text-[14px] font-medium text-slate-700">Cardholder name</Label>
                  <Input id="cardName" placeholder="Karim Hasan" className={inputClass}
                    value={newPaymentMethod.cardName}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cardName: e.target.value })}
                    required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="expiry" className="text-[14px] font-medium text-slate-700">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" className={inputClass}
                      value={newPaymentMethod.expiry}
                      onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, expiry: e.target.value })}
                      maxLength={5} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cvv" className="text-[14px] font-medium text-slate-700">CVV</Label>
                    <Input id="cvv" placeholder="123" type="password" className={inputClass}
                      value={newPaymentMethod.cvv}
                      onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cvv: e.target.value })}
                      maxLength={4} required />
                  </div>
                </div>
              </>
            )}

            {newPaymentMethod.type === "paypal" && (
              <Card className="p-5 bg-blue-50 border-blue-100 rounded-2xl text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-[14px] text-slate-600">You will be redirected to PayPal to connect your account</p>
              </Card>
            )}

            {newPaymentMethod.type === "bank" && (
              <Card className="p-5 bg-slate-50 border-slate-100 rounded-2xl space-y-3">
                <p className="text-[14px] text-slate-500">You will need to verify your bank account before using it for payments</p>
                <Input placeholder="Account number" className={inputClass} />
                <Input placeholder="Routing number" className={inputClass} />
              </Card>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline"
                className="flex-1 h-[44px] text-[15px] border-slate-200 rounded-xl hover:bg-slate-50"
                onClick={() => setShowAddPaymentMethod(false)}>
                Cancel
              </Button>
              <Button type="submit"
                className="flex-1 h-[44px] text-[15px] bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-none">
                Add method
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Transaction Detail Dialog */}
      <Dialog open={showPaymentDetail} onOpenChange={setShowPaymentDetail}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-semibold text-slate-900">Transaction details</DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4 mt-1">
              <Card className={`p-5 rounded-2xl border-0 ${
                selectedTransaction.type === "payment" ? "bg-red-50" : "bg-green-50"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] text-slate-500 font-medium">Amount</span>
                  <span className={`text-[26px] font-bold ${selectedTransaction.type === "payment" ? "text-red-600" : "text-green-600"}`}>
                    {selectedTransaction.type === "payment" || selectedTransaction.type === "fee" ? "−" : "+"}৳{selectedTransaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-slate-500 font-medium">Status</span>
                  {selectedTransaction.status === "completed" && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-full text-[13px] border-0">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />Completed
                    </Badge>
                  )}
                  {selectedTransaction.status === "pending" && (
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 rounded-full text-[13px] border-0">
                      <Clock className="w-3.5 h-3.5 mr-1" />Pending
                    </Badge>
                  )}
                </div>
              </Card>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl divide-y divide-slate-100 overflow-hidden">
                {[
                  { label: "Description", value: selectedTransaction.description },
                  { label: "Date", value: selectedTransaction.date },
                  ...(selectedTransaction.workerName ? [{ label: "Worker", value: selectedTransaction.workerName }] : []),
                  ...(selectedTransaction.paymentMethod ? [{ label: "Payment method", value: selectedTransaction.paymentMethod }] : []),
                  ...(selectedTransaction.taskId ? [{ label: "Task ID", value: `#${selectedTransaction.taskId}` }] : []),
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-start px-4 py-3 gap-4">
                    <span className="text-[13px] text-slate-400 font-medium shrink-0">{row.label}</span>
                    <span className="text-[14px] text-slate-800 text-right">{row.value}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full h-[44px] text-[15px] bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-none"
                onClick={() => setShowPaymentDetail(false)}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}