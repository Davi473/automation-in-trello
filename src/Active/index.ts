import { options } from "../main";

export async function Active(cardsArray: any, cardsList: any) {
    const active = ["Concluido", "Arquivar"];

    switch (active) 
    {
        
    }
    const opcao3 = await options("list", "opcao", "Opção:", cardsArray);
    console.clear();
    const value = cardsList.get(opcao3);
    return value;
}