import styles from './HorizontalDivider.module.scss';

import React from 'react';
import classNames from 'classnames';

interface IProps {
  readonly className?: string;
}
interface IState {}

export default class HorizontalDivider extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    className: undefined,
  };

  public render(): JSX.Element {
    const cssClasses: string = classNames(this.props.className, {
      [styles.wrapper]: true,
    });

    return (
      <div className={cssClasses}>
        <div className={styles.top} />
        <div className={styles.bottom} />
      </div>
    );
  }
}
