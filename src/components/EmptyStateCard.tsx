import { ReactElement, cloneElement } from "react";

type EmptyStateCardProps = {
  icon: ReactElement<any, any>;
  iconClassName?: string;
  title: string;
  description: string;
};

const EmptyStateCard = ({
  icon,
  iconClassName = "w-12 h-12 mx-auto",
  title,
  description,
}: EmptyStateCardProps) => {
  const renderedIcon = cloneElement(icon, {
    className: iconClassName,
  });

  return (
    <div className="card text-center py-12">
      <div className="text-gray-400 mb-4">{renderedIcon}</div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default EmptyStateCard;
