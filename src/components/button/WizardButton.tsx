import { Button, ButtonProps } from "@mantine/core";

type WizardButtonProps = ButtonProps & {
  variant: "back" | "next" | "continue" | "submit" | "quote";
  onClick: () => void;
};

const WizardButton = ({
  variant = "next",
  onClick,
  ...props
}: WizardButtonProps) => {
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

  const config = buttonConfig[variant];

  if (!config) {
    console.error(`Invalid variant "${variant}" passed to WizardButton.`);
    return null; // Return null if the variant is invalid
  }

  return (
    <Button
      radius="md"
      onClick={onClick}
      variant={config.variant}
      color={config.color}
      style={{
        padding: "10px 24px",
        fontSize: "16px",
        fontWeight: 500,
        flex: 1,
      }}
      {...props}
    >
      {config.label}
    </Button>
  );
};

export default WizardButton;
