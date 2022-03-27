import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

// class GoogleAuth extends React.Component {
//   componentDidMount() {
//     window.gapi.load("client: auth2", () => {
//       window.gapi.client
//         .init({
//           clientId:
//             "438830304593-0q6sv05sis4cqr3797o8chqi5bsf025e.apps.googleusercontent.com",
//           scope: "email",
//         })
//         .then(() => {
//           this.auth = window.gapi.auth2.getAuthInstance();
//           this.onAuthChange(this.auth.isSignedIn.get());
//           this.auth.isSignedIn.listen(this.onAuthChange);
//         });
//     });
//   }

//   onAuthChange = (isSignedIn) => {
//     if (isSignedIn) {
//       this.props.signIn(this.auth.currentUser.get().getId());
//     } else {
//       this.props.signOut();
//     }
//   };

//   onSignInClick = () => {
//     this.auth.signIn();
//   };

//   onSignOutClick = () => {
//     if (window.confirm("Are you Sure?")) {
//       this.auth.signOut();
//     }
//   };

//   renderAuthButton() {
//     if (this.props.isSignedIn === null) {
//       return null;
//     } else if (this.props.isSignedIn) {
//       return (
//         <button className="ui red google button" onClick={this.onSignOutClick}>
//           <i className="google icon" />
//           Sign Out
//         </button>
//       );
//     } else {
//       return (
//         <button className="ui red google button" onClick={this.onSignInClick}>
//           <i className="google icon" />
//           Sign In With Google
//         </button>
//       );
//     }
//   }

//   render() {
//     return <div>{this.renderAuthButton()}</div>;
//   }
// }

// const mapStateToProps = (state) => {
//   return { isSignedIn: state.auth.isSignedIn };
// };

// export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

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
