import { CS_Weapon_Multipliers } from "../../Globals/moduleTypes.js"

export default class Weapon {

    multipliers: CS_Weapon_Multipliers = {
        
        agility:        0,
        strenght:       0,
        
        fireDamage:     0,
        iceDamage:      0,
        thunderDamage:  0,
        poisonDamage:   0
    }

    detailsString(description: string): string {
        return `
        DESCRIÇÃO: ${description} 
        MULTIPLICADORES: 

        Evasão = ${this.multipliers.agility}x Agilidade, 
        Dano físico = ${this.multipliers.strenght}x Força,

        Dano de Fogo = ${this.multipliers.fireDamage}x Inteligência
        Dano de Gelo = ${this.multipliers.iceDamage}x Inteligência
        Dano de Eletricidade = ${this.multipliers.thunderDamage}x Inteligência
        Dano de Veneno = ${this.multipliers.poisonDamage}x Inteligência
        `
    }
}