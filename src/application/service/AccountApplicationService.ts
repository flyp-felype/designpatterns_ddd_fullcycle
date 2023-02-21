import AccountBuilder from "../../domain/builder/AccountBuilder"
import AccountRepositoryMemory from "../../infra/repository/AccountRespositoryMemory"
import CreditCommand from "../command/CreditCommand"
import DebitCommand from "../command/DebitComand"
import Publisher from "../../infra/queue/Publisher"
import TransferCommand from "../command/TransferCommand"

export default class AccountApplicationService {
    constructor(readonly publisher: Publisher, readonly accountRepository: AccountRepositoryMemory) {

    }

    create(document: string) {
        const account = new AccountBuilder(document).build()
        this.accountRepository.save(account)
    }

    credit(accountDocument: string, amount: number) {
        const creditcommand = new CreditCommand(accountDocument, amount)
        this.publisher.publish(creditcommand)
    }
    debit(accountDocument: string, amount: number) {
        const debitComand = new DebitCommand(accountDocument, amount)
        this.publisher.publish(debitComand)
    }

    transfer(accountDocumentFrom: string, accountDocumentTo: string, amout:number){
        const transferCommand = new TransferCommand(accountDocumentFrom, accountDocumentTo, amout)
        this.publisher.publish(transferCommand)
    }

    get(accountDocument: string){
        return this.accountRepository.get(accountDocument)
    }
}