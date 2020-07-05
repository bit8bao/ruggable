import styles from './TopBar.module.scss';

import React from 'react';
import {connect} from 'react-redux';
import {ReduxProps} from '../../../Models/ReduxProps';
import IStore from '../../../Models/IStore';
import IBreadcrumb from '../../../Models/IBreadcrumbs';
import HorizontalDivider from '../../Components/HorizontalDivider/HorizontalDivider';
import CityFilterBar from "./Components/CityFilterBar/CityFilterBar";
import Text, {TextSizeEnum} from '../../Components/Text/Text';
import CityModel from "../../../Stores/RuggableReport/Models/CityModel";
import RuggableReportAction from "../../../Stores/RuggableReport/RuggableReportAction";
import IValueLabel from "../../../Models/IValueLabel";

interface IProps {
  readonly breadcrumbs?: IBreadcrumb[];
}
interface IState {
    readonly cityOptions: IValueLabel[];
}
// interface IRouteParams {}
interface IStateToProps {
    readonly cities: CityModel[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    cities: state.ruggableReport.cities,
});

class TopBar extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {

    public state: IState = {
        cityOptions: [{ label: 'Select City', value: '',}]
    };
    public componentDidMount() {
        this.props.dispatch(RuggableReportAction.getCities());
    }

    public componentDidUpdate(prevProps: IStateToProps, prevState: IState) {
        const { cities } = this.props;
        if(prevProps.cities !== this.props.cities) {
            this.setState({
                cityOptions: [
                    { label: 'Select City', value: '',},
                    ...cities.map((city): IValueLabel => { return {label: city.city_name, value: city.id }})
                ]
            });
        }
    }

    public render(): JSX.Element {
    const componentName: string = 'TopBar';
      const cityInitialState = {
          cityState: { label: 'Select City', value: '', },
      };

    return (
      <>
        <div className={styles.wrapper} data-automation={componentName}>
            <Text size={TextSizeEnum.Title2} style={{ color: 'white' }}>
                SCANNABLE
            </Text>
          <div className={styles.rightSide}>
            <CityFilterBar
                setCity={this._setCity}
                cityOptions={this.state.cityOptions}
                initialFilterState={cityInitialState}
            />
              <Text size={TextSizeEnum.Headline} style={{ color: 'white' }}>
                  Loggout
              </Text>
            <div className="hr_3" />
          </div>
        </div>
        <HorizontalDivider />
      </>
    );
  }

    private _setCity = (cityStatus: IValueLabel) => {
        if(cityStatus.value) {
            this.props.dispatch(RuggableReportAction.chart(false));
            this.props.dispatch(RuggableReportAction.clearProduction());
            this.props.dispatch(RuggableReportAction.loadReport(cityStatus.value));
        }
    };
}

export { TopBar as Unconnected };
export default connect(mapStateToProps)(TopBar);
