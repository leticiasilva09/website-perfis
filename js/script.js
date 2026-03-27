document.addEventListener('DOMContentLoaded', () => {

    const avatar = document.getElementById('avatar');
    const inputAvatar = document.getElementById('input-avatar');
    const avatarWrapper = document.querySelector('.avatar-wrapper');

    const menuToggle = document.getElementById('menu-toggle');
    const header = document.querySelector('.cabecalho-topo');

    // MENU MOBILE
    if (menuToggle && header) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('menu-aberto');

            // trava/destrava o scroll
            if (header.classList.contains('menu-aberto')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // AVATAR
    if (avatar && inputAvatar) {

        if (avatarWrapper) {
            avatarWrapper.addEventListener('click', () => {
                inputAvatar.click();
            });
        }

        inputAvatar.addEventListener('change', function () {
            const file = this.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const imageData = e.target.result;

                    avatar.src = '';
                    setTimeout(() => {
                        avatar.src = imageData;
                    }, 10);

                    try {
                        localStorage.setItem('avatarUsuario', imageData);
                    } catch (error) {
                        console.warn('Imagem muito grande, não foi salva no localStorage');
                    }

                    mostrarToast();
                };

                reader.readAsDataURL(file);

                // permite selecionar a mesma imagem novamente
                this.value = '';
            }
        });

        // MENSAGEM DE SUCESSO
        function mostrarToast() {
            const toast = document.getElementById('toast-sucesso');
            if (!toast) return;

            toast.classList.add('mostrar');

            setTimeout(() => {
                toast.classList.remove('mostrar');
            }, 3000);
        }

        // carregar avatar salvo
        const avatarSalvo = localStorage.getItem('avatarUsuario');

        if (avatarSalvo) {
            avatar.src = avatarSalvo;
        }
    }

    // MODO ESCURO
    const botaoTema = document.getElementById('alternar-tema');

    if (botaoTema) {
        const iconeTema = botaoTema.querySelector('i');

        // carregar estado salvo
        const temaSalvo = localStorage.getItem('tema');

        if (temaSalvo === 'dark') {
            document.body.classList.add('dark-mode');
            botaoTema.classList.add('ativo');

            if (iconeTema) {
                iconeTema.classList.remove('fa-moon');
                iconeTema.classList.add('fa-sun');
            }
        }

        botaoTema.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            botaoTema.classList.toggle('ativo');

            const modoEscuroAtivo = document.body.classList.contains('dark-mode');

            // salvar estado
            localStorage.setItem('tema', modoEscuroAtivo ? 'dark' : 'light');

            if (iconeTema) {
                if (modoEscuroAtivo) {
                    iconeTema.classList.remove('fa-moon');
                    iconeTema.classList.add('fa-sun');
                } else {
                    iconeTema.classList.remove('fa-sun');
                    iconeTema.classList.add('fa-moon');
                }
            }
        });
    }

    // SEGUIDORES
    const followButtons = document.querySelectorAll('.botao-seguir');

    followButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            if (!card) return;

            const followersElement = card.querySelector('.estatistica strong');
            if (!followersElement) return;

            // remove qualquer caractere que não seja número
            let followers = parseInt(followersElement.textContent.replace(/\D/g, ''));

            // caso o valor não seja um número válido, define como 0
            if (isNaN(followers)) followers = 0;

            // confere se o botão já está no estado "seguindo"
            if (this.classList.contains('seguindo')) {
                this.classList.remove('seguindo');
                this.textContent = 'Seguir';
                followers--;
            } else {
                this.classList.add('seguindo');
                this.innerHTML = 'Seguindo <i class="fa-solid fa-check"></i>';
                followers++;
            }

            followersElement.textContent = followers;
        });
    });

    // NAVBAR
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // CORES
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
            if (!card) return;

            const header = card.querySelector('.cabecalho-card');
            if (!header) return;

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            header.style.background = randomColor;
        });
    });

    // MODAL DOS CARDS
    const cards = document.querySelectorAll('.card');
    const overlay = document.getElementById('overlay');

    cards.forEach(card => {
        card.addEventListener('click', function (e) {

            // evita conflito com botão seguir
            if (e.target.closest('.botao-seguir')) return;

            // já aberto? não faz nada
            if (this.classList.contains('ativo')) return;

            this.classList.add('ativo');
            overlay.classList.add('ativo');

            // trava scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // FECHAR AO CLICAR FORA
    overlay.addEventListener('click', () => {
        document.querySelectorAll('.card.ativo').forEach(card => {
            card.classList.remove('ativo');
        });

        overlay.classList.remove('ativo');

        // libera scroll
        document.body.style.overflow = '';
    });

});