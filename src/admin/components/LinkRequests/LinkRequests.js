import React, { Component } from "react";
import { Button, Container, Card } from "semantic-ui-react";

import AdminAPI from "../../services";

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
      <Container fluid>
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
      </Container>
    );
  }
}
