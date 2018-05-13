import React, { Component } from "react";
import { Sidebar, Menu, Segment, Divider, Loader } from "semantic-ui-react";

class Explorer extends Component {
  render() {
    const {
      setRef,
      title,
      loadFirstPage,
      loadPreviousPage,
      loadNextPage,
      loadLastPage,
      currentPage,
      totalPages,
      renderItems,
      loading,
      models
    } = this.props;

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
          <div ref={setRef}>
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
          </div>
        </Sidebar.Pusher>
      </Segment>
    );
  }
}

export default Explorer;
