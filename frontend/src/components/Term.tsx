import { Component } from 'react';
import { Content } from './data/ProgTermData';
import UnderlinedText from './UnderlinedText';
import Text from './Text';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface IProps {}

interface IState {
  _term: Content[];
}

export default class Term extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      _term: [] as Content[],
    };
  }
  SetTerm(term: Content[]) {
    this.setState({ _term: term });
  }
  render() {
    return (
      <div className="h2 mb-2">
        {this.state._term.map((paragraph) => {
          return paragraph.Elements.map((element) => {
            if (element.Underline) {
              return <UnderlinedText key={element.Content} text={element.Content} />;
            } else {
              return <Text key={element.Content} text={element.Content} />;
            }
          });
        })}
      </div>
    );
  }
}
