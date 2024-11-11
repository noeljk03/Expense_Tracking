import React, { useState } from 'react';
import { Expense } from '../App';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleAddExpense = () => {
    const expenseAmount = parseFloat(amount);
    if (category && !isNaN(expenseAmount) && expenseAmount > 0 && date) {
      onAddExpense({
        category,
        amount: expenseAmount,
        date,
      });
      setCategory('');
      setAmount('');
      setDate('');
    }
  };

  return (
    <div className="form-container expense-form">
      <h2 className="form-title">Add Expense</h2>
      <div className="form-group">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="form-input"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="form-input"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <button onClick={handleAddExpense} className="form-button">Add Expense</button>
    </div>
  );
};

export default ExpenseForm;