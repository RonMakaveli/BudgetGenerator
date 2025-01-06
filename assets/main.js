// Função para formatar valores monetários
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Adiciona um novo item ao formulário
function adicionarItem() {
    const itensDiv = document.getElementById('itens');
    const itemHTML = `
        <div class="item">
            <label>Descrição:</label>
            <input type="text" class="descricao"><br>
            <label>Quantidade:</label>
            <input type="number" class="quantidade"><br>
            <label>Preço Unitário (R$):</label>
            <input type="text" class="preco_unit"><br><br>
        </div>
    `;
    itensDiv.insertAdjacentHTML('beforeend', itemHTML);
}

// Gera o PDF usando jsPDF
async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Capturar os valores do formulário
    const empresa = document.getElementById('empresa').value;
    const contato = document.getElementById('contato').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const descontoPorcentagem = parseFloat(document.getElementById('desconto').value.replace(',', '.') || 0);

    // Adicionar cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("FLOW CONFECÇÕES", 10, 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Empresa: ${empresa}`, 10, 20);
    doc.text(`Contato: ${contato}`, 10, 30);
    doc.text(`Telefone: ${telefone}`, 10, 40);
    doc.text(`E-mail: ${email}`, 10, 50);

    // Adicionar itens
    const itens = document.querySelectorAll('.item');
    let y = 70;
    doc.setFont("helvetica", "bold");
    doc.text("Descrição do item", 10, y);
    doc.text("Quantidade", 90, y);
    doc.text("Preço Unit.", 130, y);
    doc.text("Total", 170, y);
    y += 10;

let subTotal = 0;
doc.setFont("helvetica", "normal");
itens.forEach((item) => {
    const descricao = item.querySelector('.descricao').value;
    const quantidade = parseInt(item.querySelector('.quantidade').value || 0);
    const precoUnit = parseFloat(item.querySelector('.preco_unit').value.replace(',', '.') || 0);
    const total = quantidade * precoUnit;

    subTotal += total;

    doc.text(descricao, 10, y);
    doc.text(quantidade.toString(), 90, y);
    doc.text(formatarMoeda(precoUnit), 130, y);
    doc.text(formatarMoeda(total), 170, y);
    y += 10;
});

    // Calcular desconto em reais
    const desconto = (subTotal * descontoPorcentagem) / 100;

    // Calcular o total geral
    const totalGeral = subTotal - desconto;

    // Adicionar resumo
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Sub Total: ${formatarMoeda(subTotal)}`, 10, y);
    y += 10;
    doc.text(`Desconto (${descontoPorcentagem}%): ${formatarMoeda(desconto)}`, 10, y);
    y += 10;
    doc.text(`Total Geral: ${formatarMoeda(totalGeral)}`, 10, y);

    // Adicionar termos
    y += 20;
    doc.setFontSize(10);
    doc.text("Termos e Condições:", 10, y);
    y += 10;
    doc.text("Condição de pagamento: 60% de sinal, restante após a entrega.", 10, y);
    y += 10;
    doc.text("Prazo de entrega: 20 dias úteis.", 10, y);
    y += 10;
    doc.text("Validade da proposta: 15 dias.", 10, y);

    // Disponibilizar PDF para download
    doc.save('orcamento.pdf');
}