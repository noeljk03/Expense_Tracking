import React, { useState } from 'react';

interface BudgetSetterProps {
  onSetBudget: (amount: number) => void;
}

const BudgetSetter: React.FC<BudgetSetterProps> = ({ onSetBudget }) => {
  const [budgetInput, setBudgetInput] = useState<string>('');

  const handleSetBudget = () => {
    const budgetAmount = parseFloat(budgetInput);
    if (!isNaN(budgetAmount) && budgetAmount > 0) {
      onSetBudget(budgetAmount);
      setBudgetInput('');
    }
  };

  return (
    <div className="form-container budget-setter">
      <h2 className="form-title">Set Monthly Budget</h2>
      <div className="form-group">
        <input
          type="number"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
          placeholder="Enter budget amount"
          className="form-input"
        />
        <button onClick={handleSetBudget} className="form-button">Set Budget</button>
      </div>
    </div>
  );
};

export default BudgetSetter;