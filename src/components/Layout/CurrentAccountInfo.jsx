/* eslint-disable react/prop-types */
import { Text, Box, Stack, rem } from '@mantine/core';
import classes from '../Layout/CurrentAccountInfo.module.css';

function AccountInformation({ icon: Icon, title, description, ...others }) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
//   { title: 'Email', description: 'hello@mantine.dev', icon: IconAt },
//   { title: 'Phone', description: '+49 (800) 335 35 35', icon: IconPhone },
//   { title: 'Address', description: '844 Morris Park avenue', icon: IconMapPin },
//   { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: IconSun },
];

export function AccountInformationList() {
  const items = MOCKDATA.map((item, index) => <AccountInformation key={index} {...item} />);
  return <Stack>{items}</Stack>;
}
