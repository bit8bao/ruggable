import styles from './ActionEye.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconEye } from '../../../../Components/Icons/IconEye.svg';

interface IProps {
  readonly dataAutomation: string;
  readonly href?: string;
  readonly onClick?: (props?: IProps) => void;
}

export default function ActionEye(props: IProps) {
  const componentName: string = 'ActionEye';

  const onClickHandler = (): void => {
    props.onClick!(props);
  };

  return (
    <span className={styles.wrapper}>
      {props.onClick ? (
        <button onClick={onClickHandler} className={styles.clearBtn}>
          <IconEye />
        </button>
      ) : (
        <Link to={props.href!} data-automation={`${props.dataAutomation}-${componentName}`}>
          <IconEye />
        </Link>
      )}
    </span>
  );
}
