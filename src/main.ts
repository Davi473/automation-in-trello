import "dotenv/config";
import axios from "axios";
import inquirer from "inquirer";
import { getCards } from "./Card/GetCard";
import { getList } from "./List/GetList";

const API_KEY = process.env.API_KEY
const TOKEN = process.env.TOKEN




export async function axiosGet(url: any) {
    try {
        const response = await axios.get(
            url,
            {
                params: {
                    key: API_KEY,
                    token: TOKEN,
                },
            }
        );
        return response.data;
    } catch (e: any) {
        console.error('Erro ao buscar:', e.message);
    }
}

export async function options(type: any, name: any, message: any, choices: any) {
    const { opcao } = await inquirer.prompt([
        {type, name, message, choices}
    ]);
    return opcao;
}
const firstRequest = async () => {
  const dueComplete = [ "Sim", "Não", "Sair" ];
  try {
    const user = await axiosGet(
      `https://api.trello.com/1/members/me`
    );
    const boards = await axiosGet(
      `https://api.trello.com/1/members/${user.id}/boards`,
    );
    const boardsList: Map<string, string> = new Map();
    const boardArray = boards.reduce((output: any, value: any)  => {
        output.push(value.name);
        boardsList.set(value.name, value.id);
        return output;
    }, []);
    console.clear();
    const opcao = await options("list", "opcao", "Opção:", boardArray);
    console.clear();
    const lists = await axiosGet(
      `https://api.trello.com/1/boards/${boardsList.get(opcao)}/lists`,
    );
    const listsList: Map<string, string> = new Map();
    const listArray = lists.reduce((output: any, value: any)  => {
        output.push(value.name);
        listsList.set(value.name, value.id);
        return output;
    }, []);
    
    const list = await getList(listArray, listsList)
    const value: any = await getCards(list.cardsArray, list.cardsList);
    const dueCompleteValue = await options("list", "opcao", `Deve estar completo? Opcão Atual ${value.badges.dueComplete} `, dueComplete);
    if (dueCompleteValue === "Sair") return;
    const sair = dueCompleteValue === "Sim" ? true : false;
    if (value.badges.dueComplete && sair) return
    // console.log(dueCompleteValue)
    const response = await axios.put(
      `https://api.trello.com/1/cards/${value.id}`,
      {
        dueComplete: sair,
      },
      {
        params: {
          key: API_KEY,
          token: TOKEN,
        },
      }
    );
    console.log("valor", response.data.dueComplete);
  } catch (error) {
    console.error('Erro ao buscar cartões:', error);
  }
};

firstRequest();
