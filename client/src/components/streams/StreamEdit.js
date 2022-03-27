import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else if (this.props.currentUserId === this.props.stream.userId) {
      const { title, description } = this.props.stream;

      return (
        <div>
          <h2 style={{ fontFamily: "sans-serif", marginBottom: "2rem" }}>
            Edit Stream
          </h2>
          <StreamForm
            initialValues={{ title, description }}
            onSubmit={this.onSubmit}
          />
        </div>
      );
    } else if (this.props.currentUserId !== this.props.stream.userId) {
      return (
        <div>
          <h2
            style={{
              fontStyle: "italic",
              textTransform: "capitalize",
              color: "#de0020",
            }}
          >
            You do not have the permission to edit this stream !!!
          </h2>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
