document.addEventListener('DOMContentLoaded', () => {
    // Interatividade dos botões "Seguir"
    const followButtons = document.querySelectorAll('.follow-btn');

    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Verifica se já está seguindo
            if (this.classList.contains('following')) {
                this.classList.remove('following');
                this.textContent = 'Seguir';
            } else {
                this.classList.add('following');
                this.textContent = 'Seguindo';
            }
        });
    });

    // Interatividade da barra de navegação inferior
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o salto da página
            
            // Remove a classe 'active' de todos os itens
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Adiciona a classe 'active' ao item clicado
            this.classList.add('active');
        });
    });
});