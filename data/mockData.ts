// data/mockData.ts
export const tabs = ['Today', 'Week', 'Month', 'Quarter', 'Year'];

export const spendingData = {
  totalSpent: '₹45,670',
  averageSpending: '₹12,450',
  totalTransactions: '156'
};

export const categories = [
  { name: 'Shopping', amount: '₹12,450', percentage: '35%', color: '#FF6B6B' },
  { name: 'Food', amount: '₹8,920', percentage: '25%', color: '#4ECDC4' },
  { name: 'Transport', amount: '₹5,670', percentage: '16%', color: '#45B7D1' },
  { name: 'Entertainment', amount: '₹4,890', percentage: '14%', color: '#FFA07A' },
  { name: 'Bills', amount: '₹3,740', percentage: '10%', color: '#98D8C8' },
];

export const transactions = [
  { id: 1, name: 'Amazon Purchase', amount: '₹2,499', type: 'shopping', date: 'Today', time: '14:30' },
  { id: 2, name: 'Swiggy Food Order', amount: '₹845', type: 'food', date: 'Today', time: '12:15' },
  { id: 3, name: 'Uber Ride', amount: '₹356', type: 'transport', date: 'Today', time: '09:45' },
  { id: 4, name: 'Netflix Subscription', amount: '₹649', type: 'entertainment', date: 'Yesterday', time: '18:20' },
];

export const upcomingBills = [
  { id: 1, name: 'Electricity Bill', amount: '₹1,245', dueDate: '15 Dec' },
  { id: 2, name: 'Internet Bill', amount: '₹899', dueDate: '18 Dec' },
  { id: 3, name: 'Credit Card', amount: '₹12,670', dueDate: '20 Dec' },
];

export const fraudAlerts = [
  { id: 1, message: 'Unusual spending pattern detected', severity: 'high' },
  { id: 2, message: 'New login from unknown device', severity: 'medium' },
];

export const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'shopping': return 'cart';
    case 'food': return 'fast-food';
    case 'transport': return 'car';
    case 'entertainment': return 'film';
    default: return 'card';
  }
};

export const getTransactionColor = (type: string) => {
  switch (type) {
    case 'shopping': return '#FF6B6B';
    case 'food': return '#4ECDC4';
    case 'transport': return '#45B7D1';
    case 'entertainment': return '#FFA07A';
    default: return '#98D8C8';
  }
};

