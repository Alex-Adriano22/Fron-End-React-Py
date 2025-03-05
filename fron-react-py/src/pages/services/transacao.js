import axios from "axios";

// Configuração da instância do axios
const api = axios.create({
    baseURL: "http://localhost:8000", // Substitua pelo endereço do seu backend
    headers: {
        "Content-Type": "application/json",
    },
});

// Funções para interagir com a API de transações
const TransacaoApi = {
    // Listar todas as transações
    listarTransacoes: async () => {
        try {
            const response = await api.get("/listar_transacao");
            return response.data;
        } catch (error) {
            console.error("Erro ao listar transações:", error);
            throw error;
        }
    },

    // Criar uma nova transação
    criarTransacao: async (dados) => {
        try {
            const response = await api.post("/", dados);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar transação:", error);
            throw error;
        }
    },

    // Atualizar uma transação existente
    atualizarTransacao: async (id, dados) => {
        try {
            const response = await api.put(`/atualizar_transacao/${id}`, dados);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar transação:", error);
            throw error;
        }
    },

    // Deletar uma transação
    deletarTransacao: async (id) => {
        try {
            const response = await api.delete(`/deletar_transacao/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar transação:", error);
            throw error;
        }
    },

    // Reativar uma transação
    reativarTransacao: async (id) => {
        try {
            const response = await api.put(`/reativar-transacao/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao reativar transação:", error);
            throw error;
        }
    },
};

export default TransacaoApi;