import mitt from 'mitt';

type Events = {
  message: any;
  connect: void;
  disconnect: void;
  chart_loading: any;
  upAdvancedList: any;
  upProductList: any
  LoginOut: any;
  switchNetwork: any;
  // more。。。
};

export const wsBus = mitt<Events>();