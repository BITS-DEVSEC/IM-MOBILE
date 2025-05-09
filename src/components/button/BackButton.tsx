import React from "react";
import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="subtle"
      leftSection={<ArrowLeft size={16} />}
      onClick={onClick}
    >
      Back
    </Button>
  );
};

export default BackButton;
