import globalStyles from '../../../index.module.scss';

import { StylesConfig } from 'react-select/src/styles';
import { CSSProperties } from 'react';

const fontColor: string = globalStyles.white;
const isActive = (state: any) => state.isSelected; //  || state.isFocused;

const customStyles: StylesConfig = {
  // clearIndicator: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  container: (provider: CSSProperties, state: any) => {
    return {
      ...provider,
      width: '100%',
    };
  },
  control: (provider: CSSProperties, state: any) => {
    const { isDisabled } = state;
    // const color: string = state.selectProps.hasError ? globalStyles.red500 : globalStyles.grey400;
    const backgroundColor: string = isDisabled ? globalStyles.grey500 : isActive(state) ? globalStyles.grey200 : 'transparent';

    return {
      ...provider,
      backgroundColor,
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    };
  },
  dropdownIndicator: (provider: CSSProperties, state: any) => {
    return {
      ...provider,
      color: globalStyles.white,
    };
  },
  // group: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  // groupHeading: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  // indicatorsContainer: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  indicatorSeparator: (provider: CSSProperties, state: any) => {
    return {
      ...provider,
      display: 'none',
    };
  },
  input: (provider: CSSProperties, state: any) => {
    return {
      ...provider,
      color: fontColor,
    };
  },
  // loadingIndicator: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  // loadingMessage: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  menu: (provider: CSSProperties, state: any) => {
    return {
      ...provider,
      backgroundColor: globalStyles.grey200,
      borderRadius: 0,
      boxShadow: 'none',
      marginTop: 2,
    };
  },
  // menuList: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  // menuPortal: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  multiValue: (provider: CSSProperties, state: any) => {
    const { isDisabled } = state;
    const borderColor: string = isDisabled ? globalStyles.grey400 : globalStyles.green400;
    const backgroundColor: string = isDisabled ? globalStyles.grey400 : globalStyles.grey600;

    return {
      ...provider,
      backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: 0,
    };
  },
  multiValueLabel: (provider: CSSProperties, state: any) => {
    const { isDisabled } = state;

    return {
      ...provider,
      paddingRight: isDisabled ? 6 : provider.padding,
      color: fontColor,
    };
  },
  multiValueRemove: (provider: CSSProperties, state: any) => {
    const { isDisabled } = state;

    return {
      ...provider,
      display: isDisabled ? 'none' : 'display',
      color: globalStyles.green400,
      '&:hover': {
        backgroundColor: globalStyles.grey400,
        color: globalStyles.green400,
      },
    };
  },
  // noOptionsMessage: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  option: (provider: CSSProperties, state: any) => {
    return {
      ...provider,
      color: isActive(state) ? globalStyles.blue900 : globalStyles.white,
      backgroundColor: isActive(state) ? globalStyles.white : globalStyles.blue900,
      '&:active': {
        backgroundColor: globalStyles.white,
      },
      '&:hover': {
        color: globalStyles.blue900,
        backgroundColor: globalStyles.grey200,
      },
    };
  },
  // placeholder: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
  singleValue: (provider: CSSProperties, state: any) => {
    return {
      ...provider,
      color: globalStyles.grey200,
    };
  },
  // valueContainer: (provider: CSSProperties, state: any) => {
  //   return {
  //     ...provider,
  //   };
  // },
};

// const customDropDownIndicatorStyles = {
//   wrapper: () => ({
//     height: '26px',
//     position: 'absolute',
//     top: '1px',
//     right: '1px',
//     width: '20px',
//   }),
//   caret: (props: any) => ({
//     borderColor: props.isFocused
//       ? '#C3C5C8 transparent transparent transparent'
//       : '#888 transparent transparent transparent',
//     borderStyle: 'solid',
//     borderWidth: '5px 4px 0 4px',
//     height: '0',
//     left: '50%',
//     marginLeft: '-4px',
//     position: 'absolute',
//     top: '50%',
//     width: '0',
//   }),
// };

export {
  customStyles,
  // customDropDownIndicatorStyles,
};
