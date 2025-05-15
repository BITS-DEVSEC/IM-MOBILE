import { TextInput } from "@mantine/core";
import { Text } from "@mantine/core";

export function TextInputs({
  label,
  placeholder,
  mt,
  mb,
  mr,
  ml,
}: {
  label: string;
  placeholder: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  setValue?: (value: string) => void;
  value?: string;
  override?: boolean;
  mutator?: (value: string) => void;
}) {
  return (
    <div
      style={{
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
      }}
    >
      {label && (
        <Text size="sm" mb={4}>
          {label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        radius="md"
        size="md"
        styles={{ label: { marginBottom: 4 } }}
      />
    </div>
  );
}
