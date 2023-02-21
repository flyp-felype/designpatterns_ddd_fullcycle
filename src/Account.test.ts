import AccountBuilder from "./AccountBuilder"
import TransferService from "./TransferService";

test("Deve criar uma conta", function () {
    const account = new AccountBuilder("111.111.11-11")
        .setBank("033")
        .setBranch("001")
        .setAccount("1111")
        .build();
    account.credit(1000)
    expect(account.getBalance()).toBe(1000)
})

test("Deve criar uma conta e fazer um credito", function () {
    const account = new AccountBuilder("111.111.11-11")
        .setBank("033")
        .setBranch("001")
        .setAccount("1111")
        .build();
    account.credit(1000)
    expect(account.getBalance()).toBe(1000)
})

test("Deve criar duas contas e fazer uma transferencia", function () {
    const accountFrom = new AccountBuilder("111.111.11-11")
        .setBank("033")
        .setBranch("001")
        .setAccount("1111")
        .build();
        const accountTo = new AccountBuilder("222.222.222-22")
        .setBank("033")
        .setBranch("001")
        .setAccount("1234")
        .build();
        accountFrom.credit(1000)
        accountTo.credit(500)  
        const transferService = new TransferService()
       transferService.transfer(accountFrom, accountTo, 700)
       expect(accountFrom.getBalance()).toBe(300)
       expect(accountTo.getBalance()).toBe(1200)
})