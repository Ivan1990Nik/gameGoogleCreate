import { liba } from "../shared/liba.js"
import { playgamecomponent } from "./game-mode/play.js"
import { stopgamecomponent } from "./game-mode/stop.js"


export function panelUser() {

    const element = liba.create("div", ["style__header-top"])

    panelUser.render(element)

    return {element}
}

panelUser.render = (element) => {

    const panelUsersStopInstance = stopgamecomponent()
    element.append(panelUsersStopInstance.element)
    const panelUserPlayInstance = playgamecomponent()
    element.append(panelUserPlayInstance.element)
}