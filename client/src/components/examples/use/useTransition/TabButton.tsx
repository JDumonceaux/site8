import { useTransition } from "react";

interface TabButtonProps {
  onClick: () => void;
}

const TabButton = ({ onClick }: TabButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      onClick?.();
    });
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  return <button onClick={handleClick} />;
};

export default TabButton;
