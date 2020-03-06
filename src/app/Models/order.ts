export class Order {
  public id;
  public items;
  public status;

  constructor(id: string, items: Array<any>, status: string) {
    this.id = id;
    this.items = items;
    this.status = status;
  }
}
