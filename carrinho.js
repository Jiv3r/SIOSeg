// ===============================
// Recupera carrinho do localStorage ou inicia vazio
// ===============================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ===============================
// Atualiza o número no ícone do carrinho no cabeçalho
// ===============================
function atualizarContadorCarrinho() {
    const contador = document.getElementById("cart-count");
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contador.textContent = totalItens;
}

// ===============================
// Adiciona um produto ao carrinho
// ===============================
function adicionarAoCarrinho(produto) {
    const existente = carrinho.find(item => item.id === produto.id);

    if (existente) {
        existente.quantidade += 1; // Já existe? Aumenta a quantidade
    } else {
        carrinho.push({ ...produto, quantidade: 1 }); // Se não, adiciona novo produto
    }

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Atualiza o contador no ícone do carrinho
    atualizarContadorCarrinho();
}

// ===============================
// "Escuta" cliques nos botões "Adicionar ao Carrinho"
// ===============================
document.querySelectorAll(".adicionar-carrinho").forEach(botao => {
    botao.addEventListener("click", () => {
        const li = botao.closest(".produto"); // Encontra o container do produto

        // Cria o objeto produto com base nos atributos de data do HTML
        const produto = {
            id: li.dataset.id,
            nome: li.dataset.nome,
            preco: parseFloat(li.dataset.preco),
        };

        adicionarAoCarrinho(produto);
    });
});

// ===============================
// Inicializa o contador do carrinho ao carregar a página
// ===============================
atualizarContadorCarrinho();
