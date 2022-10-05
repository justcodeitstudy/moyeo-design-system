import { Meta, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";
import Modal, { ModalProps } from "../../../components/Modal/Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    opened: {
      control: { type: "boolean" },
    },
  },
} as Meta;

export const Default: Story<ModalProps> = (args) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(args.opened);
  }, [args.opened]);

  return (
    <div>
      <button onClick={() => setOpened(true)}>Modal 열기</button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Modal.Content>
          <button onClick={() => setOpened(false)}>Modal 닫기</button>
          모달 내용
        </Modal.Content>
      </Modal>
    </div>
  );
};
Default.args = {
  opened: false,
};
