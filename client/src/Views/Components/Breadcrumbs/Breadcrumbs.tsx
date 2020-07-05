import styles from './Breadcrumbs.module.scss';

import React from 'react';
import IBreadcrumb from '../../../Models/IBreadcrumbs';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface IProps {
  readonly className?: string;
  readonly breadcrumbs: IBreadcrumb[];
}
interface IState {}

export default class Breadcrumbs extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    breadcrumbs: [],
    className: undefined,
  };

  public render(): JSX.Element {
    const componentName: string = 'Breadcrumbs';
    const cssClasses: string = classNames(this.props.className, {
      [styles.wrapper]: true,
    });

    return (
      <ul className={cssClasses} data-automation={componentName}>
        {this._getLinks()}
      </ul>
    );
  }

  private _getLinks(): JSX.Element[] {
    return this.props.breadcrumbs.map((model: IBreadcrumb, index: number, array: IBreadcrumb[]) => {
      const isLastItem: boolean = index === array.length - 1;

      return (
        <li key={`${model.label}_${model.url}`}>
          <NavLink to={model.url} className={isLastItem ? undefined : styles.active}>
            {model.label}
          </NavLink>
        </li>
      );
    });
  }
}
