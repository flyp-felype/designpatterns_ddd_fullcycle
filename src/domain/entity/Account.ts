import AccountBuilder from "../builder/AccountBuilder";
import Transaction from "./Transaction";

export default class Account {
     bank: string | undefined;
     branch: string | undefined;
     account: string | undefined;
    document: string;
    transactions: Transaction[]

    constructor(accountBuilder: AccountBuilder) {
        this.bank = accountBuilder.bank;
        this.branch = accountBuilder.branch;
        this.account = accountBuilder.account;
        this.document = accountBuilder.document
        this.transactions = []
    }

    credit(amount: number) {
        this.transactions.push(new Transaction('credit', amount))
    }

    debit(amount: number) {
        this.transactions.push(new Transaction('debit', amount))
    }

    getBalance() {
        let balance = 0;
        for (const transactions of this.transactions) {
            if (transactions.type === "credit") {
                balance += transactions.amount
            }
            if (transactions.type === "debit") {
                balance -= transactions.amount
            }

        }

        return balance;
    }
}