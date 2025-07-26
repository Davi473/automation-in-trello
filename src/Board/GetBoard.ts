import { options } from "../main";

export async function getCards(cardsArray, cardsList) {
    const opcao3 = await options("list", "opcao", "Opção:", cardsArray);
    console.clear();
    const value = cardsList.get(opcao3);
    console.log(value);
}