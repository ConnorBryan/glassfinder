import React, { Component } from "react";
import {
  Button,
  Container,
  Card,
  Header,
  Icon,
  Segment
} from "semantic-ui-react";
import styled from "styled-components";

import { centered } from "../../../main/styles/snippets";
import AdminAPI from "../../services";

const Styles = styled.div`
  .viewport {
    min-height: 95vh !important;
    ${centered};
  }
`;

export default class LinkRequests extends Component {
  state = {
    requests: []
  };

  componentDidMount() {
    this.setRequests();
  }

  setRequests = async () => {
    this.setState({ requests: await AdminAPI.fetchLinkRequests() });
  };

  approve = async id => {
    await AdminAPI.approveLink(id);

    this.setRequests();
  };

  deny = async id => {
    await AdminAPI.denyLink(id);

    this.setRequests();
  };

  render() {
    const { requests } = this.state;

    return (
      <Styles>
        <Container>
          <Segment className="viewport">
            {requests.length > 0 ? (
              <Card.Group>
                {requests.map((request, index) => {
                  const config = JSON.parse(request.config);

                  return (
                    <Card key={index}>
                      <Card.Content>
                        <Card.Header>User#{request.userId}</Card.Header>
                        <Card.Meta>To link as a {request.type}</Card.Meta>
                      </Card.Content>
                      {Object.keys(config).map((key, index) => (
                        <Card.Content key={index} extra>
                          <Card.Header content={key} />
                          <Card.Description content={config[key]} />
                        </Card.Content>
                      ))}
                      <Card.Content extra>
                        <Button
                          fluid
                          positive
                          content="Approve"
                          onClick={() => this.approve(request.id)}
                        />
                      </Card.Content>
                      <Card.Content extra>
                        <Button
                          fluid
                          negative
                          content="Deny"
                          onClick={() => this.deny(request.id)}
                        />
                      </Card.Content>
                    </Card>
                  );
                })}
              </Card.Group>
            ) : (
              <Header as="h2">
                <Icon name="exclamation triangle" /> There is nothing to show.
              </Header>
            )}
          </Segment>
        </Container>
      </Styles>
    );
  }
}
