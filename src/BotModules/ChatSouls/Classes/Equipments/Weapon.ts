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

        let multipliersString = ''

        if(this.multipliers["agility"] !== 0) {
            multipliersString += `Dano físico = ${this.multipliers.agility}x Agilidade, `
        }

        if(this.multipliers["strenght"] !== 0) {
            multipliersString += `Dano físico = ${this.multipliers.strenght}x Força, `
        }

        if(this.multipliers["fireDamage"] !== 0) {
            multipliersString += `Dano de Fogo = ${this.multipliers.fireDamage}x Inteligência, `
        }

        if(this.multipliers["iceDamage"] !== 0) {
            multipliersString += `Dano de Gelo = ${this.multipliers.iceDamage}x Inteligência, `
        }

        if(this.multipliers["thunderDamage"] !== 0) {
            multipliersString += `Dano de Eletricidade = ${this.multipliers.thunderDamage}x Inteligência, ` 
        }

        if(this.multipliers["poisonDamage"] !== 0 ) {
            multipliersString += `Dano de Veneno = ${this.multipliers.poisonDamage}x Inteligência, `
        }

        return `
        DESCRIÇÃO: ${description} 
        MULTIPLICADORES: ${multipliersString.slice(0, -2)}
        `
    }
}