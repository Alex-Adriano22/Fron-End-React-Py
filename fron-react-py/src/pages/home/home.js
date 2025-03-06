import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../../componets/topbarentrar/topbarentrar";
import style from "../home/home.module.css";
import listarTransacoesAPI from "../../services/transacao";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Home() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("Receita");
  const [valor, setValor] = useState("");

  const [showModal, setShowModal] = useState(false); // Modal de edição
  const [transacaoEditando, setTransacaoEditando] = useState(null); // Transação para edição
  console.log(transacaoEditando)
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

    // Validação para garantir que todos os campos sejam preenchidos
    if (!descricao || !valor) return alert("Preencha todos os campos!");

    try {
      // Criando a transação
      await listarTransacoesAPI.criarTransacao(1, { descricao, tipo, valor });

      // Recarregando a lista de transações após a criação
      await carregarTransacoes();

      // Limpando os campos após adicionar a transação
      setDescricao("");
      setValor("");
      setTipo("Receita");  // Ou o valor que deseja resetar
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  };

  // Função para abrir o modal de editar
  const abrirModalEditar = async (transacao) => {
    setTransacaoEditando(transacao);
    setDescricao(transacao.descricao);
    setTipo(transacao.tipo);
    setValor(Math.abs(transacao.valor).toString());
    setShowModal(true); // Abre o modal de edição
  };

  // Função para editar uma transação
  const atualizarTransacao = async (e) => {
    e.preventDefault();

    
    if (!descricao || !valor) return alert("Preencha todos os campos!");

  
    const transacaoAtualizada = {
 
      tipo, 
      valor: parseFloat(valor),
      descricao,
    
    };

    try {
      // Realiza a atualização da transação
      await listarTransacoesAPI.atualizarTransacao(transacaoEditando.TransacoesId, transacaoAtualizada);


      // Recarrega as transações após a atualização
      await carregarTransacoes();

      // Limpa os campos de entrada
      setDescricao("");
      setTipo("Receita");
      setValor("");
      setTransacaoEditando(null); // Reseta o estado de transação editada
      setShowModal(false); // Fecha o modal após a atualização
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
    }
  };

  const deletarTransacao = (id) => {
    setTransacaoParaDeletar(id);
    setShowModalDeletar(true); // Abre o modal de confirmação de exclusão
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

  // Função para fechar o modal
  const fecharModal = () => {
    setShowModal(false);
    setShowModalDeletar(false);
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
              {transacoes.map((transacao, index) => (
                <tr key={transacao.id || `transacao-${index}`}>
                  <td>{transacao.descricao}</td>
                  <td>{transacao.tipo}</td>
                  <td>R$ {transacao.valor.toFixed(2)}</td>
                  <td className={style.acoes}>
                    <Link className={style.botaoIcone} onClick={() => abrirModalEditar(transacao)}>
                      <MdEdit className={style.iconeEditar} />
                    </Link>
                    <Link className={style.botaoIcone} onClick={() => deletarTransacao(transacao.id)}>
                      <MdDelete className={style.iconeDeletar} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulário para Adicionar Transação (visível apenas quando não estiver editando) */}
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

        {/* Modal de Edição de Transação */}
        <Modal show={showModal} onHide={fecharModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Transação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={atualizarTransacao}>
              <Form.Group controlId="descricao" className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="tipo" className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="Receita">Receita</option>
                  <option value="Despesa">Despesa</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="valor" className="mb-3">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={fecharModal}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Atualizar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal de confirmação de exclusão */}
        <Modal show={showModalDeletar} onHide={fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Tem certeza que deseja deletar esta transação?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={fecharModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmarDeletarTransacao}>
              Deletar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </ResponsiveAppBar>
  );
}
