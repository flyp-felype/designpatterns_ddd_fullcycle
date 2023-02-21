import AccountApplicationService from "../src/application/service/AccountApplicationService";
import AccountBuilder from "../src/domain/builder/AccountBuilder"
import AccountRepositoryMemory from "../src/infra/repository/AccountRespositoryMemory"; 
import CreditHandler from "../src/domain/handler/CreditHandler"; 
import DebitHandler from "../src/domain/handler/DebitHandler";
import Publisher from "../src/infra/queue/Publisher"; 
import TransferHandler from "../src/domain/handler/TransferHandler";

let service: AccountApplicationService

beforeEach(function(){
    const publisher = new Publisher(); 
    const accountRepository = new AccountRepositoryMemory()
    publisher.register(new CreditHandler(accountRepository))
    publisher.register(new DebitHandler(accountRepository))
    publisher.register(new TransferHandler(accountRepository))
      service = new AccountApplicationService(publisher, accountRepository)
})

test("Deve criar uma conta", function () {
 
    service.create("111.111.11-11");
    const account = service.get("111.111.11-11")
    expect(account.getBalance()).toBe(0)
})

test("Deve criar uma conta e fazer um credito", function () {
  
    service.create("111.111.11-11");
    service.credit("111.111.11-11", 1000);
    // account.credit(1000)  
    const account = service.get("111.111.11-11")
    expect(account.getBalance()).toBe(1000)
})


test("Deve criar uma conta e fazer um debito", function () {
    service.create("111.111.11-11")
    service.credit("111.111.11-11", 1000)
    service.debit("111.111.11-11", 500)
    const account = service.get("111.111.11-11")

    expect(account.getBalance()).toBe(500)
})


test("Deve criar duas contas e fazer uma transferencia", function () {
    service.create("111.111.11-11")
    service.credit("111.111.11-11", 1000)
    service.create("222.222.22-22")
    service.credit("222.222.22-22", 500) 
    service.transfer("111.111.11-11",  "222.222.22-22", 700)

    const accountFrom = service.get("111.111.11-11")
    const accountTo = service.get("222.222.22-22")

    expect(accountFrom.getBalance()).toBe(300)
    expect(accountTo.getBalance()).toBe(1200)


})