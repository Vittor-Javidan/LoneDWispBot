import { CS_Database_AreaMaps } from '../../Globals/moduleTypes.js';
import get_TEST_AREA_ENEMIES_DATA from './TEST_AREA/TEST_AREA_ENEMIES.js';
import get_THE_WOODS_ENEMIES_DATA from './THE_WOODS/THE_WOODS_ENEMIES.js';

export const enemiesDataBase: CS_Database_AreaMaps = {
    "testArea": get_TEST_AREA_ENEMIES_DATA(),
    "theWoods": get_THE_WOODS_ENEMIES_DATA()
}
