const OuterCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 sm:p-6 border border-gray-100 dark:border-gray-700">
      {children}
    </div>
  );
};

export default OuterCard;
