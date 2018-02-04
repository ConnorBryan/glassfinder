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
  const borderStyle = {
    border: "1px solid white"
  };

  const borderBottomStyle = {
    borderBottom: "1px solid white"
  };

  const mobileExplorerStyle = {
    minWidth: "100vw",
    maxWidth: "100vw",
    ...borderStyle
  };

  const desktopExplorerStyle = {
    minWidth: "55vw",
    maxWidth: "55vw",
    minHeight: "80vh",
    maxHeight: "80vh",
    overflowY: "scroll",
    overflowX: "hidden",
    ...borderStyle
  };

  const loaderStyle = {
    minHeight: "40vh",
    maxHeight: "40vh"
  };

  const pagination = (
    <Menu style={borderBottomStyle} widths={5} inverted>
      <Menu.Item icon="fast backward" onClick={loadFirstPage} />
      <Menu.Item icon="backward" onClick={loadPreviousPage} />
      <Menu.Item header content={`${currentPage + 1} / ${totalPages}`} />
      <Menu.Item icon="forward" onClick={loadNextPage} />
      <Menu.Item icon="fast forward" onClick={loadLastPage} />
    </Menu>
  );

  return (
    <Segment
      style={compact ? mobileExplorerStyle : desktopExplorerStyle}
      attached="bottom"
      inverted
    >
      <Sidebar.Pusher>
        <Segment basic style={borderBottomStyle}>
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
