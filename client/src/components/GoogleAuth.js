import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = (props) => {
  const auth = useRef("");

  useEffect(() => {
    window.gapi.load("client: auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "438830304593-0q6sv05sis4cqr3797o8chqi5bsf025e.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      props.signIn(auth.current.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    if (window.confirm("Are you Sure?")) {
      auth.current.signOut();
    }
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={onSignOutClick}>
          <i className="google icon" />
          Sign Out
          <i className="sign out alternate icon" style={{ marginLeft: "3px" }}></i>
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={onSignInClick}>
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
