import React from "react";
import { Message, Icon } from "semantic-ui-react";

import config from "../../config";

const Aux = ({ children }) => children;

function withPageHeader(headerConfig, WrappedComponent) {
  return function PageHeaderProvider(props) {
    return (
      <Aux>
        <Message color={config.color} icon>
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