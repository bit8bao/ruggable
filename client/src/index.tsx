/* istanbul ignore file */
import 'babel-polyfill';
import 'react-app-polyfill/ie11';

import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import IStore from './Models/IStore';
import rootReducer from './Stores/rootReducer';
import rootStore from './Stores/rootStore';
import { Provider } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import { AppContainer } from 'react-hot-loader';
import App from './Views/App';
import { Store } from 'redux';

(async (window: Window) => {
    const initialState: Partial<IStore> = {
    };
    const history: History = createBrowserHistory();
    const store: Store<IStore> = rootStore(initialState, history);
    const rootEl: HTMLElement | null = document.getElementById('js-reactApp');

    const render = (Component: any, el: HTMLElement | null) => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <Component history={history} dispatch={store.dispatch} />
                </Provider>
            </AppContainer>,
            el
        );
    };

    if (rootEl) {
        render(App, rootEl);
    }

    // // Hot reloading
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // Reload components
        module.hot.accept('./Views/App', () => {
            render(App, rootEl);
        });

        // Reload reducers
        module.hot.accept('./Stores/rootReducer', () => {
            store.replaceReducer(rootReducer(history));
        });
    }
})(window);
