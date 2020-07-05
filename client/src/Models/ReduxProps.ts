import { DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import IAction from './IAction';

export type ReduxDispatch<P> = Dispatch<IAction<P>>;

export type ReduxDispatchProp<P> = DispatchProp<IAction<P>>;

export type ReduxProps<P = never, R = never> = [R] extends [never] ? ReduxDispatchProp<P> : ReduxDispatchProp<P> & RouteComponentProps<R>;
