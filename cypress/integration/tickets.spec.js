
describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    //beforeEach é o que sempre se repete entre os its
    //.visit para entrar na url requerida

    const firstName = "Marina";
    const lastName = "Giaquinto";

    it("Preencher todos os campos com entrada de texto", () => {
        //.only é da biblioteca mocha utilizada nos teste unitérios para rodar só um teste
        cy.get("#first-name").type(firstName)
        //cy.get é o comando para identificar elementos através do select CSS
        // # represensa id "frist-name" foi o nome dado ao id
        //com cy.get identificamos o elemento e com .type digitamos o que quer no campo
        cy.get("#last-name").type(lastName)
        cy.get("#email").type("marinagiaquinto@hotmail.com")
        cy.get("#requests").type("Vegetariana")
        cy.get("#signature").type(`${firstName} ${lastName}`)
    })
    
    it("Selecionar o ticket 2", () => {
        cy.get("#ticket-quantity").select("2")
        //.select para selecionar elementos dentro de um campo select
    })
    
    it("Selecionar uma opção ", () => {
        cy.get("#vip").check()
        // radion button, aceita apenas uma seleção dos elementos. quando um elemento é selecionado
        //o outro automaticamente perde a seleção 
    })

    it("Selecionar as opções do checkbox", () => {
        cy.get("#friend").check()
        cy.get("#publication").check()
        cy.get("#social-media").check()
        cy.get("#publication").uncheck()
        //checkbox permite a seleção de diversos campos ao mesmo tempo
    })

    it("Ter'TICKETBOX' no topo do cabeçalho", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
        //verifica se um determinado elemento HTML possui um determinado texto
    })

    it("Alertar de email invalido", () => {
        cy.get("#email")
        .as("email")
        // .as serve para dar um apelido, identificado posteriormente pelo @
        .type("umemailinválido-hotmail.com")
        cy.get("#email.invalid").should("exist")
        //elemento email com a classe invalid deve existir
        //como o invalid deixa o campo em vermelho, com ele eu confirmo que o campo ficou destacado

        cy.get("@email")
        //@ que identifica que o nome se trata de um apelido
        .clear()
        .type("marinagiaquinto@hotmail.com")

        cy.get("#email.invalid").should("not.exist")
    })




//AULA 8: E2E

    it("Preencher e resetar o formulário", () => {
        cy.get("#first-name").type("Lucas José")
        cy.get("#last-name").type("Carvalho Teixeira")
        cy.get("#email").type("lucasjcteixeira@gmail.com")
        cy.get("#ticket-quantity").select("2")
        cy.get("#vip").check()
        cy.get("#friend").check()
        cy.get("#requests").type("Não")
        cy.get(".agreement p").should(
            "contain",
            "I, Lucas José Carvalho Teixeira, wish to buy 2 VIP tickets.")
        cy.get("#agree").check()
        cy.get("#signature").type("Mc Lutão")

        cy.get("button[type='submit']")
        .as("submit")
        .should("not.be.disabled")
        
        cy.get("button[type='reset']").click()

        cy.get("@submit")
        .should("be.disabled")

    })



//AULA 9: Comandos customizados

    it("Preenchiento de campos obrigatórios", () => {
        //cria um objeto JavaScript tendo os campos obrigatórios como chaves
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joaosilva@gmail.com"
        }

        //chama a função customizada como qualquer função já pronta, com o cy.
        //essa função está descrita em support -> commands.js
        //função => facilitar a reutilização do código, evitando duplicação
        cy.preenchimentoObrigatorio(customer)


        cy.get("button[type='submit']")
        .as("submit")
        .should("not.be.disabled")
        
        cy.get("#agree").uncheck()

        cy.get("@submit")
        .should("be.disabled")

    })




})