import React from "react";
import PropTypes from "prop-types";
import {
  TransitionablePortal,
  Icon,
  Responsive,
  Label,
  Segment
} from "semantic-ui-react";
import Aux from "react-aux";

function Notification({ dismiss, message }) {
  const interior = (
    <Aux>
      <Label
        {...{
          as: "a",
          color: "blue",
          corner: "right",
          icon: "close",
          onClick: dismiss
        }}
      />
      <Icon name="envelope" />
      <span style={{ fontSize: "1.2rem", marginLeft: "1rem" }}>{message}</span>
    </Aux>
  );

  return (
    <Aux>
      <Responsive
        as={TransitionablePortal}
        maxWidth={Responsive.onlyMobile.maxWidth}
        open
      >
        <Segment
          inverted
          style={{
            border: "1px solid white",
            position: "fixed",
            zIndex: 1000,
            width: "80%",
            left: "10%",
            top: "10%"
          }}
          content={interior}
        />
      </Responsive>
      <Responsive
        as={TransitionablePortal}
        minWidth={Responsive.onlyTablet.minWidth}
        open
      >
        <Segment
          inverted
          style={{
            border: "1px solid white",
            position: "fixed",
            zIndex: 1000,
            width: "40%",
            left: "30%",
            top: "10%"
          }}
          content={interior}
        />
      </Responsive>
    </Aux>
  );
}

Notification.propTypes = {
  dismiss: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default Notification;
