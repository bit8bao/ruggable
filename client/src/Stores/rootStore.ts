/* istanbul ignore file */
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import rootReducer from './rootReducer';
import IStore from '../Models/IStore';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';

export default (initialState: Partial<IStore>, history: History): Store<IStore> => {
    const middleware: Middleware[] = [
        routerMiddleware(history),
        thunk,
    ].filter(Boolean);

    // @ts-ignore
    const store: Store<IStore> = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));

    return store;
};
