import {forwardRef, Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {encounterProviders} from "./encounter.provider";
import {EncounterController} from "./encounter.controller";
import {EncounterService} from "./encounter.service";
import {WorldModule} from "../world.module";
import {MonsterModule} from "../../monster";
import {UserModule} from "../../user";

@Module({
	exports: [
		EncounterService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule),
	],
	controllers: [
		EncounterController,
	],
	providers: [
		...encounterProviders,
		EncounterService,
	],
})
export class EncounterModule {
}
