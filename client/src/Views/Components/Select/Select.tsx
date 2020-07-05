import styles from './Select.module.scss';

import React from 'react';
import ReactSelect from 'react-select';
import { Props as SelectProps } from 'react-select/src/Select';
import { customStyles } from './SelectCustomStyles';
import classNames from 'classnames';

interface IProps extends SelectProps {
  readonly hideBorderBottom?: boolean;
}
interface IState {}

export default class Select extends React.PureComponent<IProps, IState> {
  public static defaultProps: Pick<IProps, 'hideBorderBottom'> = {
    hideBorderBottom: false,
  };

  public render(): JSX.Element {
    const { hideBorderBottom, isMulti, isClearable } = this.props;
    const allowClearable: boolean = Boolean(isMulti) || Boolean(isClearable);
    const cssClasses: string = classNames({
      [styles.wrapper]: true,
      [styles.borderBottom]: !hideBorderBottom,
    });

    return (
      <div className={cssClasses}>
        <ReactSelect placeholder="Select" isSearchable={false} isClearable={allowClearable} styles={customStyles} {...this.props} />
      </div>
    );
  }
}
