import styles from './LeftNavigation.module.scss';
import React from 'react';
import { connect } from 'react-redux';
import { ReduxProps } from '../../../Models/ReduxProps';
import IStore from '../../../Models/IStore';
import INavigation from '../../../Selector/Navigation/Models/INavigation';
import INav from '../../../Models/INavigation';
import {getTopNavigation} from '../../../Selector/Navigation/NavigationSelector';
import Text, { TextSizeEnum } from '../../Components/Text/Text';
import classNames from "classnames";
import {Link} from "react-router-dom";
import NavigationAction from "../../../Stores/Navigation/NavigationAction";
import Tandem from '../../Components/Icons/tandem.svg'
import iconsTopNav from '../../Components/Icons/_iconsTopNav';


interface IProps {}
interface IState {}
interface IStateToProps {
  readonly topLevels: INavigation[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  topLevels: getTopNavigation(state),
});

class LeftNavigation extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {

  public componentDidMount() {
    let navigation: INav[] = [{
      id: '0000-0000-1111-1111',
      parentId: '',
      name: 'Tandem',
      url: '/',
      icon: 'Tandem',
      description: '',
      children: []
    },
      {
        id: '0000-0000-1111-1111',
        parentId: '',
        name: 'Admin',
        url: '/admin',
        icon: 'Admin',
        description: '',
        children: []
      }
    ];

    this.props.dispatch(NavigationAction.initial(navigation));
  }

  public render(): JSX.Element {
    return (
      <ul className={styles.wrapper}>
        {this.props.topLevels.map((model: INavigation) => {
          const cssClasses: string = classNames({
            [styles.btn]: true,
            [styles.isActive]: model.isActive,
          });
          const Icon: any = iconsTopNav[model.icon] || null;

          return (
              <li key={model.name} id={model.name}>
                <Link to={model.url} className={cssClasses}>
                  { Icon && <Icon className={styles.icon} /> }
                  <Text size={TextSizeEnum.Caption2} dataAutomation={model.name}>
                    {model.name}
                  </Text>
                </Link>
              </li>
          );
        })}
      </ul>
    );
  }
}

export { LeftNavigation as Unconnected };
export default connect(mapStateToProps)(LeftNavigation);
