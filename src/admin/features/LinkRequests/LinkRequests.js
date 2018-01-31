import React, { Component } from "react";
import {
  Button,
  Container,
  Item,
  Image,
  Header,
  Icon,
  Table,
  Segment
} from "semantic-ui-react";
import styled from "styled-components";

import { centered, fancy } from "../../../client/styles/snippets";
import AdminAPI from "../../services";

const Styles = styled.div`
  .viewport {
    min-height: 95vh !important;
  }

  .loading-viewport {
    ${centered};
  }

  th {
    ${fancy};
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

    const formatImage = content => <Image size="small" src={content} />;

    return (
      <Styles>
        <Container>
          <Segment className="viewport">
            {requests.length > 0 ? (
              <Item.Group divided>
                {requests.map((request, index) => {
                  const config = JSON.parse(request.config);

                  return (
                    <Item key={index}>
                      <Item.Content>
                        <Segment attached="top">
                          <Header as="h2" content={`User#${request.userId}`} />
                          <Icon name="chain" />To link as a {request.type}
                        </Segment>
                        <Table attached="bottom" padded>
                          <Table.Body>
                            {Object.keys(config).map((key, index) => (
                              <Table.Row key={index}>
                                <Table.HeaderCell content={key} />
                                <Table.Cell
                                  content={
                                    key === "image" ? (
                                      formatImage(config[key])
                                    ) : (
                                      config[key]
                                    )
                                  }
                                />
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table>
                        <Segment attached="bottom">
                          <Button
                            primary
                            icon="check"
                            content="Approve"
                            onClick={() => this.approve(request.id)}
                          />
                          <Button
                            negative
                            icon="close"
                            content="Deny"
                            onClick={() => this.deny(request.id)}
                          />
                        </Segment>
                      </Item.Content>
                    </Item>
                  );
                })}
              </Item.Group>
            ) : (
              <Segment className="viewport loading-viewport">
                <Header as="h2">
                  <Icon name="exclamation triangle" /> There is nothing to show.
                </Header>
              </Segment>
            )}
          </Segment>
        </Container>
      </Styles>
    );
  }
}
