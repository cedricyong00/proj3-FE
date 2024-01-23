/* eslint-disable react/prop-types */
import { Checkbox, Group } from "@mantine/core";

function CheckboxCard({ isOwner, setIsOwner }) {
  return (
    <Group justify="space-between" mt="lg">
      <Checkbox
        label="I am a owner of restaurant"
        checked={isOwner}
        onChange={() => {
          setIsOwner((prev) => !prev);
        }}
      />
    </Group>
  );
}

export default CheckboxCard;
