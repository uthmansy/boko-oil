import React, { useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

const FloatMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      <FloatButton.Group
        open={open}
        trigger="click"
        style={{ insetInlineEnd: 24 }}
        onClick={() => setOpen(!open)}
      >
        <FloatButton />
        <FloatButton>hello download</FloatButton>
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );
};

export default FloatMenu;
