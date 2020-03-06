export class User {
  public name;
  public guid;
  public email;
  public orders;

  constructor(name: string, guid: string, email: string, order: Array<string> ) {
    this.name = name;
    this.guid = guid;
    this.email = email;
    this.orders = order;
  }
}
