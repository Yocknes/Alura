import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";
// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export  async function getTodosPosts() {
    // Seleciona o banco de dados "Imersão-instaler"
    const db = conexao.db("Imersão-instaler");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {
        const db = conexao.db("Imersão-instaler");
        const colecao = db.collection("posts");
        return colecao.insertOne(novoPost);    
};

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Imersão-instaler");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id:new ObjectId(objID)}, {$set:novoPost});    
};
