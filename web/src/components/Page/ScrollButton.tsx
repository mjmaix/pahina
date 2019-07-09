import React, { Component } from 'react';
import { chevronUp } from 'react-icons-kit/feather/chevronUp';

import './ScrollButton.css';
import Icon from 'react-icons-kit';
import { IconSize } from '../../themes/constants';

interface State {
  intervalId: NodeJS.Timeout;
}

interface Props {
  delayInMs: number;
  scrollStepInPx: number;
}

const intialState = {
  intervalId: (0 as unknown) as NodeJS.Timeout,
};

export class ScrollButton extends Component<Props, State> {
  public readonly state: State = intialState;

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs,
    );
    this.setState({ intervalId });
  }

  render() {
    return (
      <button
        title="Back to top"
        className="ScrollButton-scroll"
        onClick={() => {
          this.scrollToTop();
        }}
      >
        <span className="ScrollButton-arrow-up text-muted align-self-center">
          <Icon size={IconSize.MD} icon={chevronUp} />
        </span>
      </button>
    );
  }
}
