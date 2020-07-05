import MetaAction from './MetaAction';
import IMetaState from './IMetaState';
import ITitleDescription from './Models/ITitleDescription';
import IAction from '../../Models/IAction';
import BaseReducer from '../BaseReducer';

class MetaReducer extends BaseReducer<IMetaState> {
  public readonly initialState: IMetaState = {
    description: '',
    title: 'SF Manage',
  };

  public [MetaAction.SET](state: IMetaState, action: IAction<ITitleDescription>) {
    const { title, description } = action.payload!;
    const browserTitle: string = `${title} - Influent by AMADA`;

    if (document) {
      document.title = browserTitle;
    }

    return {
      ...state,
      description: description || '',
      title: browserTitle,
    };
  }

  public [MetaAction.CLEAR](state: IMetaState, action: IAction<ITitleDescription>) {
    return {
      ...state,
      description: '',
      title: '',
    };
  }
}

export default MetaReducer;
