import styles from './Text.module.scss';

import React, { CSSProperties } from 'react';
import classNames from 'classnames';

export enum TextSizeEnum {
  Body1 = 'body1',
  Callout = 'callout',
  CalloutLarge = 'calloutLarge',
  Caption1 = 'caption1',
  Caption2 = 'caption2',
  Footnote1 = 'footnote1',
  Footnote2 = 'footnote2',
  Headline = 'headline',
  Headline2 = 'headline2',
  Instruction1 = 'instruction1',
  Subhead = 'subhead',
  Title1 = 'title1',
  Title2 = 'title2',
  Title3 = 'title3',
  Table = 'table',
  TableHeader = 'tableHeader',
}
type SizeMap = Record<TextSizeEnum, string>;

interface IProps {
  /**
   * The title size you want.
   */
  readonly size: TextSizeEnum;
  /**
   * You can pass in css class names to be applied to the main element.
   */
  readonly className?: string;
  /**
   * You can change the default element by passing one in.
   * Example div or label etc.
   */
  readonly element?: string; // HTMLElementTagNameMap
  readonly dataAutomation?: string;
  readonly showEllipsis?: boolean;
  readonly isUppercase?: boolean;
  readonly style?: CSSProperties;
}
interface IState {}

export default class Text extends React.PureComponent<IProps, IState> {
  public static defaultProps: Omit<IProps, 'size'> = {
    element: undefined,
    className: undefined,
    showEllipsis: false,
    isUppercase: false,
    dataAutomation: undefined,
  };

  private _sizeMap: SizeMap = {
    [TextSizeEnum.Title1]: 'h1',
    [TextSizeEnum.Title2]: 'h2',
    [TextSizeEnum.Title3]: 'h3',
    [TextSizeEnum.Headline]: 'h4',
    [TextSizeEnum.Headline2]: 'h4',
    [TextSizeEnum.Subhead]: 'h5',
    [TextSizeEnum.Caption1]: 'p',
    [TextSizeEnum.Caption2]: 'p',
    [TextSizeEnum.Body1]: 'p',
    [TextSizeEnum.Callout]: 'p',
    [TextSizeEnum.CalloutLarge]: 'p',
    [TextSizeEnum.Footnote1]: 'p',
    [TextSizeEnum.Footnote2]: 'p',
    [TextSizeEnum.Instruction1]: 'p',
    [TextSizeEnum.Table]: 'p',
    [TextSizeEnum.TableHeader]: 'p',
  };

  public render(): JSX.Element {
    const componentName: string = 'Text';
    const { size, element, dataAutomation, showEllipsis, isUppercase, style } = this.props;
    const CustomTag: any = Boolean(element) ? element : this._sizeMap[size!] || 'p';
    const cssClasses: string = classNames(this.props.className, {
      [styles.wrapper]: true,
      [styles[size!]]: true,
      [styles.ellipsis]: showEllipsis,
      [styles.isUppercase]: isUppercase,
    });

    return (
      <CustomTag style={style} className={cssClasses} data-automation={`${dataAutomation}-${componentName}`}>
        {this.props.children}
      </CustomTag>
    );
  }
}
