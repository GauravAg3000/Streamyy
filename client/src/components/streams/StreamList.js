import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link
            to={`/streams/edit/${stream.id}`}
            className="ui button primary"
            style={{ margin: "0 1rem" }}
          >
            Edit
            <i className="edit outline icon" style={{ marginLeft: "3px" }}></i>
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
            <i
              className="window close outline icon"
              style={{ marginLeft: "3px" }}
            ></i>
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id} style={{ padding: "0.6rem" }}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon video" />
          <div className="content">
            <Link
              to={`streams/${stream.id}`}
              className="header"
              style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}
            >
              {stream.title}
            </Link>
            <div
              className="description"
              style={{
                margin: "5px",
                padding: "0.2rem",
                fontStyle: "italic",
                fontSize: "1.05rem",
              }}
            >
              {stream.description}
            </div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2 style={{ fontFamily: "sans-serif" }}>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
