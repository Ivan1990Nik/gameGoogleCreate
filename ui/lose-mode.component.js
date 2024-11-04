import { liba } from "../shared/liba.js";
import { playAgain } from "../state/data.js"

export function LoseMode() {
    const element = document.createElement('div')

    LoseMode.render(element)
        
        return {element, cleanup: () => {}};

    }

    LoseMode.render = (element) => {
        element.append('GOOGLE WIN')
    
        const playAgainButtonElement = liba.create('button', ["style__button-selector"])
        playAgainButtonElement.append('PLAY AGAIN 🚀')
        playAgainButtonElement.addEventListener("click", () =>{
            playAgain()
        })
    
        element.append(playAgainButtonElement)
    }


