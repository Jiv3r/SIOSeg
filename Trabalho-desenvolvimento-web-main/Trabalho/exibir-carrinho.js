// =========================
// exibir-carrinho.js
// =========================

// === Função para formatar valores em reais (R$) ===
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// === Renderiza o conteúdo do carrinho na tela ===
function renderizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const lista = document.getElementById("lista-carrinho");
    const totalGeral = document.getElementById("total-geral");

    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalGeral.textContent = "Total: R$ 0,00";
        return;
    }

    // Monta lista de produtos no HTML
    let html = "<ul>";
    let total = 0;

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        html += `
            <li>
                <strong>${item.nome}</strong><br>
                Quantidade: ${item.quantidade}<br>
                Preço unitário: ${formatarMoeda(item.preco)}<br>
                Subtotal: ${formatarMoeda(subtotal)}<br>
                <button class="remover-item" data-index="${index}">Remover</button>
                <hr>
            </li>
        `;
    });

    html += "</ul>";
    lista.innerHTML = html;
    totalGeral.textContent = `Total: ${formatarMoeda(total)}`;

    // === Botões de remoção de item ===
    document.querySelectorAll(".remover-item").forEach(botao => {
        botao.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            removerItem(index);
        });
    });
}

// === Remove um item do carrinho com base no índice ===
function removerItem(index) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); // Remove o item
    localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza o armazenamento
    renderizarCarrinho(); // Atualiza o DOM
}

// === Limpa todo o carrinho ===
function limparCarrinho() {
    localStorage.removeItem("carrinho");
    renderizarCarrinho();
}

// === Exibe o conteúdo do carrinho assim que a página carregar ===
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();

    // Botão de limpar carrinho
    document.getElementById("limpar-carrinho").addEventListener("click", limparCarrinho);
});

// === Finaliza a compra com um resumo em alerta ===
function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Se o carrinho estiver vazio, alerta e retorna
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    // Gera resumo da compra
    let mensagem = "Resumo da compra:\n\n";
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        mensagem += `${item.quantidade}x ${item.nome} - ${formatarMoeda(subtotal)}\n`;
        total += subtotal;
    });

    mensagem += `\nTotal geral: ${formatarMoeda(total)}\n\nObrigado pela sua compra! 🛒`;

    alert(mensagem); // Exibe resumo da compra

    // Limpa o carrinho após finalização
    localStorage.removeItem("carrinho");
    renderizarCarrinho();
}

// === Botão "Finalizar Compra" só é ativado se existir ===
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();

    document.getElementById("limpar-carrinho").addEventListener("click", limparCarrinho);

    const finalizarBtn = document.getElementById("finalizar-compra");
    if (finalizarBtn) {
        finalizarBtn.addEventListener("click", finalizarCompra);
    }
});
