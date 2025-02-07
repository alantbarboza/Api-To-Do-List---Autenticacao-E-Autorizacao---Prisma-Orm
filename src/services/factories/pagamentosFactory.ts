/*
FACTORY PATTERN

O Factory Pattern ajuda a criar objetos de forma centralizada, sem expor diretamente a lógica de criação. 
A criação dos objetos fica a cargo de uma fábrica (Factory).
*/

/*
//exemplo:
//  main.ts
import { itemController } from './controller';  

itemController("book");  // Output: You picked a Book!
itemController("pen");   // Output: You picked a Pen!
itemController("chair"); // Output: Unknown item type

// controller.ts
import { ItemService } from './service'; 

export function itemController(type: string) {
  try {
    ItemService.makeItemSpeak(type);  // O serviço faz o item falar
  } catch (error) {
    console.error(error.message);
  }
}

// service.ts
import { createItem } from './serviceFactory'; 

export class ItemService {
  static makeItemSpeak(type: string) {
    const item = createItem(type);  
    item.speak();  // Faz o item falar
  }
}

// serviceFactory.ts (os objetos são criados e instanciados no serviceFactory)
interface Item {
  speak(): void;
}

export function createItem(type: string): Item {
  if (type === "book") {
    return new Book();
  } else if (type === "pen") {
    return new Pen();
  } else {
    throw new Error("Unknown item type");
  }
}

// Classes de cada tipo de item
class Book implements Item {
  speak() {
    console.log("You picked a Book!");
  }
}

class Pen implements Item {
  speak() {
    console.log("You picked a Pen!");
  }
}


*/