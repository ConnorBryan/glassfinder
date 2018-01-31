import React from "react";
import PropTypes from "prop-types";
import { TransitionablePortal, Label, Segment } from "semantic-ui-react";

function Notification({ dismiss, message }) {
  return (
    <TransitionablePortal open>
      <Segment
        color="blue"
        style={{
          position: "fixed",
          zIndex: 1000,
          width: "40%",
          left: "30%",
          top: "10%"
        }}
      >
        <Label
          {...{
            as: "a",
            color: "blue",
            corner: "right",
            icon: "close",
            onClick: dismiss
          }}
        />
        <span style={{ fontSize: "1.2rem" }}>{message}</span>
      </Segment>
    </TransitionablePortal>
  );
}

Notification.propTypes = {
  dismiss: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default Notification;
