import OuterCard from "@/components/OuterCard";
import { cn } from "@/lib/utils";
import { ReactElement, cloneElement } from "react";

type EmptyStateCardProps = {
  icon: ReactElement<any, any>;
  iconClassName?: string;
  title: string;
  description: string;
  outerCardStyle?: string;
};

const EmptyStateCard = ({
  icon,
  iconClassName = "w-12 h-12 mx-auto",
  title,
  description,
  outerCardStyle = "",
}: EmptyStateCardProps) => {
  const renderedIcon = cloneElement(icon, {
    className: iconClassName,
  });

  return (
    <OuterCard className={cn("p-4", outerCardStyle)}>
      <div className="text-gray-400 mb-4">{renderedIcon}</div>
      <h3 className="text-sm md:text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </OuterCard>
  );
};

export default EmptyStateCard;
