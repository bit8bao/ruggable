import styles from './BoxPanel.module.scss';

import React from 'react';
import classNames from 'classnames';

export enum BoxPanelPadding {
  Small = 'smallPadding',
  Medium = 'mediumPadding',
  Large = 'largePadding',
}

interface IProps {
  readonly className?: string;
  readonly paddingSize?: BoxPanelPadding;
}
interface IState {}

export default class BoxPanel extends React.PureComponent<IProps, IState> {
  public static defaultProps: IProps = {
    className: undefined,
    paddingSize: BoxPanelPadding.Large,
  };

  public render(): JSX.Element {
    const cssClasses: string = classNames(this.props.className, {
      [styles.wrapper]: true,
      [styles[this.props.paddingSize!]]: true,
    });

    return <div className={cssClasses}>{this.props.children}</div>;
  }
}
