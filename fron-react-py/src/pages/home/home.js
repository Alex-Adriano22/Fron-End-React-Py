import React, { useState } from "react";
import ResponsiveAppBar from "../../componets/topbarentrar/topbarentrar";
import style from "../home/home.module.css";

export function Home() {
  // Estado para armazenar transações
  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: "Salário", tipo: "Receita", valor: 5000 },
    { id: 2, descricao: "Aluguel", tipo: "Despesa", valor: -1500 },
    { id: 3, descricao: "Freelance", tipo: "Receita", valor: 1200 },
    { id: 4, descricao: "Supermercado", tipo: "Despesa", valor: -400 },
    { id: 5, descricao: "Internet", tipo: "Despesa", valor: -150 },
  ]);

  // Estados do formulário
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("Receita");
  const [valor, setValor] = useState("");

  // Função para adicionar nova transação
  const adicionarTransacao = (e) => {
    e.preventDefault();
    if (!descricao || !valor) return alert("Preencha todos os campos!");

    const novaTransacao = {
      id: transacoes.length + 1,
      descricao,
      tipo,
      valor: tipo === "Receita" ? parseFloat(valor) : -parseFloat(valor),
    };

    setTransacoes([...transacoes, novaTransacao]);
    setDescricao("");
    setValor("");
  };

  return (
    <ResponsiveAppBar>
      <div className={style.container}>
        <h2 className={style.title}>Gerenciamento Financeiro</h2>

        {/* Formulário para adicionar transações */}
        <form className={style.form} onSubmit={adicionarTransacao}>
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={style.input}
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={style.select}>
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </select>
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className={style.input}
          />
          <button type="submit" className={style.button}>Adicionar</button>
        </form>

        {/* Tabela de Transações */}
        <table className={style.tabela}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao) => (
              <tr key={transacao.id} className={transacao.tipo === "Receita" ? style.receita : style.despesa}>
                <td>{transacao.descricao}</td>
                <td>{transacao.tipo}</td>
                <td>R$ {transacao.valor.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResponsiveAppBar>
  );
}
