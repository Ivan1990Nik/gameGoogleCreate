import { liba } from "../shared/liba.js"
import { stopgamecomponent } from "./game-mode/stop.js"


export function panelUser() {

    const element = liba.create("div", ["style__header-top"])

    panelUser.render(element)

    return {element}
}

panelUser.render = (element) => {

    const panelUsersStopInstance = stopgamecomponent()
    element.append(panelUsersStopInstance.element)

}