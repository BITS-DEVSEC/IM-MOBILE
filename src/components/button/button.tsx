import { Button, Flex, Text } from "@mantine/core";

export default function CustomButton({
  render,
  label,
  icon,
  ltr,
  rtl,
  action,
  altColor,
  custColor,
  props,
  loading,
  altSize,
}: {
  render?: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  ltr?: boolean;
  rtl?: boolean;
  action?: () => void;
  altColor?: boolean;
  custColor?: string;
  props?: { mt?: string; mb?: string };
  loading?: boolean;
  altSize?: boolean;
}) {
  return (
    <Button
      {...props}
      fullWidth
      onClick={action ? action : () => {}}
      px="md"
      style={{ borderRadius: 5 }}
      h={50}
      color={altColor ? "white" : custColor || "primary"}
      variant={altColor ? "default" : "filled"}
      loading={loading}
    >
      {render ? (
        render
      ) : (
        <Flex
          style={{ width: altSize ? "70vw" : "80vw" }}
          align="center"
          justify={!ltr && !rtl ? "center" : "space-between"}
          direction={ltr ? "row" : rtl ? "row-reverse" : "row"}
        >
          <Text fw={700} size="sm">
            {label}
          </Text>
          {icon || <></>}
        </Flex>
      )}
    </Button>
  );
}
