import { Collection, Properties } from "weaviate-client";
import { Category } from "./enums";

/* Begin API Schema Types */
interface APIItem {
	name: string;
	id: number;
	description: string;
	image: string;
	common_locations: string[] | null;
	drops: string[] | null;
	dlc: boolean;
}

interface APIEquipmentItem extends APIItem {
	category: Category.EQUIPMENT;
	properties: {
		attack: number;
		defense: number;
		effect?: string;
		type?: string;
	};
}

interface APIMaterialItem extends APIItem {
	category: Category.MATERIALS;
	hearts_recovered: number;
	cooking_effect: string;
	fuse_attack_power?: number;
}

interface APICreatureItem extends APIItem {
	category: Category.CREATURES;
	edible: boolean;
	hearts_recovered?: number;
}

interface APITreasureItem extends APIItem {
	category: Category.TREASURE;
}

export type APIEntryItem =
	| APIEquipmentItem
	| APIMaterialItem
	| APICreatureItem
	| APITreasureItem;

/* End API Schema Types */

/* Begin Weaviate Schema Types */
export interface CommonItemProperties {
	name: string;
	category: Category;
	itemId: number;
	description: string;
	image: string;
	commonLocations: string[] | null;
	drops: string[] | null;
	dlc: boolean;
}

interface EquipmentItem extends CommonItemProperties {
	attack: number;
	defense: number;
	effect: string | null;
	type: string | null;
}

interface MaterialItem extends CommonItemProperties {
	heartsRecovered: number;
	cookingEffect: string;
	fuseAttackPower: number | null;
}

interface CreatureItem extends CommonItemProperties {
	edible: boolean;
	heartsRecovered: number | null;
}

type TreasureItem = CommonItemProperties;

export type CompendiumItem =
	| EquipmentItem
	| MaterialItem
	| CreatureItem
	| TreasureItem;

export type CompendiumCollectionType = Properties & CompendiumItem;

export type CompendiumCollection = Collection<
	CompendiumCollectionType,
	"BotWCompendium"
>;
/* End Weaviate Schema Types */
