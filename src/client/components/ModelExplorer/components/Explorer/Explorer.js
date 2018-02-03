import React from "react";
import { Sidebar, Menu, Segment, Divider, Loader } from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  .Explorer {
    border: 1px solid white !important;
  }

  .Explorer-pagination,
  .Explorer-title {
    border-bottom: 1px solid white !important;
  }
`;

function Explorer({
  compact,
  title,
  loadFirstPage,
  loadPreviousPage,
  loadNextPage,
  loadLastPage,
  currentPage,
  totalPages,
  renderItems,
  resource,
  loading,
  models
}) {
  const pagination = (
    <Menu className="Explorer-pagination" widths={5} inverted>
      <Menu.Item icon="fast backward" onClick={loadFirstPage} />
      <Menu.Item icon="backward" onClick={loadPreviousPage} />
      <Menu.Item header content={`${currentPage + 1} / ${totalPages}`} />
      <Menu.Item icon="forward" onClick={loadNextPage} />
      <Menu.Item icon="fast forward" onClick={loadLastPage} />
    </Menu>
  );

  return (
    <Styles {...{ compact }}>
      <Segment className="Explorer" attached="bottom" inverted>
        <Sidebar.Pusher>
          <Segment basic className="Explorer-title">
            <Divider horizontal inverted>
              {title}
            </Divider>
          </Segment>
          {pagination}
          {loading ? (
            <Loader active content="Loading..." />
          ) : (
            renderItems(models)
          )}
        </Sidebar.Pusher>
      </Segment>
    </Styles>
  );
}

export default Explorer;
