import styles from './Button.module.scss';

import React from 'react';
import classNames from 'classnames';
import { buttonUnion } from '../../../Constants/domType';
import { Link } from 'react-router-dom';

export enum ButtonStyleEnum {
  Pill = 'pillButton',
  PillPlain = 'pillPlainButton',
  PillAlert = 'pillAlertButton',
  Plain = 'plainButton',
  Square = 'squareButton',
  Link = 'linkButton',
}
export enum ButtonSizeEnum {
  Small = 'smallButton',
  Normal = 'normalButton',
}

interface IProps {
  readonly className?: string;
  readonly disabled?: boolean;
  readonly displayType?: ButtonStyleEnum;
  readonly isActive?: boolean;
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  readonly size?: ButtonSizeEnum;
  readonly type?: buttonUnion;
  readonly href?: string;
}
interface IState {}

export default class Button extends React.PureComponent<IProps, IState> {
  public static defaultProps: Omit<IProps, 'dataAutomation'> = {
    className: undefined,
    disabled: false,
    displayType: ButtonStyleEnum.Plain,
    isActive: false,
    onClick: () => void 0,
    size: ButtonSizeEnum.Normal,
    type: 'button',
    href: '',
  };

  public state: IState = {};

  public render(): JSX.Element {
    const componentName: string = 'Button';
    const { isActive, onClick, children, className, disabled, displayType, href } = this.props;
    const cssClasses: string = classNames(className, {
      [styles.wrapper]: true,
      [styles[this.props.displayType!]]: true,
      [styles[this.props.size!]]: true,
      [styles.isActive]: isActive,
    });

    if (displayType === ButtonStyleEnum.Link) {
      return (
        <Link to={href!} className={cssClasses} onClick={onClick}>
          {children}
        </Link>
      );
    }

    return (
      <button
        type={this.props.type}
        className={cssClasses}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
