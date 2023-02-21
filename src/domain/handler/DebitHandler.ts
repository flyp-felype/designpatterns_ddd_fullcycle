import AccountRepository from "../../infra/repository/AccountRespositoryMemory";
import Command from "../../application/command/Command";
import CreditCommand from "../../application/command/CreditCommand";
import DebitCommand from "../../application/command/DebitComand";
import Observer from "../../infra/queue/Observer";

export default class DebitHandler implements Observer {
    operation: string = "debit";

    constructor(readonly accountRepository: AccountRepository){}

    notify(command: DebitCommand): void {
        const account = this.accountRepository.get(command.accountDocument)
        if(account){
            account.debit(command.amount)
        }
    }

}