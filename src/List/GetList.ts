import { axiosGet, options } from "../main";

export async function getList(listArray, listsList): Promise<Output> {
    const opcao2 = await options("list", "opcao", "Opção:", listArray);
    const cards = await axiosGet(
      `https://api.trello.com/1/lists/${listsList.get(opcao2)}/cards`,
    );
    const cardsList: Map<string, any> = new Map();
    const cardsArray = cards.reduce((output: any, value: any)  => {
        output.push(value.name);
        cardsList.set(value.name, value);
        return output;
    }, []);
    return { cardsList, cardsArray }
}

type Output = {
    cardsList: any,
    cardsArray: any
}