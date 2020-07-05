/* istanbul ignore file */
import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import IStore from '../Models/IStore';
import NavigationReducer from './Navigation/NavigationReducer';
import RequestingReducer from './Requesting/RequestingReducer';
import TableReducer from "./Table/TableReducer";
import RuggableReportReducer from "./RuggableReport/RuggableReportReducer";
import ErrorReducer from "./Error/ErrorReducer";


export default (history: History): Reducer<IStore> => {
    const reducerMap: ReducersMapObject<IStore> = {
        error: ErrorReducer.reducer,
        router: connectRouter(history),
        requesting: RequestingReducer.reducer,
        ruggableReport: new RuggableReportReducer().reducer,
        table: new TableReducer().reducer,
        navigation: new NavigationReducer().reducer,
    };

    return combineReducers(reducerMap);
};
