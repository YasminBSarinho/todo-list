document.addEventListener("DOMContentLoaded", () => {
    const campoTarefa = document.getElementById("campoTarefa");
    const tarefasLista = document.querySelector(".tarefas");
    const botaoAdicionar = document.querySelector("button");
    const botaoCarregarMais = document.createElement("button");
    const container = document.getElementById('container');
    let tarefasCarregadas = 0;
    const tarefasPorClique = 5;
  
    botaoCarregarMais.textContent = "Carregar Mais Tarefas";
    botaoCarregarMais.classList.add("botao-carregar-mais");
    container.appendChild(botaoCarregarMais);
  
    botaoAdicionar.addEventListener("click", () => {
      if (campoTarefa.value.trim() !== "") {
        const tarefaTexto = campoTarefa.value.trim();
        criarItemTarefa(tarefaTexto);
        campoTarefa.value = ""; // limpa o campo
      }
    });
  
    // cria um item
    function criarItemTarefa(tarefaTexto) {
      const li = document.createElement("li");
      li.textContent = tarefaTexto;
  
      // concluir
      const botaoConcluir = document.createElement("button");
      botaoConcluir.textContent = "Concluir";
      botaoConcluir.classList.add("botao-concluir");
      botaoConcluir.addEventListener("click", () => {
        li.classList.toggle("concluido");
      });
  
      // excluir
      const botaoExcluir = document.createElement("button");
      botaoExcluir.textContent = "Excluir";
      botaoExcluir.classList.add("botao-excluir");
      botaoExcluir.addEventListener("click", () => {
        li.remove();
      });
  
      // add botoes
      li.appendChild(botaoConcluir);
      li.appendChild(botaoExcluir);
      tarefasLista.appendChild(li);
    }
  
    // consome a api
    async function carregarTarefas() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
  
        const tarefas = await response.json();
        const novasTarefas = tarefas.slice(tarefasCarregadas, tarefasCarregadas + tarefasPorClique);
        tarefasCarregadas += novasTarefas.length;
  
        novasTarefas.forEach((tarefa) => criarItemTarefa(tarefa.title));
  
        // Ocultar botão se não houver mais tarefas
        if (tarefasCarregadas >= tarefas.length) {
          botaoCarregarMais.style.display = "none";
        }
      } catch (error) {
        console.error("Erro ao carregar as tarefas:", error);
      }
    }
  
    botaoCarregarMais.addEventListener("click", carregarTarefas);
  
    carregarTarefas();
  });
  