import Equipment from "./Equipment.js"

export default class Weapon extends Equipment {

    detailsString(description: string): string {
        return `
        DESCRIÇÃO: ${description} 
        MULTIPLICADORES: 
        HP = ${this.multipliers.vitality}x Vitalidade, 
        Evasão = ${this.multipliers.agility}x Agilidade, 
        Dano físico = ${this.multipliers.strenght}x Força, 
        Dano mágico = ${this.multipliers.intelligence}x Inteligência`
    }
}