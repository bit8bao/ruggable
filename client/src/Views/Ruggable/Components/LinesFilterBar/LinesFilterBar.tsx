import styles from './LinesFilterBar.module.scss';

import React from 'react';
import { Col, Row, Grid } from 'react-flexbox-grid';
import IValueLabel from '../../../../Models/IValueLabel';
import Select from '../../../Components/Select/Select';

interface IProps {
  readonly linesOptions: IValueLabel[];
  readonly initialFilterState: IState;
  readonly setLines: any;
}

interface IState {
  readonly linesState: IValueLabel;
}

export default class LinesFilterBar extends React.Component<IProps, IState> {

  public state: IState = {...this.props.initialFilterState};

  public reset = (resetState: IState) => {
    this._onChangeLinesHandler(resetState.linesState);
  };

  public render() {
    return (
      <Grid fluid={true} className={styles.machineFilterHorizontal}>
        <Row>
          <Col sm={3} smOffset={0}>
            <div className="linesSelectBar__item">
              <Select
                id="linesFilter"
                onChange={this._onChangeLinesHandler}
                options={this.props.linesOptions}
                value={this.state.linesState}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }

  private _onChangeLinesHandler = (lines: IValueLabel) => {
    this.props.setLines(lines);
    this.setState({
      linesState: lines,
    });
  };
}
