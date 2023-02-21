import Account from "../../domain/entity/Account";
import Command from "./Command";

export default class CreditCommand implements Command {
    operation: string = "credit";

    constructor(readonly accountDocument: string,readonly  amount: number) {
  }
 

}