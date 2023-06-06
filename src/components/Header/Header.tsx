import React, { useRef } from "react";
import {
  Dropdown,
  Popover,
  Whisper,
  WhisperInstance,
  Stack,
  Avatar,
} from "rsuite";
import useUserStore from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";

const renderAdminSpeaker = ({ onClose, left, top, className }: any, ref) => {
  const currentUser = useUserStore(state => state.currentUser);
  const logout = useUserStore(state => state.logout);
  const navigate = useNavigate();
  const handleSelect = async eventKey => {
    if (eventKey == "SignOut") {
      await logout();
      navigate("/sign-in");
    }

    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          <strong>{currentUser?.username}</strong>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item eventKey="SignOut">Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const Header = () => {
  const trigger = useRef<WhisperInstance>(null);

  return (
    <Stack className="header" spacing={8}>
      <Whisper
        placement="bottomEnd"
        trigger="click"
        ref={trigger}
        speaker={renderAdminSpeaker}
      >
        <Avatar
          size="sm"
          circle
          src="https://avatars.githubusercontent.com/u/1203827"
          alt="@simonguo"
          style={{ marginLeft: 8 }}
        />
      </Whisper>
    </Stack>
  );
};

export default Header;
