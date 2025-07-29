import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="px-4 flex justify-between items-center h-16 bg-primary">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">💰 Expense Tracker</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
