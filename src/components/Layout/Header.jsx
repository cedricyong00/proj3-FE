import cx from "clsx";
import { useState } from "react";
import {
  Container,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  useMantineTheme,
  Button,
  Title,
  Image,
  Flex,
  Anchor,
} from "@mantine/core";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconChevronDown,
  IconMapPin,
} from "@tabler/icons-react";
import classes from "./HeaderTabs.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const dummyUser = {
  name: "John Doe",
  email: "janspoon@fighter.dev",
  isOwner: true,
};

export const Header = () => {
  const theme = useMantineTheme();
  // const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Title
            order={1}
            style={{
              color: theme.colors.blue[6],
              textDecoration: "none",
              fontWeight: 400,
              fontSize: "20px",
            }}
          >
            <Anchor component={Link} to="/" underline="never">
              <Flex justify="space-between" direction="row" align="center">
                <Image src={logo} w={30} h={30} />
                <Text>ChopeSeats</Text>
              </Flex>
            </Anchor>
          </Title>

          {/* Auth Buttons*/}
          {!dummyUser && (
            <Group visibleFrom="sm">
              <Button variant="default" component={Link} to="/signin">
                Log in
              </Button>
              <Button component={Link} to="/signup">
                Sign up
              </Button>
            </Group>
          )}

          {/* User Menu */}
          {dummyUser && (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      Hello {dummyUser.name}!
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  component={Link}
                  to="/account/bookings"
                  leftSection={
                    <IconHeart
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Your Bookings
                </Menu.Item>
                {dummyUser.isOwner && (
                  <>
                    <Menu.Item
                      component={Link}
                      to="/owner/bookings"
                      leftSection={
                        <IconStar
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.yellow[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Your Bookings (For Owner)
                    </Menu.Item>
                    <Menu.Item
                      component={Link}
                      to="/owner/restaurant"
                      leftSection={
                        <IconMapPin
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.blue[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Your Restaurant
                    </Menu.Item>
                  </>
                )}

                {/* IceBox */}
                {/* <Menu.Item
                leftSection={
                  <IconSettings
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Account settings
              </Menu.Item> */}

                <Menu.Item
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Logout
                </Menu.Item>

                {/* Icebox */}
                {/* <Menu.Item
                color="red"
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Delete account
              </Menu.Item> */}
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Container>
    </div>
  );
};
