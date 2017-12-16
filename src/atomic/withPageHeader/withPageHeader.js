import React from "react";
import PropTypes from "prop-types";
import { Message, Icon } from "semantic-ui-react";

const Aux = ({ children }) => children;

function withPageHeader(headerConfig, WrappedComponent) {
  return function PageHeaderProvider(props) {
    return (
      <Aux>
        <Message icon>
          <Icon name={headerConfig.icon} />
          <Message.Content>
            <Message.Header className="fancy">
              {headerConfig.header}
            </Message.Header>
            {headerConfig.content}
          </Message.Content>
        </Message>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
}

export default withPageHeader;
