/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
  IconSettings,
} from "@tabler/icons-react";
import classes from "./HeaderTabs.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-new.png";
import useToast from "../../hooks/useToast";
import useFetch from "../../hooks/useFetch";
import { logOut } from "../../service/users";

export const Header = ({ user, setUser }) => {
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();
  const { sendRequest } = useFetch();

  const handleLogout = () => {
    try {
      const res = sendRequest(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        "POST",
        { email: user.email }
      );
      logOut();
      setUser(null);
      navigate("/");
      successToast({
        title: "See you again!",
        message: "You have successfully logged out.",
      });
    } catch (err) {
      console.log(err);
      errorToast({
        title: "Error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

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
                <Text ml="xs" fw="bold">
                  ChopeSeats
                </Text>
              </Flex>
            </Anchor>
          </Title>

          {/* Auth Buttons*/}
          {!user &&
            location.pathname !== "/signin" &&
            location.pathname !== "/signup" && (
              <Group>
                <Button variant="outline" component={Link} to="/signin">
                  Log in
                </Button>
                <Button component={Link} to="/signup">
                  Sign up
                </Button>
              </Group>
            )}

          {/* User Menu */}
          {user && (
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
                      Hello {user?.name}!
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

                {user.isOwner && (
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
                      Your Guests
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
                <Menu.Item
                  component={Link}
                  to="/account"
                  leftSection={
                    <IconSettings
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Account settings
                </Menu.Item>

                <Menu.Item
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Container>
    </div>
  );
};
