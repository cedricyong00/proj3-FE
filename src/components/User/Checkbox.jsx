/* eslint-disable react/prop-types */
import { UnstyledButton, Checkbox } from "@mantine/core";

function CheckboxCard({ isOwner, setIsOwner }) {
  return (
    <UnstyledButton onClick={() => setIsOwner(!isOwner)}>
      <Checkbox
        checked={isOwner}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: "pointer" } }}
        aria-hidden
        label="I am an owner of a restaurant"
      />
    </UnstyledButton>
  );
}

export default CheckboxCard;
