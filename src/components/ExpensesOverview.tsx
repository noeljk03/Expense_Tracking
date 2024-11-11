import React from 'react';
import { Expense } from '../App';

interface ExpensesOverviewProps {
  expenses: Expense[];
  budget: number;
}

const ExpensesOverview: React.FC<ExpensesOverviewProps> = ({ expenses, budget }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <div className="form-container expenses-overview">
      <h2 className="form-title">Expenses Overview</h2>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
    </div>
  );
};

export default ExpensesOverview;