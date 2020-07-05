import styles from './WarningBox.module.scss';

import React from 'react';
import Text, { TextSizeEnum } from '../Text/Text';

interface IProps {
  readonly text: string | JSX.Element;
  readonly dataAutomation?: string;
}
interface IState {}

export default class WarningBox extends React.Component<IProps, IState> {
  public static defaultProps: Omit<IProps, 'text'> = {
    dataAutomation: undefined,
  };

  public render(): JSX.Element {
    const componentName: string = 'WarningBox';

    return (
      <div className={styles.wrapper} data-automation={`${this.props.dataAutomation}-${componentName}`}>
        <Text size={TextSizeEnum.Subhead} style={{color: "white"}} data-automation={`${this.props.dataAutomation}-${componentName}`}>
          {this.props.text}
        </Text>
      </div>
    );
  }
}
