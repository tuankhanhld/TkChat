import {Imessage} from './imessage.model';

export interface ImessageHolder {
  id: string;
  userPhotoUrl: string;
  messages: Imessage[];
  isSelf: boolean;
}
