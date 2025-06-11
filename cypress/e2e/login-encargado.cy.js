describe('Login como Encargado', () => {
  it('Debería iniciar sesión correctamente como encargado', () => {
    cy.visit('https://hopematch.publicvm.com/');

    // Ir a la página de login
    cy.contains('button', 'Log In').click();

    // Llenar email y password
    cy.get('input[placeholder="Email*"]').type('fernanda@gmail.com');
    cy.get('input[placeholder="Password*"]').type('Hopematch1@');

    // Seleccionar tipo de usuario
    cy.get('input[type="radio"][value="encargado"]').check({ force: true });

    // Hacer clic en Log In
    cy.contains('button', 'Log In').click();

    // Verificar redirección (ajusta si la URL es diferente)
    cy.url().should('include', '/home-encargado');
  });
});

