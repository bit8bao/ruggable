import { RouterState } from 'connected-react-router';
import INavigationState from '../Stores/Navigation/Models/INavigationState';
import IRequestingState from '../Stores/Requesting/Models/IRequestingState';
import ITableState from '../Stores/Table/Models/ITableState';
import IRuggableReportState from '../Stores/RuggableReport/Models/IRuggableReportState';
import IErrorState from "../Stores/Error/Models/IErrorState";

export default interface IStore {
    readonly navigation: INavigationState;
    readonly requesting: IRequestingState;
    readonly ruggableReport: IRuggableReportState;
    readonly error: IErrorState;
    readonly table: ITableState;
    readonly router: RouterState;
}
