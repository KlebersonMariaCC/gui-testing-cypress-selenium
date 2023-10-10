describe('groups', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement others test cases!
  it('update the name of Wholesale group', () => {
    // Click in groups in side menu
    cy.clickInFirst('a[href="/admin/customer-groups/"]');
    // Type in value input to search for specify group
    cy.get('[id="criteria_search_value"]').type('wholesale');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the last group
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Edit group name
    cy.get('[id="sylius_customer_group_name"]').scrollIntoView().clear().type('Wholesale 100');
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that group has been updated
    cy.get('body').should('contain', 'Customer group has been successfully updated.');
  });



  it('Verifica a criação de um grupo', () => {
 
    cy.visit('http://localhost:9990/admin/customer-groups/')


    // clica no botão de criar grupo
    cy.get('.admin-layout__content > .ui > .middle > .ui > .ui').click()

    cy.visit('http://localhost:9990/admin/customer-groups/new')


    //digita os dados no formulário 
    cy.get('.admin-layout__content > .ui > .ui > .required > #sylius_customer_group_code').click()
 
    cy.get('.admin-layout__content > .ui > .ui > .required > #sylius_customer_group_code').type('teste')
 
    cy.get('.admin-layout__content > .ui > .ui > .required > #sylius_customer_group_name').click()
 
    cy.get('.admin-layout__content > .ui > .ui > .required > #sylius_customer_group_name').type('teste1')
 
    //cria o grupo
    cy.get('.admin-layout__content > .ui > .ui > .ui > .ui:nth-child(1)').click()


    //retorna a pagina de grupos
    cy.get('.admin-layout__content > .ui > .column > .ui > .section:nth-child(3)').click()
 
    cy.visit('http://localhost:9990/admin/customer-groups/')
 
    //Assert que verifica se tem um "teste1" no body (o novo grupo)
    cy.get('body').should('contain', 'teste1')
  });



  it('Verifica se a busca funciona', () => {
   
    cy.visit('http://localhost:9990/admin/customer-groups/')


    // preenche  formulário de busca
    cy.get('.admin-layout > .admin-layout__body > .admin-layout__content > .ui > .middle').click()
 
    cy.get('.sylius-filters > .sylius-filters__field > .sylius-filters__group > .field > #criteria_search_value').click()
 
    cy.get('.sylius-filters > .sylius-filters__field > .sylius-filters__group > .field > #criteria_search_value').type('teste1')


    //aperta o botão de busca
    cy.get('.admin-layout__content > .ui > .content > .ui > .ui:nth-child(2)').click()
    
    //resultado da busca
    cy.visit('http://localhost:9990/admin/customer-groups/?criteria%5Bsearch%5D%5Btype%5D=contains&criteria%5Bsearch%5D%5Bvalue%5D=teste1')

    //Assert que verifica se tem um "teste1" no body (o grupo procurado)
    cy.get('body').should('contain', 'teste1')
  });


  it('Verifica uma busca sem resultados', () => {

    cy.visit('http://localhost:9990/admin/customer-groups/')


    //insere no formulario valores inexistentes
    cy.get('.sylius-filters > .sylius-filters__field > .sylius-filters__group > .field > #criteria_search_value').click()

    cy.get('.sylius-filters > .sylius-filters__field > .sylius-filters__group > .field > #criteria_search_value').type('teste2')

    //realiza a busca
    cy.get('.admin-layout__content > .ui > .content > .ui > .ui:nth-child(2)').click()

    cy.visit('http://localhost:9990/admin/customer-groups/?criteria%5Bsearch%5D%5Btype%5D=contains&criteria%5Bsearch%5D%5Bvalue%5D=teste2')

    /**Assert que verifica se não tem um "teste2" no body (o grupo procurado)
    por meio da mensagem de ausencia de reultado 
    **/
    cy.get('body').should('contain', 'There are no results to display')

  });
  
  it('Verifica se deletar um gurpo está funcionando', () => {
    
    cy.visit('http://localhost:9990/admin/customer-groups/')
    
    //tenta remover o grupo 'teste1' (criado em um teste anterior) clicando no botão delete
    cy.get('.item:nth-child(2) > td > .ui >  > .formui').click()
    
    //botão de confirmação
    cy.get('.dimmable > .ui > #confirmation-modal > .actions > #confirmation-button').click()
    
    //Assert que verifica se a mensagem de remoção foi exibida.

    /**
    cy.visit('http://localhost:9990/admin/customer-groups/')

    //tenta remover o grupo 'teste1' (criado em um teste anterior) clicando no botão delete
    cy.get('.ui > tbody > .item:nth-child(2) > .center > .bulk-select-checkbox').click()
 
    cy.get('.ui > tbody > .item:nth-child(2) > .center > .bulk-select-checkbox').check('4')
 
    cy.get('.sylius-grid-nav > .sylius-grid-nav__bulk > form > .ui > .icon').click()
 
    cy.get('.dimmable > .ui > #confirmation-modal > .actions > #confirmation-button').click()

    */
    cy.get('body').should('contain','Customer group has been successfully deleted.')

    /**
    cy.get('.ui > tbody').should('have.length',2)
    */

  });
  
  /**
  it('test case 6', () => {
    // Implement your test case 3 code here
  });

  it('test case 7', () => {
    // Implement your test case 3 code here
  });

  it('test case 8', () => {
    // Implement your test case 3 code here
  });

  it('test case 9', () => {
    // Implement your test case 3 code here
  });

  it('test case 10', () => {
    // Implement your test case 3 code here
  });

  */  
});


 
