describe('Ver detalles del hogar - Padrino', () => {
  it('Debe loguearse, ver info del hogar, entrar al detalle y cerrar sesión', () => {
    cy.visit('https://hopematch.publicvm.com/');

    // Click en Log In desde la home
    cy.contains('button', 'Log In').click();

    // Login como padrino
    cy.get('input[name="email"]').type('adrian@gmail.com');
    cy.get('input[name="password"]').type('Hopematch1@');
    cy.get('input#mat-radio-0-input').check({ force: true }); // Padrino
    cy.contains('button', 'Log In').click();

    // Entra al detalle del hogar
    cy.contains('button', 'Ver Hogar').click();

    // Verifica que está en detalle-hogar
    cy.url().should('include', '/detalle-hogar');

    // Verifica que aparece la sección "Mis Donaciones"
    cy.contains('h2', 'Mis Donaciones').should('exist');

    // Volver al home
    cy.contains('a', 'Volver').click();

    // Cerrar sesión
    cy.contains('button', 'Sign Out').click();

    // Verifica que redirige a home
    cy.url().should('eq', 'https://hopematch.publicvm.com/');
  });
});
