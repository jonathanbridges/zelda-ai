import { Collection, GenerativeObject, Properties } from "weaviate-client";
import { Category, URLParams } from "./enums";

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

interface APIMonsterItem extends APIItem {
	category: Category.MONSTERS;
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
	| APIMonsterItem
	| APIEquipmentItem
	| APIMaterialItem
	| APICreatureItem
	| APITreasureItem;

/* End API Schema Types */

/* Begin Weaviate Schema Types */
export interface CommonItemProperties {
	name: string;
	itemId: number;
	description: string;
	image: string;
	commonLocations: string[] | null;
	drops: string[] | null;
	dlc: boolean;
}

export interface MonsterItem extends CommonItemProperties {
	category: Category.MONSTERS;
}

interface EquipmentItem extends CommonItemProperties {
	category: Category.EQUIPMENT;
	attack: number;
	defense: number;
	effect: string | null;
	type: string | null;
}

interface MaterialItem extends CommonItemProperties {
	category: Category.MATERIALS;
	heartsRecovered: number;
	cookingEffect: string;
	fuseAttackPower: number | null;
}

interface CreatureItem extends CommonItemProperties {
	category: Category.CREATURES;
	edible: boolean;
	heartsRecovered: number | null;
}

interface TreasureItem extends CommonItemProperties {
	category: Category.TREASURE;
}

export type CompendiumItem =
	| MonsterItem
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

export interface QueryParams {
	[URLParams.QUERY]?: string;
	[URLParams.CATEGORY]?: Category;
	[URLParams.PAGE]?: number;
}

export interface CompendiumData {
	header: string;
	objects: GenerativeObject<CompendiumItem>[];
	totalCount: number;
}

export const ITEMS_PER_PAGE = 20;
