import { Button, Group, Modal as ModalMantine, Text } from "@mantine/core";
import PropTypes from "prop-types";
import { useState } from "react";

function Modal({ opened, close, modalContent, toggle, handleSubmit, title }) {
  const [submitting, setSubmitting] = useState(false);

  const onClickSubmit = async () => {
    setSubmitting(true);
    await handleSubmit();
    setSubmitting(false);
  };

  return (
    <ModalMantine opened={opened} onClose={close} title={title}>
      {modalContent}
      <Text mt="md">Are you sure you want to proceed?</Text>
      <Group justify="center" mt="xl">
        <Button type="button" mt="md" variant="outline" onClick={toggle}>
          Back
        </Button>
        <Button
          type="submit"
          mt="md"
          onClick={onClickSubmit}
          loading={submitting}
        >
          Proceed
        </Button>
      </Group>
    </ModalMantine>
  );
}

export default Modal;

Modal.propTypes = {
  opened: PropTypes.bool,
  close: PropTypes.func,
  modalContent: PropTypes.node,
  toggle: PropTypes.func,
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
};
