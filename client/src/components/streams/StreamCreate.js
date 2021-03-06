import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h2 style={{ fontFamily: "sans-serif", marginBottom: "2rem" }}>
          Create Stream
        </h2>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
