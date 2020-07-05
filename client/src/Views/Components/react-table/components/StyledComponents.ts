import styled, { css } from 'styled-components';

export const TableStyle = styled.div`
  color: ${(props: any) => props.theme.defaultTextColor};
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const TableBody = styled.div`
  //min-height: 328px;
`;

const RowBaseStyle = styled.div`
  display: flex;
  border-bottom: solid 1px ${(props: any) => props.theme.rowBottomBorderColor};
  border-bottom: 2px solid red;
e
  &:last-child {
    border-bottom: none;
  }
`;

export const RowStyle = styled(RowBaseStyle)`
  color: ${(props: any) => props.theme.rowTextColor};
  padding-left: 2px;
  border-bottom: 2px solid grey;
  :hover {
    background-color: ${(props: any) => props.theme.rowHoverColor};
    border-left: 2px solid ${(props: any) => props.theme.rowHoverLeftEndCapColor};
    padding-left: 0;
  }
  ${(props: any) =>
    props.even
      ? css`
          background: ${props.theme.rowEvenBackgroundColor};
        `
      : css`
          background: ${props.theme.rowOddBackgroundColor};
        `}
`;

export const PaginationStyle = styled(RowBaseStyle)`
  background-color: ${(props: any) => props.theme.paginationBackgroundColor};
  color: ${(props: any) => props.theme.paginationTextColor};
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const PaginationPageIndicator = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 24px 0;
`;

export const HeaderRowStyle = styled(RowBaseStyle)`
  background-color: ${(props: any) => props.theme.headerRowBackgroundColor};
  font-weight: bold;
  font-size: 12px;
  border-bottom: solid 1px ${(props: any) => props.theme.columnBottomBorderColor};
  color: ${(props: any) => props.theme.columnTextColor};
`;

export const CellStyle = styled.div`
  border-right: solid 1px ${(props: any) => props.theme.columnRightBorderColor};
  padding: 0.5rem;
  display: flex;
  align-items: flex-end;
`;

export const HeaderStyle = styled(CellStyle)`
  ${(props: any) => {
    const indicatorHeight: number = (props.sortedIndex + 1) * 3;

    return (
      props.sorted &&
      (props.sortedDesc
        ? css`
            box-shadow: inset 0 ${indicatorHeight}px ${props.theme.columnSortedDescIndicatorColor};
          `
        : css`
            box-shadow: inset 0 -${indicatorHeight}px ${props.theme.columnSortedAscIndicatorColor};
          `)
    );
  }};
`;
