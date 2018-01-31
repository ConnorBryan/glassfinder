import React from "react";
import PropTypes from "prop-types";
import { Button, Header, Image, Modal } from "semantic-ui-react";

const fancy = {
  textTransform: "uppercase",
  letterSpacing: "0.25rem"
};

const slightlyBiggerText = {
  fontSize: "1.2rem"
};

function AgeGate({ dismiss }) {
  return (
    <Modal open>
      <Modal.Content image>
        <Image wrapped size="medium" src="/18plus.png" />
        <Modal.Description>
          <Header style={fancy}>Adults only</Header>
          <span style={slightlyBiggerText}>
            The content on this site is restricted.
          </span>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          as="a"
          href="https://google.com/"
          style={fancy}
          icon="undo"
          content="Get me out of here"
          negative
        />
        <Button
          style={fancy}
          icon="checkmark"
          content="I'm good"
          onClick={dismiss}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

AgeGate.propTypes = {
  dismiss: PropTypes.func.isRequired
};

export default AgeGate;
