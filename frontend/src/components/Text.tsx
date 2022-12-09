import { Component } from 'react';

interface IProps {
  text: string;
}
interface IState {
  text: string;
}

export default class Text extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      text: props.text,
    };
  }

  render() {
    return <span>{this.state.text}</span>;
  }
}
