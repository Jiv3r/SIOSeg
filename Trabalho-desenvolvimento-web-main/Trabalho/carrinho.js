// Função para carregar carrinho do localStorage ou criar vazio
function carregarCarrinho() {
  const carrinho = localStorage.getItem('carrinho');
  return carrinho ? JSON.parse(carrinho) : [];
}

// Salvar carrinho no localStorage
function salvarCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Atualizar contador no botão
function atualizarContador() {
  const carrinho = carregarCarrinho();
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  document.getElementById('contador-carrinho').textContent = totalItens;
}

// Adicionar produto no carrinho
function adicionarAoCarrinho(produto) {
  const carrinho = carregarCarrinho();
  const index = carrinho.findIndex(item => item.id === produto.id);

  if(index > -1) {
    carrinho[index].quantidade++;
  } else {
    carrinho.push({...produto, quantidade: 1});
  }

  salvarCarrinho(carrinho);
  atualizarContador();
  alert(`${produto.nome} adicionado ao carrinho!`);
}

// Evento dos botões "Adicionar"
document.querySelectorAll('.adicionar-carrinho').forEach(botao => {
  botao.addEventListener('click', () => {
    const produtoEl = botao.closest('.produto');
    const produto = {
      id: produtoEl.getAttribute('data-id'),
      nome: produtoEl.getAttribute('data-nome'),
      preco: parseFloat(produtoEl.getAttribute('data-preco'))
    };
    adicionarAoCarrinho(produto);
  });
});

// Inicializa contador ao carregar a página
atualizarContador();
