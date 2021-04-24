import {store} from '../../../redux/store';
import {toggleSpinnerAction} from '../../../redux/spinner/actions';

export default class SpinnerService {
  static serviceInstance: any = null;
  static getInstance() {
    if (SpinnerService.serviceInstance === null) {
      SpinnerService.serviceInstance = new SpinnerService();
    }
    return this.serviceInstance;
  }
  constructor() {}
  showLoading() {
    setTimeout(() => {
      store.dispatch(toggleSpinnerAction(true));
    }, 0);
  }

  hideLoading() {
    store.dispatch(toggleSpinnerAction(false));
  }
}
