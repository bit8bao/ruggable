import styles from './Home.module.scss';
import React from 'react';
import {connect} from 'react-redux';
import IStore from '../../Models/IStore';
import {ReduxProps} from '../../Models/ReduxProps';
import Page from '../Components/Page/Page';
import Ruggable from '../Ruggable/Ruggable';

interface IProps {}
interface IState {}
interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class Home extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {

    public render(): JSX.Element {

      return (
          // @ts-ignore
          <Page title="Ruggable" showLoadingIndicator={this.props.isRequesting}>
            <div className={styles.wrapper}>
                <Ruggable />
            </div>
        </Page>
    );
  }

}

export { Home as Unconnected };
export default connect(mapStateToProps)(Home);
