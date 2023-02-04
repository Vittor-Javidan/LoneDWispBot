import { CS_Catalog_TheWoods_Enemies, CS_EntityData } from "../../../Globals/moduleTypes.js"
import { get_BANDIDO } from "./enemies/BANDIDO.js"
import { get_ESQUELETO } from "./enemies/ESQUELETO.js"
import { get_JAVALI } from "./enemies/JAVALI.js"
import { get_LOBO } from "./enemies/LOBO.js"

export default function get_THE_WOODS_ENEMIES_DATA(): Record<CS_Catalog_TheWoods_Enemies, CS_EntityData> {
    return {
        "Javali": get_JAVALI(),
        "Bandido": get_BANDIDO(),
        "Lobo": get_LOBO(),
        "Esqueleto": get_ESQUELETO()
    }
}
