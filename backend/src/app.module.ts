import {RouterModule} from "nest-router";
import {Module} from "@nestjs/common";

import {routes} from "./app.routing";

import {CharacterModule} from "./character";
import {WorldModule} from "./world";
import {UserModule} from "./user";
import {ItemModule} from "./item";

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		UserModule,
		CharacterModule,
		WorldModule,
		ItemModule,
	],
})
export class AppModule {
}
