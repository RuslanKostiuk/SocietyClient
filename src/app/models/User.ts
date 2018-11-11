import {Genders} from "../shared/enums";
import Address from "./Address";

export default class User {
  public _id: string;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public birthday: string;
  public relationship: {
    idParthner: string,
    relationshipStatus: string
  };
  public isOnline: boolean;
  public isFirstTime: boolean;
  public address: Address = new Address();
  public friends: [{
    idFriend: string;
    avatar: string;
    friendInviteStatus: string
  }];
  public conversatinsIds: Array<string>;
  public videos: string;
  public gender: Genders;
  public wall: any;
  avatar: string;
}
