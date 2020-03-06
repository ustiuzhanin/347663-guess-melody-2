import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Operations} from "../../reducer/user/user";
import {compose} from "redux";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

function withUserAuth(Component) {
  class WithUserAuth extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this.onInputChange = this.onInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
      const target = event.target;
      const value = target.type === `checkbox` ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    onFormSubmit(event) {
      event.preventDefault();

      const {requestSignUp} = this.props;
      const {email, password} = this.state;

      requestSignUp(email, password);
    }

    render() {
      const {isAuthorizationRequired} = this.props;
      return isAuthorizationRequired ? (
        <Component
          {...this.props}
          onChange={(evt) => this.onInputChange(evt)}
          onSubmit={(evt) => this.onFormSubmit(evt)}
        />
      ) : (
        <Redirect to="/" />
      );
    }
  }

  WithUserAuth.propTypes = {
    requestSignUp: PropTypes.func.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired
  };

  return WithUserAuth;
}

const mapDispatchToProps = (dispatch) => ({
  requestSignUp: (email, password) => {
    dispatch(Operations.requestSignUp(email, password));
  }
});

export default compose(connect(null, mapDispatchToProps), withUserAuth);
