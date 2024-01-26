/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  Checkbox,
} from "@mantine/core";
import { AccountInformationList } from "../../components/Layout/CurrentAccountInfo";
import classes from "../../components/Layout/CurrentAccountInfo.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import useFetch from "../../hooks/useFetch";
import useToast from "../../hooks/useToast";
import { useDisclosure } from "@mantine/hooks";


function EditAccount() {
  //Handle change in form fields
  const [email, setEmail] = useState("");
  const [opened, { toggle, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [isOwner, setIsOwner] = useState(true);
  const { sendRequest } = useFetch();
  const { successToast, errorToast } = useToast();
  //Navigate
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userUpdatedDetails = {
    user: user.user,
    email: email,
    isOwner: isOwner,
    name: name,
    id: user.id
  };

  //Update button
  const handleUpdate = async () => {
    try {
      const res = await sendRequest(
        `${import.meta.env.VITE_API_URL}/user/${user._id}`,
        "POST",
        userUpdatedDetails
      );
      console.log(res);
      navigate("/account");
      close();
      successToast({
        title: "Restaurant Info Successfully Updated!",
        message: "Your restaurant is now listed and available for reservations",
      });
    } catch (err) {
      console.log(err);
      close();
      errorToast();
    } finally {
      close();
    }
  };

  //Back button
  const back = (e) => {
    e.preventDefault();
    navigate("/account");
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.wrapper}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
            <div>
              <Title className={classes.title}>
                Current Account Information
              </Title>
              <Text className={classes.description} mt="sm" mb={30}></Text>

              <AccountInformationList />
            </div>
            <div className={classes.form}>
              <TextInput
                label="Email"
                value={user.email}
                classNames={{ input: classes.input, label: classes.inputLabel }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextInput
                label="Name"
                value={user.name}
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
                onChange={(e) => setName(e.target.value)}
              />

              <br />

              <Group justify="space-between" mt="lg">
                <Checkbox
                  label="I am a owner of restaurant"
                  checked={user.isOwner}
                  onChange={() => {
                    setIsOwner((prev) => !prev);
                  }}
                />
              </Group>

              <Group justify="flex-end" mt="md">
                <Button className={classes.control} onClick={handleUpdate}>
                  Update
                </Button>
              </Group>

              <Group justify="flex-end" mt="md">
                <Button className={classes.control} onClick={back}>
                  Back
                </Button>
              </Group>
            </div>
          </SimpleGrid>
        </div>
      )}
    </>
  );
}

export default EditAccount;
