//-------------------------- Questão 1 --------------------------
function mostrarSOMA() {
    let indice = 13;
    let soma = 0;

    for (let K = 1; K <= indice; K++) {
        soma += K;
    }

    document.getElementById(
        "resultado-soma"
    ).innerText = `A soma de todos os números de 1 a ${indice} é ${soma}`;
}

document.addEventListener("DOMContentLoaded", mostrarSOMA);

//-------------------------- Questão 2 --------------------------

function verifyFibonacci() {
    const number = parseInt(document.getElementById("input-fibonacci").value);
    const resultado = document.getElementById("resultado-fibonacci");

    if (isNaN(number)) {
        resultado.textContent = `Por favor, insira um número válido.`;
        resultado.style.color = "#e70901";
        return;
    }

    let a = 0;
    let b = 1;

    while (b < number) {
        let temp = b;
        b = a + b;
        a = temp;
    }

    if (number === 0 || b === number) {
        resultado.textContent = `${number} pertence à sequência de Fibonacci.`;
        resultado.style.color = "#329369";
    } else {
        resultado.textContent = `${number} não pertence à sequência de Fibonacci.`;
        resultado.style.color = "#e70901";
    }
}

//-------------------------- Quesao 3 --------------------------

async function Faturamento() {
  const resposta = await fetch("dados.json");
  const dados = await resposta.json();

  const diasValidos = dados.filter((d) => d.valor > 0);
  const valores = diasValidos.map((d) => d.valor);

  const menor = Math.min(...valores);
  const maior = Math.max(...valores);
  const media = valores.reduce((acc, v) => acc + v, 0) / valores.length;
  const diasAcimaMedia = valores.filter((v) => v > media).length;

  const resultado = document.getElementById("resultado-faturamento");
  resultado.innerHTML = `
    <p><strong>Menor faturamento:</strong> R$ ${menor.toFixed(2)}</p>
    <p><strong>Maior faturamento:</strong> R$ ${maior.toFixed(2)}</p>
    <p><strong>Dias com faturamento acima da média mensal (R$ ${media.toFixed(
      2
    )}):</strong> ${diasAcimaMedia} dias</p>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const resposta = await fetch("dados.json");
  const dados = await resposta.json();

  const corpoTabela = document.getElementById("corpo-tabela");
  corpoTabela.innerHTML = dados
    .map(
      (d) => `
      <tr>
        <td style="text-align: center;">${d.dia}</td>
        <td>R$ ${d.valor.toFixed(2)}</td>
      </tr>
    `
    )
    .join("");
});

//-------------------------- Questão 4 --------------------------

function FaturamentoPerEstados() {
    const estados = {
        SP: 67836.43,
        RJ: 36678.66,
        MG: 29229.88,
        ES: 27165.48,
        Outros: 19849.53,
    };

    const total = Object.values(estados).reduce((acc, val) => acc + val, 0);

    const labels = Object.keys(estados);
    const valores = Object.values(estados);
    const percentuais = valores.map((v) => ((v / total) * 100).toFixed(2));

    const resultado = document.getElementById("resultado-estados");
    resultado.innerHTML = labels
        .map(
            (estado, i) => `
    <p><strong>${estado}</strong>: R$ ${valores[i].toFixed(2)} 
    (${percentuais[i]}%)</p>
  `
        )
        .join("");

    const ctx = document.getElementById("grafico-estados").getContext("2d");
    if (window.graficoPizza) window.graficoPizza.destroy();

    window.graficoPizza = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Faturamento por Estado",
                    data: valores,
                    backgroundColor: [
                        "#745ef6",
                        "#e70901",
                        "#696969",
                        "#f2a900",
                        "#329369",
                    ],
                    borderColor: "#ffffff",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                },
            },
        },
    });
}

window.addEventListener("DOMContentLoaded", () => {
    FaturamentoPerEstados();
});

//-------------------------- Questão 5 --------------------------

function reverseString(string) {
    let word = "";

    for (let i = string.length - 1; i >= 0; i--) {
        word += string[i];
    }

    return word;
}

function executarInversao() {
    const input = document.getElementById("input-string").value;

    if (!input.trim()) {
        document.getElementById("resultado-inversao").innerText =
            "Por favor, digite uma string válida.";
        return;
    }

    const resultado = reverseString(input);
    document.getElementById(
        "resultado-inversao"
    ).innerText = `Resultado invertido: ${resultado}`;
}
