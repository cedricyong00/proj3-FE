/* eslint-disable react/prop-types */
import { UnstyledButton, Checkbox, Text } from '@mantine/core';
import classes from './Checkbox.module.css';

function CheckboxCard({isOwner, setIsOwner}) {

  return (
    <UnstyledButton onClick={() => setIsOwner(!isOwner)} className={classes.button}>
      <Checkbox
        checked={isOwner}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: 'pointer' } }}
        aria-hidden
      />

      <div>
        <Text fw={500} mb={7} lh={1}>
        Owner of a restaurant
        </Text>
      </div>
    </UnstyledButton>
  );
}

export default CheckboxCard