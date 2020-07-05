import styles from './CityFilterBar.module.scss';

import React from 'react';
import { Col, Row, Grid } from 'react-flexbox-grid';
import IValueLabel from '../../../../../Models/IValueLabel';
import Select from '../../../../Components/Select/Select';

interface IProps {
  readonly cityOptions: IValueLabel[];
  readonly initialFilterState: IState;
  readonly setCity: any;
}

interface IState {
  readonly cityState: IValueLabel;
}

export default class CityFilterBar extends React.Component<IProps, IState> {

  public state: IState = {...this.props.initialFilterState};

  public reset = (resetState: IState) => {
    this._onChangeOperationHandler(resetState.cityState);
  };

  public render() {
    return (
      <Grid>
        <Row>
          <Col sm={3} smOffset={8}>
            <div className="citySelectBar__item">
              <Select
                id="cityFilter"
                onChange={this._onChangeOperationHandler}
                options={this.props.cityOptions}
                value={this.state.cityState}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }

  private _onChangeOperationHandler = (city: IValueLabel) => {
    this.props.setCity(city);
    this.setState({
      cityState: city,
    });
  };
}
