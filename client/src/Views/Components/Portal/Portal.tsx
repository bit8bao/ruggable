import React, { ReactPortal } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  readonly id: string;
}
interface IState {}

export default class Portal extends React.Component<IProps, IState> {
  public el: HTMLElementTagNameMap['div'] = document.createElement('div');
  private _portalElement: HTMLElement = document.getElementById(this.props.id)!;

  constructor(props: IProps) {
    super(props);

    this.el = document.createElement('div');
  }

  public componentDidMount(): void {
    this._portalElement.appendChild(this.el);
  }

  public componentWillUnmount(): void {
    this._portalElement.removeChild(this.el);
  }

  public render(): ReactPortal {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
