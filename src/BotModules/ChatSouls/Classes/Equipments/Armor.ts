import { CS_Armor_Multipliers } from "../../Globals/moduleTypes.js"

export default class Armor {

    multipliers: CS_Armor_Multipliers = {
        
        vitality:       0,
        agility:        0,
        strenght:       0,
        
        fireDefense:    0,
        iceDefense:     0,
        thunderDefense: 0,
        poisonDefense:  0
    }

    detailsString(description: string): string {
        return `
        DESCRIÇÃO: ${description} 

        MULTIPLICADORES: 

        HP = ${this.multipliers.vitality}x Vitalidade, 
        Evasão = ${this.multipliers.agility}x Agilidade, 
        Defesa física = ${this.multipliers.strenght}x Força,

        Defesa a fogo = ${this.multipliers.fireDefense}x Inteligência
        Defesa a gelo = ${this.multipliers.iceDefense}x Inteligência
        Defesa a eletricidade = ${this.multipliers.thunderDefense}x Inteligência
        Defesa a veneno = ${this.multipliers.poisonDefense}x Inteligência
        `
    }
}