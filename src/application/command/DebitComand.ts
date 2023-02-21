import Account from "../../domain/entity/Account";
import Command from "./Command";

export default class DebitCommand implements Command {
    operation: string = "debit";

    constructor(readonly accountDocument: string,readonly  amount: number) {
  }
 

}