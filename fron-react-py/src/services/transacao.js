import { HTTPClient } from "./client";  

const TransaçoesApi = {

    async  listarTransacoes() {
        try {
         
            const response = await HTTPClient.get("/listar_transacao");
          
            return response.data;
        } catch (error) {
            console.error("Erro ao listar transações:", error);
            throw error;
        }
    },

    // Criar transação
    async criarTransacao(usuario_id, dados) {
        try {
            const response = await HTTPClient.post(`/CriarTransacao/${usuario_id}`, dados);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar transação:", error);
            throw error;
        }
    },

    // Atualizar transação
    async atualizarTransacao(id, dados) {
        try {
            const response = await HTTPClient.put(`/atualizar_transacao/${id}`, dados);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar transação:", error);
            throw error;
        }
    },

    // Deletar transação
    async deletarTransacao(id) {
        try {
            const response = await HTTPClient.delete(`/deletar_transacao/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar transação:", error);
            throw error;
        }
    },

    // Reativar transação
    async reativarTransacao(id) {
        try {
            const response = await HTTPClient.put(`/reativar-transacao/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao reativar transação:", error);
            throw error;
        }
    },
};

export default TransaçoesApi; 