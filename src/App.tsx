import React, { useState, useEffect } from 'react';
import BudgetSetter from './components/BudgetSetter';
import ExpenseForm from './components/ExpenseForm';
import ExpensesOverview from './components/ExpensesOverview';
import ExpenseList from './components/ExpenseList';
import './styles/style.css';

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
}

const App: React.FC = () => {
  const [budget, setBudget] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showBudgetWarning, setShowBudgetWarning] = useState<boolean>(false);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);

  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setShowBudgetWarning(budget > 0 && totalExpenses >= budget * 0.8);
  }, [expenses, budget]);

  const handleSetBudget = (amount: number) => {
    setBudget(amount);
  };

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setExpenses([...expenses, newExpense]);
  };

  const handleSetSavingsGoal = (amount: number) => {
    setSavingsGoal(amount);
  };

  return (
    <div className="container">
      <h1>Noel's Expense Tracker</h1>
      
      {showBudgetWarning && (
        <div className="warning-message">
          80% of the budget has been utilized
        </div>
      )}

      <BudgetSetter onSetBudget={handleSetBudget} />
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpensesOverview expenses={expenses} budget={budget} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default App;