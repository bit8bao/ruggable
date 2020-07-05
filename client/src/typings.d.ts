declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module 'recharts';
declare module 'is-iexplorer';

interface Window {
  $: JQuery;
  user: string;
  moment: import('moment').Moment;
}

interface JQuery {
  datetimepicker: any;
}

declare module 'environment' {
  import baseEnv from 'Environments/base';
  const value: ReturnType<typeof baseEnv>;

  export default value;
}
