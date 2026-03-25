document.addEventListener('DOMContentLoaded', () => {

    const avatar = document.getElementById('avatar');
    const inputAvatar = document.getElementById('input-avatar');

    const menuToggle = document.getElementById('menu-toggle');
    const header = document.querySelector('.cabecalho-topo');

    menuToggle.addEventListener('click', () => {
        header.classList.toggle('menu-aberto');
    });

    // 🔥 NOVO: função para mostrar o toast de sucesso
    function mostrarToast() {
        const toast = document.getElementById('toast-sucesso');

        toast.classList.add('mostrar');

        setTimeout(() => {
            toast.classList.remove('mostrar');
        }, 3000);
    }

    // Clicar no avatar abre o seletor
    avatar.addEventListener('click', () => {
        inputAvatar.click();
    });

    // Quando escolher imagem
    inputAvatar.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                avatar.src = e.target.result;

            // tenta salvar, mas evita erro de limite
            try {
                localStorage.setItem('avatarUsuario', e.target.result);
            } catch (error) {
                console.warn('Imagem muito grande, não foi salva no localStorage');
            }

                // mostra o alerta de sucesso ao trocar a foto
                mostrarToast();
            };

            reader.readAsDataURL(file);
        }
    });

    const avatarWrapper = document.querySelector('.avatar-wrapper');

    avatarWrapper.addEventListener('click', () => {
        inputAvatar.click();
    });

    const avatarSalvo = localStorage.getItem('avatarUsuario');

    if (avatarSalvo) {
        avatar.src = avatarSalvo;
    }

    // Interatividade dos botões "Seguir"
    const followButtons = document.querySelectorAll('.botao-seguir');

    // Alternar modo escuro
    const botaoTema = document.getElementById('alternar-tema');
    const iconeTema = botaoTema.querySelector('i');

    botaoTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Ativa estilo do botão
        botaoTema.classList.toggle('ativo');

        // Troca ícone
        if (document.body.classList.contains('dark-mode')) {
            iconeTema.classList.remove('fa-moon');
            iconeTema.classList.add('fa-sun');
        } else {
            iconeTema.classList.remove('fa-sun');
            iconeTema.classList.add('fa-moon');
        }
    });

    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const followersElement = card.querySelector('.estatistica strong'); // pega o primeiro número

            let followers = parseInt(followersElement.textContent);

            if (this.classList.contains('seguindo')) {
                // Deixar de seguir → diminui
                this.classList.remove('seguindo');
                this.textContent = 'Seguir';
                followers--;
            } else {
                // Seguir → aumenta
                this.classList.add('seguindo');
                this.innerHTML = 'Seguindo <i class="fa-solid fa-check"></i>';
                followers++;
            }

            followersElement.textContent = followers;
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

// Trocar cor do header ao clicar na paleta
const paletteButtons = document.querySelectorAll('.icone-funcao');

const colors = [
    'linear-gradient(135deg, #2563eb, #1d4ed8)',
    'linear-gradient(135deg, #ec4899, #be185d)',
    'linear-gradient(135deg, #10b981, #047857)',
    'linear-gradient(135deg, #f59e0b, #b45309)',
    'linear-gradient(135deg, #8b5cf6, #5b21b6)',
    'linear-gradient(135deg, #ef4444, #991b1b)'
];

paletteButtons.forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.card');
        const header = card.querySelector('.cabecalho-card');

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        header.style.background = randomColor;
    });
});