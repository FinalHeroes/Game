import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CharacterEntity} from "./character.entity";
import {EquipmentEntity} from "./equipment.entity";
import {AvatarService} from "./avatar.service";
import {UserEntity} from "../user";
import {AvatarEntity} from "./avatar.entity";
import {WorldService} from "../world";

@Injectable()
export class CharacterService {
	constructor(
		@Inject("CHARACTER_REPOSITORY")
		private readonly characters: Repository<CharacterEntity>,
		@Inject("EQUIPMENT_REPOSITORY")
		private readonly equipments: Repository<EquipmentEntity>,
		private readonly avatars: AvatarService,
		private readonly worlds: WorldService,
	) {
	}

	async findAll(): Promise<Array<CharacterEntity>> {
		return await this.characters.find();
	}

	async findOne(id: string): Promise<CharacterEntity> {
		return await this.characters.findOneOrFail(id);
	}

	private async createEquipment(character: CharacterEntity): Promise<EquipmentEntity> {
		const equip = this.equipments.create({
			player: character,
		});
		return await this.equipments.save(equip);
	}

	async create(owner: UserEntity, name: string, avatar: AvatarEntity): Promise<CharacterEntity> {
		const char = this.characters.create({
			owner,
			name,
			avatar,
		});

		char.equipment = await this.createEquipment(char);
		char.currentHealth = 0;
		char.currentMana = 0;
		return await this.characters.save(char);
	}
}
