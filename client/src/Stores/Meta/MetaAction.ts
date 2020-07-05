import IAction from '../../Models/IAction';
import ITitleDescription from './Models/ITitleDescription';
import ActionUtility from '../../Utilities/ActionUtility';

type ActionUnion = undefined | ITitleDescription;

export default class MetaAction {
  public static readonly SET: string = 'MetaAction.SET';
  public static readonly CLEAR: string = 'MetaAction.CLEAR';

  public static setMeta(meta: ITitleDescription): IAction<ITitleDescription> {
    return ActionUtility.createAction(MetaAction.SET, meta);
  }

  public static clearMeta(): IAction<ITitleDescription> {
    return ActionUtility.createAction(MetaAction.CLEAR);
  }
}
