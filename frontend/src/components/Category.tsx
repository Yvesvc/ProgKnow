import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface IProps {}

interface IState {
  _category: string;
}

export default class Category extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      _category: '',
    };
  }
  SetCategory(category: string) {
    this.setState({ _category: category });
  }
  render() {
    return <div className="h5 mb-2">{this.state._category}</div>;
  }
}
