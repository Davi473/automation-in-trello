import { options } from "../main";

export async function Complete(cardsArray: any, cardsList: any) {
    const opcao3 = await options("list", "opcao", "Opção:", cardsArray);
    console.clear();
    const value = cardsList.get(opcao3);
    return value;
}