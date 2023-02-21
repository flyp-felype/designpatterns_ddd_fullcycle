import Account from "../../domain/entity/Account";
import Command from "./Command";
import TransferService from "../../domain/service/TransferService";

export default class TransferCommand implements Command {
    operation: string = "transfer";

    constructor(readonly accountDocumentFrom: string, readonly accountDocumentTo: string, readonly amount: number) {
    }
 
}