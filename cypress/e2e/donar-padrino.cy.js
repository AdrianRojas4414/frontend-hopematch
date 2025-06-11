describe('Flujo de donación - Padrino', () => {
  it('Debe loguearse, donar y cerrar sesión', () => {
    // Visita la página inicial
    cy.visit('https://hopematch.publicvm.com/');

    // Click en el botón "Log In" de la home
    cy.contains('button', 'Log In').click();

    // Completa login como padrino
    cy.get('input[name="email"]').type('adrian@gmail.com');
    cy.get('input[name="password"]').type('Hopematch1@');
    cy.get('input#mat-radio-0-input').check({ force: true }); // Padrino
    cy.contains('button', 'Log In').click();

    // Verifica que aparece el hogar "Hogar Esperanza"
    cy.contains('h5', 'Hogar Esperanza').should('exist');

    // Click en "Donar"
    cy.contains('button', 'Donar').click();

    // Verifica que llegó a la página de donación
    cy.url().should('include', '/registro-donacion');

    // Ingresa monto de donación
    cy.get('input[name="cantidad_donacion"]').type('100');

    // Selecciona una necesidad (usamos el ID que diste)
    cy.get('input#necesidad_2-input').check({ force: true });

    // Click en "Guardar Donación"
    cy.contains('button', 'Guardar Donación').click();

    // Espera y acepta la alerta
    cy.on('window:alert', (text) => {
      expect(text).to.match(/(Donación|confirmada|éxito)/i);
    });
    cy.on('window:confirm', () => true);

    // Verifica que redirige al home del padrino
    cy.url().should('include', '/home-padrino');

    // Cierra sesión
    cy.contains('button', 'Sign Out').click();

    // Verifica redirección al home
    cy.url().should('eq', 'https://hopematch.publicvm.com/');
  });
});
