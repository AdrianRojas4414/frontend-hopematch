describe('Login como Padrino', () => {
  it('Debería iniciar sesión correctamente como padrino', () => {
    cy.visit('https://hopematch.publicvm.com/');

    // Ir a la página de login desde el inicio
    cy.contains('button', 'Log In').click();

    // Llenar email y password
    cy.get('input[placeholder="Email*"]').type('adrian@gmail.com');
    cy.get('input[placeholder="Password*"]').type('Hopematch1@');

    // Seleccionar el tipo de usuario: padrino
    cy.get('input[type="radio"][value="padrino"]').check({ force: true });

    // Hacer clic en Log In
    cy.contains('button', 'Log In').click();

    // Verificar que redirige a alguna ruta esperada
    cy.url().should('include', '/home-padrino');
  });
});

