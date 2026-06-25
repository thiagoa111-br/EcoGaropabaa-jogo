document.addEventListener("DOMContentLoaded", function() {
    console.log("🌊 EcoGaropaba - Missão Praia Limpa ativada!");

    // ===== BANCO DE RESÍDUOS COMPLETO (20 ITENS) =====
    const listaResiduos = [
        // Orgânicos
        { emoji: "🍌", nome: "Casca de Banana", tipo: "organico", dica: "Restos de alimentos atraem insetos e ratos." },
        { emoji: "🥑", nome: "Caroço de Abacate", tipo: "organico", dica: "Demora meses para decompor e atrai animais selvagens." },
        { emoji: "🧉", nome: "Erva-Mate", tipo: "organico", dica: "A erva do chimarrão é orgânica, mas se acumular na areia mofa." },
        { emoji: "🍕", nome: "Pedaço de Pizza", tipo: "organico", dica: "Restos de comida poluem a areia e prejudicam a fauna local." },
        { emoji: "🍎", nome: "Resto de Maçã", tipo: "organico", dica: "Frutas se decompõem rápido, mas atraem vespas na praia." },
        
        // Recicláveis
        { emoji: "🍼", nome: "Garrafa Plástica", tipo: "reciclavel", dica: "O plástico pode fragmentar em microplástico e matar animais marinhos!" },
        { emoji: "🥫", nome: "Lata de Alumínio", tipo: "reciclavel", dica: "O alumínio é 100% reciclável, não o deixe na areia." },
        { emoji: "📦", nome: "Caixa de Papelão", tipo: "reciclavel", dica: "O papelão molha e desmancha, mas deve ser reciclado seco." },
        { emoji: "🍾", nome: "Garrafa de Vidro", tipo: "reciclavel", dica: "Vidro quebrado na areia pode cortar banhistas e animais." },
        { emoji: "🛍️", nome: "Sacola Plástica", tipo: "reciclavel", dica: "Tartarugas confundem sacolas plásticas com águas-vivas." },

        // Eletrônicos
        { emoji: "🔋", nome: "Pilha Velha", tipo: "eletronico", dica: "Pilhas vazam metais pesados altamente tóxicos para o solo e água." },
        { emoji: "📱", nome: "Bateria de Celular", tipo: "eletronico", dica: "Baterias contêm componentes químicos perigosos." },
        { emoji: "🔌", nome: "Cabo USB Quebrado", tipo: "eletronico", dica: "Cabos e fios possuem cobre e plástico que devem ser processados separadamente." },
        { emoji: "🖲️", nome: "Mouse Velho", tipo: "eletronico", dica: "Placas de circuito eletrônico necessitam de descarte especial." },
        { emoji: "🔦", nome: "Lanterna Estragada", tipo: "eletronico", dica: "Dispositivos eletrônicos não devem ir para o lixo comum." },

        // Rejeito
        { emoji: "🚬", nome: "Bituca de Cigarro", tipo: "rejeito", dica: "Uma única bituca polui até 50 litros de água com toxinas!" },
        { emoji: "🧻", nome: "Papel Higiênico", tipo: "rejeito", dica: "Papéis de higiene usados não são recicláveis devido à contaminação." },
        { emoji: "🩲", nome: "Fralda Descartável", tipo: "rejeito", dica: "Fraldas levam cerca de 500 anos para se decompor no ecossistema." },
        { emoji: "🍬", nome: "Chiclete Mastigado", tipo: "rejeito", dica: "Pássaros tentam comer chicletes grudados na areia e podem morrer sufocados." },
        { emoji: "🩹", nome: "Curativo Usado", tipo: "rejeito", dica: "Materiais de primeiros socorros usados são considerados rejeitos não recicláveis." }
    ];

    // ===== VARIÁVEIS DO JOGO =====
    let pontos = 0;
    let lixosRecolhidos = 0;
    const metaLixos = 15;
    let itemSelecionado = null;

    // ===== ELEMENTOS DO DOM =====
    const telaInicio = document.getElementById("tela-inicio");
    const telaVitoria = document.getElementById("tela-vitoria");
    const btnIniciar = document.getElementById("btn-iniciar");
    const praia = document.getElementById("praia");
    const contadorPontos = document.getElementById("contador-pontos");
    const pontosFinais = document.getElementById("pontos-finais");
    const barraProgresso = document.getElementById("barra-progresso");
    const mensagemAlerta = document.getElementById("mensagem-alerta");
    const indicadorMeta = document.getElementById("meta-lixos");
    const lixeiras = document.querySelectorAll(".lixeira");

    // ===== INICIAR JOGO =====
    btnIniciar.addEventListener("click", function() {
        telaInicio.classList.add("escondida");
        mensagemAlerta.textContent = "🔍 Clique em um resíduo na praia para recolhê-lo!";
        inicializarPraia();
    });

    // ===== FUNÇÃO PARA GERAR OS LIXOS NA AREIA =====
    function inicializarPraia() {
        // Embaralha o banco de dados e pega exatamente 15 itens aleatórios
        const lixosSorteados = [...listaResiduos].sort(() => 0.5 - Math.random()).slice(0, metaLixos);

        lixosSorteados.forEach((lixo, index) => {
            const elementoLixo = document.createElement("div");
            elementoLixo.classList.add("lixo-item");
            elementoLixo.textContent = lixo.emoji;
            elementoLixo.title = lixo.nome;
            
            // Armazena os dados do tipo e nome diretamente no elemento HTML
            elementoLixo.dataset.tipo = lixo.tipo;
            elementoLixo.dataset.nome = lixo.nome;
            elementoLixo.dataset.dica = lixo.dica;

            // Define posições aleatórias dentro da área da AREIA do cenário
            const xAleatorio = Math.random() * 85 + 5; // Evita encostar totalmente nas bordas laterais (5% a 90%)
            const yAleatorio = Math.random() * 18 + 2;  // Fica dentro da faixa de areia inferior (2% a 20%)

            elementoLixo.style.left = `${xAleatorio}%`;
            elementoLixo.style.bottom = `${yAleatorio}%`;

            // Adiciona evento de clique para selecionar o lixo
            elementoLixo.addEventListener("click", function(e) {
                e.stopPropagation(); // Evita bugs de clique duplo
                selecionarLixo(elementoLixo);
            });

            praia.appendChild(elementoLixo);
        });
    }

    // ===== SELECIONAR UM LIXO =====
    function selecionarLixo(elemento) {
        // Se já tinha outro selecionado, remove o efeito visual dele
        if (itemSelecionado) {
            itemSelecionado.classList.remove("selecionado");
        }

        itemSelecionado = elemento;
        itemSelecionado.classList.add("selecionado");
        
        mensagemAlerta.textContent = `Você pegou: ${itemSelecionado.dataset.nome}. Agora clique na lixeira correta abaixo!`;
        mensagemAlerta.style.color = "#fbd46d";
    }

    // ===== LÓGICA DAS LIXEIRAS =====
    lixeiras.forEach(lixeira => {
        lixeira.addEventListener("click", function() {
            // Se o jogador clicar na lixeira sem ter pego nenhum lixo antes
            if (!itemSelecionado) {
                mensagemAlerta.textContent = "❌ Primeiro clique em um resíduo na praia!";
                mensagemAlerta.style.color = "#ff7675";
                return;
            }

            const tipoLixeira = this.dataset.tipo;
            const tipoLixo = itemSelecionado.dataset.tipo;

            // Se o descarte estiver CORRETO
            if (tipoLixeira === tipoLixo) {
                pontos += 10;
                lixosRecolhidos++;

                // Atualiza dados na tela
                contadorPontos.textContent = pontos;
                indicadorMeta.textContent = `🎯 ${lixosRecolhidos}/${metaLixos}`;
                
                // Atualiza a barra de progresso
                const porcentagem = (lixosRecolhidos / metaLixos) * 100;
                barraProgresso.style.width = `${porcentagem}%`;

                mensagemAlerta.textContent = `✅ Boa! Descartou ${itemSelecionado.dataset.nome} corretamente! (+10 pontos)`;
                mensagemAlerta.style.color = "#2ecc71";

                // Remove o lixo do cenário
                itemSelecionado.remove();
                itemSelecionado = null;

                // Verifica se ganhou o jogo
                if (lixosRecolhidos === metaLixos) {
                    finalizarJogo();
                }

            } else {
                // Se o descarte estiver INCORRETO
                mensagemAlerta.textContent = `❌ Ops! Lixeira errada para ${itemSelecionado.dataset.nome}. Dica: ${itemSelecionado.dataset.dica}`;
                mensagemAlerta.style.color = "#ff7675";
                
                // Novo Ajuste: Soma 1 ao total de lixos processados para atualizar a barra/contador se necessário,
                // mas remove o item sem dar pontos.
                lixosRecolhidos++;
                indicadorMeta.textContent = `🎯 ${lixosRecolhidos}/${metaLixos}`;
                const porcentagem = (lixosRecolhidos / metaLixos) * 100;
                barraProgresso.style.width = `${porcentagem}%`;

                // Remove o lixo do cenário definitivamente (não pontua nessa rodada)
                itemSelecionado.remove();
                itemSelecionado = null;

                // Verifica se mesmo com erros o jogo acabou (chegou a 15 processados)
                if (lixosRecolhidos === metaLixos) {
                    finalizarJogo();
                }
            }
        });
    });

    // ===== FIM DE JOGO =====
    function finalizarJogo() {
        pontosFinais.textContent = pontos;
        telaVitoria.classList.add("mostrar");
        mensagemAlerta.textContent = "🏆 Fim de jogo! A praia de Garopaba agradece a sua ajuda!";
        mensagemAlerta.style.color = "#f1c40f";
    }
});
