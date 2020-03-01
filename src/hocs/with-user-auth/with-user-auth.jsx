import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Operations} from "../../reducer";
import {compose} from "redux";
import PropTypes from "prop-types";

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

      const {email, password} = this.state;
      this.props.requestSignUp(email, password);
    }

    render() {
      return (
        <Component
          {...this.props}
          onChange={(evt) => this.onInputChange(evt)}
          onSubmit={(evt) => this.onFormSubmit(evt)}
        />
      );
    }
  }

  WithUserAuth.propTypes = {
    requestSignUp: PropTypes.func.isRequired
  };

  return WithUserAuth;
}

const mapDispatchToProps = (dispatch) => ({
  requestSignUp: (data) => {
    dispatch(Operations.requestSignUp(data));
  }
});

export default compose(connect(null, mapDispatchToProps), withUserAuth);
