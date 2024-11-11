import React, { useState } from 'react';
import { Expense } from '../App';

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const [sortBy, setSortBy] = useState<keyof Expense>('date');

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'amount') return b.amount - a.amount;
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="form-container expense-list">
      <h2 className="form-title">Expense List</h2>
      <div className="sort-control">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as keyof Expense)}
          className="sort-select"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>
                {expense.category}
              </td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;