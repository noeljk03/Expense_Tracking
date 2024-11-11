import React, { useState } from 'react';
import { Expense } from '../App';

interface SavingsGoalProps {
  onSetSavingsGoal: (amount: number) => void;
  savingsGoal: number;
  budget: number;
  expenses: Expense[];
}

const SavingsGoal: React.FC<SavingsGoalProps> = ({ onSetSavingsGoal, savingsGoal, budget, expenses }) => {
  const [goalInput, setGoalInput] = useState<string>('');

  const handleSetGoal = () => {
    const goalAmount = parseFloat(goalInput);
    if (!isNaN(goalAmount) && goalAmount > 0) {
      onSetSavingsGoal(goalAmount);
      setGoalInput('');
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const currentSavings = budget - totalExpenses;
  const progress = (currentSavings / savingsGoal) * 100;

  return (
    <div className="form-container savings-goal">
      <h2 className="form-title">Savings Goal</h2>
      <div className="form-group">
        <input
          type="number"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          placeholder="Enter savings goal"
          className="form-input"
        />
        <button onClick={handleSetGoal} className="form-button">Set Goal</button>
      </div>
      {savingsGoal > 0 && (
        <div className="savings-progress">
          <p>Goal: ${savingsGoal.toFixed(2)}</p>
          <p>Current Savings: ${currentSavings.toFixed(2)}</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}></div>
          </div>
          <p>Progress: {Math.min(100, Math.max(0, progress)).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default SavingsGoal;