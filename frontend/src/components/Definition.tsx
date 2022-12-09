import { Component } from 'react';
import { Content } from './data/ProgTermData';
import UnderlinedText from './UnderlinedText';
import Text from './Text';

interface IProps {}

interface IState {
  definition: Content[];
}

export default class Definition extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      definition: [],
    };
  }

  SetDefinition(definition: Content[]) {
    this.setState({ definition: definition });
  }

  render() {
    return (
      <div className="bg-light lead">
        {this.state.definition.map((paragraph) => {
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
