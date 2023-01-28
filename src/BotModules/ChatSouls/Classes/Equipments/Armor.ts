import Equipment from "./Equipment.js"

export default class Armor extends Equipment {

    detailsString(description: string): string {
        return `
        DESCRIÇÃO: ${description} 
        MULTIPLICADORES: 
        HP = ${this.multipliers.vitality}x Vitalidade, 
        Evasão = ${this.multipliers.agility}x Agilidade, 
        Defesa física = ${this.multipliers.strenght}x Força, 
        Defesa mágica = ${this.multipliers.intelligence}x Inteligência`
    }
}