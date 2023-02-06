import { CS_Armor_Multipliers } from "../../Globals/moduleTypes.js"

export default class Armor {

    multipliers: CS_Armor_Multipliers = {
        

        vitality:       0,
        agility:        0,
        strenght:       0,
        mana:   0,
        
        fireDefense:    0,
        iceDefense:     0,
        thunderDefense: 0,
        poisonDefense:  0
    }

    detailsString(description: string): string {

        let multipliersString = ''

        if(this.multipliers["vitality"] !== 0) {
            multipliersString += `HP = ${this.multipliers.vitality}x Vitalidade, `
        }

        if(this.multipliers["agility"] !== 0 ) {
            multipliersString += `Evasão = ${this.multipliers.agility}x Agilidade, `
        }

        if(this.multipliers["strenght"] !== 0 ) {
            multipliersString += `Defesa física = ${this.multipliers.strenght}x Força,`
        }

        if(this.multipliers["fireDefense"] !== 0 ) {
            multipliersString += `Defesa a fogo = ${this.multipliers.fireDefense}x Inteligência, `
        }

        if(this.multipliers["iceDefense"] !== 0 ) {
            multipliersString += `Defesa a gelo = ${this.multipliers.iceDefense}x Inteligência, `
        }

        if(this.multipliers["thunderDefense"] !== 0 ) {
            multipliersString += `Defesa a eletricidade = ${this.multipliers.thunderDefense}x Inteligência, `
        }

        if(this.multipliers["poisonDefense"] !== 0 ) {
            multipliersString += `Defesa a veneno = ${this.multipliers.poisonDefense}x Inteligência, `
        }

        return `
        DESCRIÇÃO: ${description} 
        MULTIPLICADORES: ${multipliersString.slice(0, -2)}
        `
    }
}