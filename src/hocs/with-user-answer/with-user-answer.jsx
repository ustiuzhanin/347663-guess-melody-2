import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default function withUserAnswer(Component) {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userAnswer: []
      };

      this.onButtonClick = this.onButtonClick.bind(this);
      this.onUserAnswer = this.onUserAnswer.bind(this);
    }

    onButtonClick(evt) {
      const answerValue = +evt.target.value;
      if (evt.target.checked) {
        this.setState((prevState) => {
          return {
            userAnswer: [...prevState.userAnswer, answerValue]
          };
        });
      } else {
        this.setState((prevState) => ({
          userAnswer: prevState.userAnswer.filter(
              (answr) => answr !== answerValue
          )
        }));
      }
    }

    onUserAnswer() {
      this.props.onAnswer(this.state.userAnswer);
      this.setState({userAnswer: []});
    }

    render() {
      return (
        <Component
          {...this.props}
          onClick={(e) => this.onButtonClick(e)}
          onAnswer={this.onUserAnswer}
        />
      );
    }
  }

  WithUserAnswer.propTypes = {
    onAnswer: PropTypes.func.isRequired
  };

  return WithUserAnswer;
}
