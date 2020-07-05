import globalStyles from '../../../index.module.scss';

export const defaultTheme = {
  headerRowBackgroundColor: globalStyles.blue900,
  defaultBorderColor: globalStyles.grey700,
  defaultTextColor: globalStyles.black,

  columnBottomBorderColor: globalStyles.white,
  columnRightBorderColor: globalStyles.grey200,
  columnSortedAscIndicatorColor: globalStyles.white,
  columnSortedDescIndicatorColor: globalStyles.white,
  columnTextColor: globalStyles.grey200,

  rowBottomBorderColor: globalStyles.black,
  rowEvenBackgroundColor: globalStyles.white,
  rowHoverColor: globalStyles.grey200,
  rowHoverLeftEndCapColor: globalStyles.grey500,
  rowOddBackgroundColor: globalStyles.white,
  rowTextColor: globalStyles.black,

  paginationBackgroundColor: globalStyles.white,
  paginationBtnActiveColor: globalStyles.blue700,
  paginationTextColor: globalStyles.black,
};

export const transparentTheme = {
  ...defaultTheme,
  headerRowBackgroundColor: 'transparent',
  columnRightBorderColor: 'transparent',
  rowEvenBackgroundColor: 'transparent',
  rowOddBackgroundColor: 'transparent',
};
