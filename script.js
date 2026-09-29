const contato = [];

const app = document.querySelector("#app");
const botoesMenu = document.querySelectorAll("nav button");

function marcarMenuAtivo(rota) {
  botoesMenu.forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.rota === rota);
  });
}

function irPara(rota) {
  marcarMenuAtivo(rota);

  if (rota === "inicio") mostrarInicio();
  if (rota === "cadastro") mostrarCadastro();
  if (rota === "lista") mostrarLista();
  if (rota === "sobre") mostrarSobre();
}

function mostrarInicio() {
  app.innerHTML = `
    <h1>LF Agenda de Contatos</h1>
    <p>
      A LF Agenda de Contatos é um sistema feito para facilitar a sua organização de contatos.
    </p>

    <div class="contador">
      Contatos cadastrados nesta sessão: <strong>${contato.length}</strong>
    </div>

    <div class="acoes">
      <button class="botao" id="btnCadastrar">Cadastrar Contato</button>
      <button class="botao secundario" id="btnVerAlunos">Ver Contatos</button>
    </div>
  `;

  document.querySelector("#btnCadastrar")
    .addEventListener("click", () => irPara("cadastro"));

  document.querySelector("#btnVerAlunos")
    .addEventListener("click", () => irPara("lista"));
}

function mostrarCadastro() {
  app.innerHTML = `
    <h1>Cadastrar Contato</h1>

    <form id="formContato">
      <div class="campo">
        <label for="nome">Nome</label>
        <input id="nome" type="text" placeholder="Digite o nome" required />
      </div>

      <div class="campo">
        <label for="telefone">Telefone</label>
        <input id="telefone" type="text" placeholder="Digite o telefone" required />
      </div>

      <div class="campo">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Digite o email" required />
      </div>

      <button class="botao" type="submit">Salvar Contato</button>
      <div id="mensagem"></div>
    </form>
  `;

  document.querySelector("#formContato").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const telefone = document.querySelector("#telefone").value.trim();
    const email = document.querySelector("#email").value.trim();

    contato.push({
      nome,
      telefone,
      email
    });

    document.querySelector("#mensagem").innerHTML =
      `<div class="mensagem">Contato cadastrado com sucesso.</div>`;

    evento.target.reset();
  });
}

function mostrarLista() {
  app.innerHTML = `
    <h1>Lista de Contatos</h1>
    <p>Esta tabela é criada dinamicamente por Luís para você visualizar seus contatos adicionados até agora.</p>
    <div id="conteudoLista"></div>
  `;

  renderizarTabela();
}

function renderizarTabela() {
  const conteudo = document.querySelector("#conteudoLista");

  if (contato.length === 0) {
    conteudo.innerHTML = `
      <div class="vazio">
        Nenhum contato cadastrado ainda.
      </div>
    `;
    return;
  }

  let linhas = "";

  contato.forEach((c, indice) => {
    linhas += `
      <tr>
        <td>${c.nome}</td>
        <td>${c.telefone}</td>
        <td>${c.email}</td>
        <td>
          <button class="excluir" data-indice="${indice}">Excluir</button>
        </td>
      </tr>
    `;
  });

  conteudo.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".excluir").forEach(botao => {
    botao.addEventListener("click", function() {
      const indice = Number(this.dataset.indice);
      contato.splice(indice, 1);
      renderizarTabela();
    });
  });
}

function mostrarSobre() {
  app.innerHTML = `
    <h1>Sobre o Sistema</h1>
    <p>
      Este é o Sistema de Agenda de Contatos de Luís Fabiano, este exemplo foi criado para demonstrar uma Single Page Application simples.
    </p>
    <p>
      Feito para  <strong>organizar</strong> sua lista de contatos.
    </p>
    <p>
      Volte sempre :)
    </p>
  `;
}

botoesMenu.forEach(botao => {
  botao.addEventListener("click", () => {
    irPara(botao.dataset.rota);
  });
});

mostrarInicio();