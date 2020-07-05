import styles from './MachineStatusTooltip.module.scss';

import React from 'react';

interface IProps {}
interface IState {}

export default class MachineStatusTooltip extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.text}>{this.props.children}</div>
          <div className={styles.tip} />
        </div>
      </div>
    );
  }
}
