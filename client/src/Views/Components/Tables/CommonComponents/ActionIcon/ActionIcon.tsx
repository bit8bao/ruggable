import styles from './ActionIcon.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconEdit } from '../../../../Components/Icons/IconEdit.svg';
import { ReactComponent as IconDelete } from '../../../../Components/Icons/IconDelete.svg';

interface IProps {
  readonly dataAutomation: string;
  readonly href?: string;
  readonly onClick?: (props?: IProps) => void;
  readonly icon: string;
}

export default function ActionIcon(props: IProps) {
  const componentName: string = 'ActionIcon';

  const onClickHandler = (): void => {
    props.onClick!(props);
  };

  const components = {
    delete: IconDelete,
    edit: IconEdit,
  };

  const Icon = components[props.icon || 'delete' || 'edit'];

  return (
    <span className={styles.wrapper}>
      {props.onClick ? (
        <button onClick={onClickHandler} className={styles.clearBtn}>
          <Icon />
        </button>
      ) : (
        <Link to={props.href!} data-automation={`${props.dataAutomation}-${componentName}`}>
          <Icon />
        </Link>
      )}
    </span>
  );
}
