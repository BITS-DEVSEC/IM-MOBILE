import { Button, ButtonProps } from "@mantine/core";

type WizardButtonProps = ButtonProps & {
  variant: "back" | "next" | "continue" | "submit" | "quote";
  onClick: () => void;
};

const WizardButton = ({ variant, onClick, ...props }: WizardButtonProps) => {
  const buttonConfig = {
    back: {
      label: "Back",
      color: "gray",
      variant: "outline",
    },
    next: {
      label: "Next",
      color: "#7E4005",
      variant: "filled",
    },
    continue: {
      label: "Continue",
      color: "#7E4005",
      variant: "filled",
    },
    quote: {
      label: "Get Quote",
      color: "#7E4005",
      variant: "filled",
    },
    submit: {
      label: "Submit Application",
      color: "#7E4005",
      variant: "filled",
    },
  };

  return (
    <Button
      radius="md"
      onClick={onClick}
      variant={buttonConfig[variant].variant}
      color={buttonConfig[variant].color}
      style={{
        padding: "10px 24px",
        fontSize: "16px",
        fontWeight: 500,
        flex: 1,
      }}
      {...props}
    >
      {buttonConfig[variant].label}
    </Button>
  );
};

export default WizardButton;
