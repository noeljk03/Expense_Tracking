import React from 'react';
import { Expense } from '../App';

interface BudgetForecastProps {
  expenses: Expense[];
  budget: number;
}

const BudgetForecast: React.FC<BudgetForecastProps> = ({ expenses, budget }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate the average daily expense
  const oldestExpenseDate = expenses.length > 0 ? new Date(Math.min(...expenses.map(e => new Date(e.date).getTime()))) : new Date();
  const daysSinceOldestExpense = Math.max(1, Math.ceil((new Date().getTime() - oldestExpenseDate.getTime()) / (1000 * 3600 * 24)));
  const averageDailyExpense = daysSinceOldestExpense > 0 ? totalExpenses / daysSinceOldestExpense : 0;

  // Estimate days until budget depletion
  const remainingBudget = Math.max(0, budget - totalExpenses);
  const daysUntilDepletion = averageDailyExpense > 0 ? Math.floor(remainingBudget / averageDailyExpense) : Infinity;

  return (
    <div className="form-container">
      <h2 className="form-title">Budget Forecast</h2>
      <p>Average Daily Expense: ${averageDailyExpense.toFixed(2)}</p>
      <p>Estimated Days Until Budget Depletion: {daysUntilDepletion === Infinity ? 'Not applicable (no expenses)' : daysUntilDepletion}</p>
      <div className="forecast-message">
        {daysUntilDepletion > 30 ? (
          <p>Your budget is sustainable for more than a month at your current spending rate.</p>
        ) : daysUntilDepletion > 20 ? (
          <p>Your budget should last for several weeks, but consider reviewing your expenses to extend it further.</p>
        ) : (
          <p>Your current spending rate may deplete your budget quickly. Consider ways to reduce expenses or increase your budget.</p>
        )}
      </div>
    </div>
  );
};

export default BudgetForecast;
