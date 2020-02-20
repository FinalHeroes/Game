import {Context} from "./index";
import {
	Avatar,
	CharacterInfo,
	CharacterInventory,
	MoveCharacterInfo,
	PlayerCharacter,
	UpdateCharacterInfo
} from "heroes-common";

export class CharacterService {
	static async listAllAvatars(): Promise<Array<Avatar>> {
		const response = await Context.get<Array<Avatar>>("/character/avatar");
		return response.data;
	}

	static async getAvatar(id: number): Promise<Avatar> {
		const response = await Context.get<Avatar>(`/character/avatar/${id}`);
		return response.data;
	}

	static async findMine(token: string): Promise<PlayerCharacter | null> {
		try {
			const response = await Context.get<PlayerCharacter>("/character/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.data;
		} catch (e) {
			return null;
		}
	}

	static async userHasChar(token: string): Promise<boolean> {
		try {
			const response = await Context.get<PlayerCharacter>("/character/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.status === 200;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	static async create(token: string, info: CharacterInfo): Promise<PlayerCharacter> {
		const response = await Context.post<PlayerCharacter>("/character", info, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async update(token: string, data: Partial<UpdateCharacterInfo>): Promise<PlayerCharacter> {
		const response = await Context.put<PlayerCharacter>("/character/me", {...data}, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async moveTo(token: string, data: MoveCharacterInfo): Promise<PlayerCharacter> {
		const response = await Context.put<PlayerCharacter>("/character/me/move", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async findInventory(id: string): Promise<Array<CharacterInventory>> {
		const response = await Context.get<Array<CharacterInventory>>(`/character/inventory/owner/${id}`);
		return response.data;
	}
}
