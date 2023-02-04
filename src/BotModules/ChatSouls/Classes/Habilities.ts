import Emote from "../../../Twitch/Emotes.js";
import { CS_Catalog_Habilities, CS_Catalog_Habilities_BodyArmor, CS_Catalog_Habilities_Boots, CS_Catalog_Habilities_Gloves, CS_Catalog_Habilities_Helmet, CS_Catalog_Habilities_LongRange, CS_Catalog_Habilities_Melee } from "../Globals/moduleTypes.js";
import Battle from "./Battle.js";
import CS_Math from "./CS_Math.js";
import Entity from "./Entity.js";
import Player from "./EntityChilds/Player.js";

type Config = {
    caster: Entity,
    target: Entity,
    battle: Battle
}

export default class Habilities {

    static useHabilitie(habilitieName: CS_Catalog_Habilities, config: Config): void {
        habilitieDatabase[habilitieName](config)
    }

    static disparoDeFogo(config: Config): void {
        
        const { caster, target, battle } = config

        if(CS_Math.evasionEventSucced({
            from: caster,
            against: target,
            evasionWeight: 0.75
        })) {

            caster instanceof Player
            ? battle.logBattleHistory(`${Emote._SirMad_} ${Emote._SirSad_} Sua abilidade "Disparo de Fogo" Falhou!!`)
            : battle.logBattleHistory(`${Emote._SirPrise_} ${Emote._StinkyGlitch_} Você esquivou de um "Disparo de Fogo"!!`)
            return
        }

        
        const HABILITIE_POWER = 20
        const fireDamage = caster.getAttributes().intelligence * HABILITIE_POWER
        const targetFireDefense = target.getBaseStats().fireDefense + target.getArmorStats().fireDefense
        
        let rawDamage = fireDamage - targetFireDefense
        
        if(rawDamage < 0) {
            rawDamage = 0
        }

        const effectiveDamage = CS_Math.returnEffectiveDamage(rawDamage, CS_Math.getLuckNumber())

        caster instanceof Player
        ? battle.logBattleHistory(`${Emote._SirUwU_} ${Emote._StinkyGlitch_} Sua abilidade "Disparo de Fogo" acertou causando ${effectiveDamage}!!`)
        : battle.logBattleHistory(`${Emote._SirMad_} ${Emote._StinkyGlitch_} Você sofreu ${effectiveDamage} de dano da habilidade "Disparo de Fogo"!!`)

        target.inflictDamage(effectiveDamage)
    }

    static podridao(config: Config): void {

        const { caster, target, battle } = config

        if(CS_Math.evasionEventSucced({
            from: caster,
            against: target,
            evasionWeight: 0.75
        })) {

            caster instanceof Player
            ? battle.logBattleHistory(`${Emote._SirMad_} ${Emote._bleedPurple_} Sua abilidade "Podridão" Falhou!!`)
            : battle.logBattleHistory(`${Emote._SirPrise_} ${Emote._bleedPurple_} Você esquivou de uma ""Podridão""!!`)

            return
        }

        const HABILITIE_POWER = 20
        const attackValue = caster.getAttributes().intelligence * HABILITIE_POWER
        const targetDefense = target.getBaseStats().poisonDefense + target.getArmorStats().poisonDefense
        
        let rawDamage = attackValue - targetDefense

        if(rawDamage < 0) {
            rawDamage = 0
        }

        const effectiveDamage = CS_Math.returnEffectiveDamage(rawDamage, CS_Math.getLuckNumber())

        caster instanceof Player
        ? battle.logBattleHistory(`${Emote._SirUwU_} ${Emote._bleedPurple_} Sua abilidade "Podridão" acertou causando ${effectiveDamage}!!`)
        : battle.logBattleHistory(`${Emote._SirMad_} ${Emote._bleedPurple_} Você sofreu ${effectiveDamage} de dano da habilidade "Podridão"!!`)

        target.inflictDamage(effectiveDamage)
    }

    static precisao(config: Config): void {

        const { caster, battle } = config

        const ACCURACY_BONUS_PERCENTAGE = 0.5
        const accuracyBonus = Math.floor((caster.getBaseStats().accuracy + caster.getArmorStats().accuracy) * ACCURACY_BONUS_PERCENTAGE)

        caster.registerBuff({
            name: "Precisão",
            type: "Buff/Debuff",
            turns: 3,
            buffStats: {
                hp:             0,
                mana:           0,
                evasion:        0,
                accuracy:       accuracyBonus,
        
                fisicalDamage:  0,
                fireDamage:     0,
                iceDamage:      0,
                thunderDamage:  0,
                poisonDamage:   0,
        
                fisicalDefense: 0,
                fireDefense:    0,
                iceDefense:     0,
                thunderDefense: 0,
                poisonDefense:  0
            }
        })

        caster instanceof Player
        ? battle.logBattleHistory(`${Emote._SirUwU_} ${Emote._PowerUpL_} ${Emote._PowerUpR_} Você usou "Precisão"!!`)
        : battle.logBattleHistory(`${Emote._SMOrc_} ${Emote._PowerUpL_} ${Emote._PowerUpR_} ${caster.getName()} usou "Precisão"!!`)
    }

    static adrenalina(config: Config): void {

        const { caster, battle } = config

        const meleeFisicalDmg = caster.getMeleeStats().fisicalDamage
        const longRangeFisicalDmg = caster.getLongRangeStats().fisicalDamage

        let fisicalDamageBonus = 0
        
        meleeFisicalDmg > longRangeFisicalDmg
        ? fisicalDamageBonus += meleeFisicalDmg
        : fisicalDamageBonus += longRangeFisicalDmg

        const FISICAL_BONUS_DAMAGE_PERCENTAGE = 0.33
        fisicalDamageBonus = Math.floor(caster.getBaseStats().fisicalDamage + fisicalDamageBonus * FISICAL_BONUS_DAMAGE_PERCENTAGE)

        caster.registerBuff({
            name: "Adrenalina",
            type: "Buff/Debuff",
            turns: 5,
            buffStats: {
                hp:             0,
                mana:           0,
                evasion:        0,
                accuracy:       0,
        
                fisicalDamage:  fisicalDamageBonus,
                fireDamage:     0,
                iceDamage:      0,
                thunderDamage:  0,
                poisonDamage:   0,
        
                fisicalDefense: 0,
                fireDefense:    0,
                iceDefense:     0,
                thunderDefense: 0,
                poisonDefense:  0
            }
        })

        caster instanceof Player
        ? battle.logBattleHistory(`${Emote._SirUwU_} ${Emote._PowerUpL_} Você usou "Adrenalina" ${Emote._PowerUpR_} !!`)
        : battle.logBattleHistory(`${Emote._SMOrc_} ${Emote._PowerUpL_} ${caster.getName()} usou "Adrenalina" ${Emote._PowerUpR_} !!`)
    }

    static reflexoFelino(config: Config): void {

        const { caster, battle } = config

        const EVASION_BONUS_PERCENTAGE = 0.5
        const evasionBonus = Math.floor((caster.getBaseStats().evasion + caster.getArmorStats().evasion) * EVASION_BONUS_PERCENTAGE)

        caster.registerBuff({
            name: "Reflexo Felino",
            type: "Buff/Debuff",
            turns: 3,
            buffStats: {
                hp:             0,
                mana:           0,
                evasion:        evasionBonus,
                accuracy:       0,
        
                fisicalDamage:  0,
                fireDamage:     0,
                iceDamage:      0,
                thunderDamage:  0,
                poisonDamage:   0,
        
                fisicalDefense: 0,
                fireDefense:    0,
                iceDefense:     0,
                thunderDefense: 0,
                poisonDefense:  0
            }
        })

        caster instanceof Player
        ? battle.logBattleHistory(`${Emote._SirUwU_} ${Emote._PowerUpL_} Você usou "Reflexo Felino" ${Emote._PowerUpR_} !!`)
        : battle.logBattleHistory(`${Emote._SMOrc_} ${Emote._PowerUpL_} ${caster.getName()} usou "Reflexo Felino" ${Emote._PowerUpR_} !!`)
    }

    static peleDeFerro(config: Config): void {

        const { caster, battle } = config

        const DEFENSE_BONUS_PERCENTAGE = 0.33
        const fisicalDefenseBonus = Math.floor((caster.getBaseStats().fisicalDefense + caster.getArmorStats().fisicalDefense) * DEFENSE_BONUS_PERCENTAGE)

        caster.registerBuff({
            name: "Pele de Ferro",
            type: "Buff/Debuff",
            turns: 5,
            buffStats: {
                hp:             0,
                mana:           0,
                evasion:        0,
                accuracy:       0,
        
                fisicalDamage:  0,
                fireDamage:     0,
                iceDamage:      0,
                thunderDamage:  0,
                poisonDamage:   0,
        
                fisicalDefense: fisicalDefenseBonus,
                fireDefense:    0,
                iceDefense:     0,
                thunderDefense: 0,
                poisonDefense:  0
            }
        })

        caster instanceof Player
        ? battle.logBattleHistory(`${Emote._SirUwU_} ${Emote._PowerUpL_} Você usou "Pele de Ferro" ${Emote._PowerUpR_} !!`)
        : battle.logBattleHistory(`${Emote._SMOrc_} ${Emote._PowerUpL_} ${caster.getName()} usou "Pele de Ferro" ${Emote._PowerUpR_} !!`)
    }

    static primeirosSocorros(config: Config): void {

        const { caster, battle } = config

        const MAXHP_HEAL_AMOUNT = 0.2
        const healingAmount = Math.floor((caster.getBaseStats().hp + caster.getArmorStats().hp) * MAXHP_HEAL_AMOUNT)

        caster.recoverHP(healingAmount)
        caster instanceof Player
        ? battle.logBattleHistory(`${Emote._SirUwU_} ${Emote._GayPride_} Você usou "Primeiros Socorros" recuperando ${healingAmount} de vida!!`)
        : battle.logBattleHistory(`${Emote._SMOrc_} ${Emote._GayPride_} ${caster.getName()} usou "Primeiros Socorros" recuperando ${healingAmount} de vida!!`)
    }

    static passosRapidos(config: Config): void {

        const { caster, battle } = config

        if(caster instanceof Player) {
            battle.setTurn("PlayerFirst")
            battle.logBattleHistory(`${Emote._SirUwU_} Você usou "Passos Rápidos" agora tem a vantagem de começar!`)
        } else {
            battle.setTurn("EnemieFirst")
            battle.logBattleHistory(`${Emote._SirPrise_} ${caster.getName()} usou "Passos Rápidos" e agora ele tem a vantagem de começar!`)
        }
        
    }
}

function emptyHabilitie() {}
function dummyHabilitie() {}

const habilitieDatabase: Record<
    CS_Catalog_Habilities_LongRange |
    CS_Catalog_Habilities_Melee |
    CS_Catalog_Habilities_Helmet |
    CS_Catalog_Habilities_BodyArmor |
    CS_Catalog_Habilities_Gloves |
    CS_Catalog_Habilities_Boots
, Function> = {
    "Dummy Habilitie": dummyHabilitie,
    "Empty": emptyHabilitie,
    "Disparo de Fogo": Habilities.disparoDeFogo,
    "Podridão": Habilities.podridao,
    "Precisão": Habilities.precisao,
    "Adrenalina": Habilities.adrenalina,
    "Reflexo Felino": Habilities.reflexoFelino,
    "Pele de Ferro": Habilities.peleDeFerro,
    "Primeiros Socorros": Habilities.primeirosSocorros,
    "Passos Rápidos": Habilities.passosRapidos
}