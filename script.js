document.addEventListener("DOMContentLoaded", function() {
    console.log("EcoGaropaba - Banco de Resíduos Expandido! 🌊🐾");

    // 1. BANCO DE DADOS DOS RESÍDUOS (EXPANDIDO PARA 15 ITENS!)
    const listaResiduos = [
        // --- ORGÂNICOS ---
        { emoji: "🍏", nome: "Resto de Maçã", tipo: "organico", dica: "Restos de frutas são orgânicos e se decompõem rápido, mas se jogados na areia atraem insetos e poluem a praia." },
        { emoji: "🍌", nome: "Casca de Banana", tipo: "organico", dica: "Matéria orgânica deve ir para a compostagem ou lixeira de orgânicos, nunca deixada na praia!" },
        { emoji: "🍕", nome: "Pedaço de Pizza", tipo: "organico", dica: "Restos de alimentos na praia alimentam espécies invasoras e alteram o ecossistema local." },
        { emoji: "🍤", nome: "Casca de Camarão", tipo: "organico", dica: "Restos de frutos do mar são orgânicos. Enterrar na areia causa mau cheiro e atrai urubus." },
        { emoji: "🧉", nome: "Erva-Mate do Chima", tipo: "organico", dica: "A erva do chimarrão é matéria orgânica vegetal! Pode ir para a lixeira orgânica ou composteira." },

        // --- RECICLÁVEIS ---
        { emoji: "🍾", nome: "Garrafa de Vidro", tipo: "reciclavel", dica: "O vidro é 100% reciclável, mas na praia pode quebrar e machucar gravemente banhistas e surfistas." },
        { emoji: "🥤", nome: "Copo Plástico", tipo: "reciclavel", dica: "Plásticos levam mais de 450 anos para se decompor e viram microplásticos que matam a fauna marinha." },
        { emoji: "🥫", nome: "Lata de Alumínio", tipo: "reciclavel", dica: "Latas de bebidas são altamente recicláveis! Destine corretamente para apoiar a reciclagem local." },
        { emoji: "🥤", nome: "Canudo Plástico", tipo: "reciclavel", dica: "Canudinhos plásticos são leves e voam fácil para o mar, ameaçando tartarugas marinhas." },
        { emoji: "⚙️", nome: "Tampinha de Garrafa", tipo: "reciclavel", dica: "Tampinhas de plástico ou metal são recicláveis. Animais marinhos e aves frequentemente as engolem por engano." },

        // --- REJEITOS ---
        { emoji: "🚬", nome: "Bituca de Cigarro", tipo: "rejeito", dica: "Bitucas contêm plástico no filtro e substâncias tóxicas. Uma única bituca polui até 50 litros de água!" },
        { emoji: "🧻", nome: "Lenço Descartável", tipo: "rejeito", dica: "Papéis higiênicos, lenços umedecidos e fraldas usadas não podem ser reciclados. São Rejeito." },
        { emoji: "😷", nome: "Máscara/Curativo", tipo: "rejeito", dica: "Materiais de higiene pessoal ou resíduos contaminados vão direto para a lixeira de rejeitos." },
        { emoji: "🍦", nome: "Embalagem de Sorvete", tipo: "rejeito", dica: "Embalagens plásticas metalizadas (como as de picolé ou salgadinho) são difíceis de reciclar e vão para o Rejeito." },
        { emoji: "🪵", nome: "Palito de Picolé", tipo: "rejeito", dica: "Embora seja madeira, palitos sujos de sorvete industrializado geralmente vão para o rejeito na coleta comum da praia." }
    ];

    // 2. VARIÁVEIS DE CONTROLE DO JOGO
    let pontos = 0;
    let lixoSelecionado = null;

    // Elementos do DOM
    const praia = document.getElementById("praia");
    const contadorPontos = document.getElementById("contador-pontos");
    const mensagemAlerta = document.getElementById("mensagem-alerta");
    const lixeiras = document.querySelectorAll(".lixeira");

    // 3. FUNÇÃO PARA GERAR UM LIXO ALEATÓRIO NA TELA
    function gerarLixoNaPraia() {
        const instrucao = document.querySelector(".instrucao-inicial");
        if (instrucao) instrucao.remove();

        // Escolhe um item aleatório da nossa nova lista de 15 itens
        const residuoAleatorio = listaResiduos[Math.floor(Math.random() * listaResiduos.length)];

        // Cria o elemento HTML do lixo
        const lixoElemento = document.createElement("div");
        lixoElemento.classList.add("lixo-item");
        lixoElemento.innerHTML = residuoAleatorio.emoji;
        lixoElemento.setAttribute("data-tipo", residuoAleatorio.tipo);
        lixoElemento.setAttribute("data-nome", residuoAleatorio.nome);
        lixoElemento.setAttribute("data-dica", residuoAleatorio.dica);

        // Define uma posição aleatória restringindo para a área da areia
        const xAleatorio = Math.floor(Math.random() * (praia.clientWidth - 60)) + 20;
        const yAleatorio = Math.floor(Math.random() * 160) + 180; 

        lixoElemento.style.left = `${xAleatorio}px`;
        lixoElemento.style.top = `${yAleatorio}px`;

        // Evento de clique para SELECIONAR o lixo
        lixoElemento.addEventListener("click", function(e) {
            e.stopPropagation(); 
            
            if (lixoSelecionado) {
                lixoSelecionado.classList.remove("selecionado");
            }

            lixoSelecionado = lixoElemento;
            lixoSelecionado.classList.add("selecionado");
            
            mensagemAlerta.innerText = `Selecionado: ${residuoAleatorio.nome}. Clique na lixeira correspondente!`;
            mensagemAlerta.style.color = "#fbd46d";
        });

        praia.appendChild(lixoElemento);
    }

    // 4. LÓGICA DO CLIQUE NAS LIXEIRAS (DESCARTE)
    lixeiras.forEach(lixeira => {
        lixeira.addEventListener("click", function() {
            if (!lixoSelecionado) {
                mensagemAlerta.innerText = "❌ Escolha um lixo na praia primeiro!";
                mensagemAlerta.style.color = "#ff7675";
                return;
            }

            const tipoLixeira = lixeira.getAttribute("data-tipo");
            const tipoLixo = lixoSelecionado.getAttribute("data-tipo");
            const nomeLixo = lixoSelecionado.getAttribute("data-nome");
            const dicaLixo = lixoSelecionado.getAttribute("data-dica");

            // SE ACERTOU O DESCARTE:
            if (tipoLixeira === tipoLixo) {
                pontos += 10;
                contadorPontos.innerText = pontos;
                mensagemAlerta.innerText = `✅ Boa! O ${nomeLixo} foi para o lugar certo! (+10 pontos)`;
                mensagemAlerta.style.color = "#55efc4";
                
                lixoSelecionado.remove();
                lixoSelecionado = null;

                // Repõe com um novo lixo
                setTimeout(gerarLixoNaPraia, 800);

            // SE ERROU O DESCARTE:
            } else {
                mensagemAlerta.innerText = `❌ Incorreto! Dica: ${dicaLixo}`;
                mensagemAlerta.style.color = "#ff7675";
                
                lixoSelecionado.classList.remove("selecionado");
                lixoSelecionado = null;
            }
        });
    });

    // Inicializa o jogo gerando 9 lixos aleatórios na praia
    for (let i = 0; i < 9; i++) {
        setTimeout(gerarLixoNaPraia, i * 150);
    }
});