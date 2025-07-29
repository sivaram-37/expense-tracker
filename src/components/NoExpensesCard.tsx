import { Tag } from "lucide-react";

const NoExpensesCard = () => {
  return (
    <div className="card text-center py-12">
      <div className="text-gray-400 mb-4">
        <Tag className="w-12 h-12 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No expenses yet</h3>
      <p className="text-gray-500 dark:text-gray-400">
        Add your first expense to get started tracking your spending.
      </p>
    </div>
  );
};

export default NoExpensesCard;
