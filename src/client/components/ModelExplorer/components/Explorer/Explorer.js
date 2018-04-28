import React from "react";
import { Sidebar, Menu, Segment, Divider, Loader } from "semantic-ui-react";

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
  const borderedStyle = {
    border: "1px solid #555"
  };

  const loaderStyle = {
    minHeight: "40vh",
    maxHeight: "40vh"
  };

  const pagination = (
    <Menu style={borderedStyle} widths={5} inverted>
      <Menu.Item icon="fast backward" onClick={loadFirstPage} />
      <Menu.Item icon="backward" onClick={loadPreviousPage} />
      <Menu.Item header content={`${currentPage + 1} / ${totalPages}`} />
      <Menu.Item icon="forward" onClick={loadNextPage} />
      <Menu.Item icon="fast forward" onClick={loadLastPage} />
    </Menu>
  );

  return (
    <Segment attached="bottom" inverted>
      <Sidebar.Pusher>
        <Segment basic>
          <Divider horizontal inverted>
            {title}
          </Divider>
        </Segment>
        {pagination}
        {loading ? (
          <Segment style={loaderStyle} inverted>
            <Loader active content="Loading..." />
          </Segment>
        ) : (
          renderItems(models)
        )}
      </Sidebar.Pusher>
    </Segment>
  );
}

export default Explorer;
