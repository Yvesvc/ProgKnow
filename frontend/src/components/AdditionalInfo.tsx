import { Component } from 'react';
import { Content } from './data/ProgTermData';
import UnderlinedText from './UnderlinedText';
import Text from './Text';

interface IProps {}

interface IState {
  additionalInfo: Array<Content[]>;
}

export default class AdditionalInfo extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      additionalInfo: [],
    };
  }

  SetAdditionalInfo(additionalInfo: Array<Content[]>) {
    this.setState({ additionalInfo: additionalInfo });
  }

  render() {
    return (
      <div>
        {this.state.additionalInfo.map((cell) => {
          return cell.map((paragraph) => {
            if (paragraph.Bullet) {
              return paragraph.Elements.map((element) => {
                if (element.Underline) {
                  return (
                    <li key={element.Content}>
                      <UnderlinedText key={element.Content} text={element.Content} />{' '}
                    </li>
                  );
                } else {
                  return (
                    <li key={element.Content}>
                      <Text key={element.Content} text={element.Content} />
                    </li>
                  );
                }
              });
            } else {
              return paragraph.Elements.map((element) => {
                if (element.Underline) {
                  return <UnderlinedText key={element.Content} text={element.Content} />;
                } else {
                  return <Text key={element.Content} text={element.Content} />;
                }
              });
            }
          });
        })}
      </div>
    );
  }
}
