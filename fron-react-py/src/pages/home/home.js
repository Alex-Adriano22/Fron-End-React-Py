import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../../componets/topbarentrar/topbarentrar";
import style from "../home/home.module.css";
import listarTransacoesAPI from "../../services/transacao";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";

export function Home() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("Receita");
  const [valor, setValor] = useState("");
  const [transacaoEditando, setTransacaoEditando] = useState(null); // Transação para edição
  const [showModal, setShowModal] = useState(false); // Modal de edição
  const [showModalDeletar, setShowModalDeletar] = useState(false); // Modal de confirmação de deletar
  const [transacaoParaDeletar, setTransacaoParaDeletar] = useState(null); // Transação para deletar

  const carregarTransacoes = async () => {
    try {
      const data = await listarTransacoesAPI.listarTransacoes();
      setTransacoes(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  // Função para adicionar uma transação
  const adicionarTransacao = async (e) => {
    e.preventDefault();
    if (!descricao || !valor) return alert("Preencha todos os campos!");

    try {
      await listarTransacoesAPI.criarTransacao(1, { descricao, tipo, valor });
      await carregarTransacoes();
      setDescricao("");
      setValor("");
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  };

  // Função para editar uma transação
  const editarTransacao = (transacao) => {
    setTransacaoEditando(transacao);
    setDescricao(transacao.descricao);
    setTipo(transacao.tipo);
    setValor(Math.abs(transacao.valor).toString());
    setShowModal(true); // Abrir modal de edição
  };

  const atualizarTransacao = async (e) => {
    e.preventDefault();
    if (!descricao || !valor) return alert("Preencha todos os campos!");

    try {
      await listarTransacoesAPI.atualizarTransacao(transacaoEditando.id, {
        descricao,
        tipo: tipo.toLowerCase(),
        valor: tipo === "Receita" ? parseFloat(valor) : -parseFloat(valor),
      });
      await carregarTransacoes();
      setDescricao("");
      setTipo("Receita");
      setValor("");
      setTransacaoEditando(null);
      setShowModal(false); // Fechar o modal após a atualização
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
    }
  };

  const deletarTransacao = (id) => {
    setTransacaoParaDeletar(id);
    setShowModalDeletar(true); // Abrir modal de confirmação de exclusão
  };

  const confirmarDeletarTransacao = async () => {
    if (!transacaoParaDeletar) return;
    try {
      await listarTransacoesAPI.deletarTransacao(transacaoParaDeletar);
      await carregarTransacoes();
      setShowModalDeletar(false); // Fechar o modal após a exclusão
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  return (
    <ResponsiveAppBar>
      <div className={style.container}>
        <div className={style.lista}>
          <h2 className={style.title}>Lista de Transações</h2>
          <table className={style.tabela}>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Valor (R$)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao) => (
                <tr key={transacao.id}>
                  <td>{transacao.descricao}</td>
                  <td>{transacao.tipo}</td>
                  <td>R$ {transacao.valor.toFixed(2)}</td>
                  <td className={style.acoes}>
                    <button className={style.botaoIcone} onClick={() => editarTransacao(transacao)}>
                      <MdEdit className={style.iconeEditar} />
                    </button>
                    <button className={style.botaoIcone} onClick={() => deletarTransacao(transacao.id)}>
                      <MdDelete className={style.iconeDeletar} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulário para Adicionar Transação */}
        {!showModal && (
          <div className={style.Adcionar_corpo}>
            <h2 className={style.title}>Adicionar Transação</h2>
            <form className={style.form} onSubmit={adicionarTransacao}>
              <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className={style.input}
              />
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className={style.select}
              >
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
              <button type="submit" className={style.button}>
                Adicionar
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Modal de Edição de Transação */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Transação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={style.form} onSubmit={atualizarTransacao}>
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className={style.input}
            />
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={style.select}
            >
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
            <button type="submit" className={style.button}>
              Atualizar
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmação de Deletar Transação */}
      <Modal show={showModalDeletar} onHide={() => setShowModalDeletar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Transação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir esta transação?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDeletar(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarDeletarTransacao}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </ResponsiveAppBar>
  );
}
