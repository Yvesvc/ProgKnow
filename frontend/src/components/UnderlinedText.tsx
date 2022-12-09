import React, { Component } from 'react';

interface IProps {
  text: string;
}
interface IState {
  text: string;
}

export default class UnderlinedText extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      text: props.text,
    };
  }

  render() {
    return <u>{this.state.text}</u>;
  }
}
