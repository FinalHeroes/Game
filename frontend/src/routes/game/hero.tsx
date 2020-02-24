import {createElement, Fragment, FunctionComponent, useState} from "react";
import {
	Badge,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	createStyles,
	Grid,
	GridList,
	GridListTile,
	makeStyles,
	Menu,
	MenuItem,
	Theme,
	Typography
} from "@material-ui/core";
import {store, useStoreActions, useStoreState} from "../../store";
import {useNavigation} from "react-navi";
import {useMount} from "react-use";
import {CharacterEquipment, CharacterInventory, getItemType, ItemType} from "heroes-common/src";
import {EquipmentType} from "heroes-common/src/interfaces/equipment-type";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		itemSlotCard: {
			width: 128,
			height: 128,
		},
		itemSlotAction: {
			width: "100%",
			height: "100%",
		},
	}),
);

interface EquipmentSlotProps {
	name: string;
	slot?: CharacterEquipment;
	eqType: EquipmentType;
	onEquip?: (slot: CharacterEquipment) => void;
}

const EquipmentSlot: FunctionComponent<EquipmentSlotProps> = ({name, slot, eqType, onEquip}) => {
	const classes = useStyles();
	const [raised, setRaised] = useState(false);
	const failedCard = <Card raised={raised} classes={{root: classes.itemSlotCard}}>
		<CardActionArea
			classes={{root: classes.itemSlotAction}}
			onMouseEnter={() => setRaised(true)}
			onMouseLeave={() => setRaised(false)}
		>
			<CardContent>
				<Typography>{name}</Typography>
			</CardContent>
		</CardActionArea>
	</Card>;

	if (slot) {
		//console.log("This guys is holding something!");
		let nameOfEquipment: string = "";

		switch (eqType){
			case "Head":
				if(slot.headSlot){
					nameOfEquipment = slot.headSlot.item.name;
				} else {
					nameOfEquipment = "";
				}
				break;
			case "Chest":
				if(slot.chestSlot){
					nameOfEquipment = slot.chestSlot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Belt":
				if(slot.beltSlot){
					nameOfEquipment = slot.beltSlot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Boot":
				if(slot.bootSlot){
					nameOfEquipment = slot.bootSlot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Left Hand":
				if(slot.leftHandSlot){
					nameOfEquipment = slot.leftHandSlot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Right Hand":
				if(slot.rightHandSlot){
					nameOfEquipment = slot.rightHandSlot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Ring 1":
				if(slot.ring1Slot){
					nameOfEquipment = slot.ring1Slot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Ring 2":
				if(slot.ring2Slot){
					nameOfEquipment = slot.ring2Slot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Neck":
				if(slot.neckSlot){
					nameOfEquipment = slot.neckSlot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Bag":
				if(slot.bagSlot){
					nameOfEquipment = slot.bagSlot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			case "Artifact":
				if(slot.artifactSlot){
					nameOfEquipment = slot.artifactSlot.item.name;
				}else {
					nameOfEquipment = "";
				}
				break;
			default:
				nameOfEquipment = "";
				break;
		}
		if(nameOfEquipment != ""){
			//console.log("There's something in " + name);
			return <Fragment>
				<Card raised={raised} classes={{root: classes.itemSlotCard}}>
					<CardActionArea
						classes={{root: classes.itemSlotAction}}
						onMouseEnter={() => setRaised(true)}
						onMouseLeave={() => setRaised(false)}
					>
						<CardContent>
							<Typography>{nameOfEquipment}</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Fragment>;
		} else {
			//console.log("There's nothing in " + name);
			return failedCard;
		}
	} else {
		//console.log("There's nothing in " + name);
		return failedCard;
	}
};

interface InventorySlotProps {
	slot?: CharacterInventory;
	onUse?: (slot: CharacterInventory) => void;
}

const InventorySlot: FunctionComponent<InventorySlotProps> = ({slot, onUse}) => {
	const classes = useStyles();
	const discard = useStoreActions(state => state.character.deleteInventory);
	const [itemEl, setItemEl] = useState<null | HTMLElement>(null);
	const handleItemClose = () => setItemEl(null);
	const handleUse = () => {
		if (onUse && slot) {
			onUse(slot);
			console.log(slot);
		}
		handleItemClose();
	};
	const handleDiscard = () => {
		if (slot) {

		}
	};

	if (slot) {
		return <Fragment>
			<Menu
				keepMounted
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				anchorEl={itemEl}
				open={Boolean(itemEl)}
				onClose={handleItemClose}
			>
				{
					getItemType(slot.roll.item) == ItemType.Equipment &&
					<MenuItem onClick={handleUse}>Equip</MenuItem>
				}
				{
					getItemType(slot.roll.item) == ItemType.Consumable &&
					<MenuItem onClick={handleUse}>Use</MenuItem>
				}
				<MenuItem onClick={handleItemClose}>Discard One</MenuItem>
				<MenuItem onClick={handleItemClose}>Discard All</MenuItem>
			</Menu>

			<Card variant="outlined" classes={{root: classes.itemSlotCard}}>
				<CardActionArea
					classes={{root: classes.itemSlotAction}}
					onClick={e => setItemEl(e.currentTarget.parentElement)}
				>
					<CardContent>
						<Badge
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							color='primary'
							invisible={slot.quantity <= 1}
							badgeContent={slot.quantity}
						>
							<CardMedia
								component="img"
								image={`/assets/items/${slot.roll.item.image}`}
								height={94}
							/>
						</Badge>
					</CardContent>
				</CardActionArea>
			</Card>
		</Fragment>;
	} else {
		return <Card variant="outlined" classes={{root: classes.itemSlotCard}}>
			<CardActionArea classes={{root: classes.itemSlotAction}}>
				<CardContent>
					<Typography>Slot</Typography>
				</CardContent>
			</CardActionArea>
		</Card>;
	}
};

const Hero: FunctionComponent = () => {
	const classes = useStyles();
	const currentHero = useStoreState(state => state.character.character);
	const items = useStoreState(state => state.character.inventory);
	const loadHero = useStoreActions(state => state.character.getMine);
	//const equipment = useStoreActions(state => state.character.)
	const addSnack = useStoreActions(state => state.notification.enqueue);
	const updateHero = useStoreActions(state => state.character.update);
	const consumeItem = useStoreActions(state => state.character.consumeItem);
	const nav = useNavigation();

	useMount(() => {
		if (!currentHero) {
			loadHero().then(() => {
				const hero = store.getState().character.character;
				if (!hero) {
					nav.navigate("/hero", {replace: true}).catch(console.error);
				}
			}).catch((e: any) => {
				console.error(e);
				nav.navigate("/", {replace: true}).catch(console.error);
			})
		}
	});

	const handleUse = (slot: CharacterInventory) => {
		if (currentHero) {
			const it = getItemType(slot.roll.item);
			switch (it) {
				case ItemType.Consumable:
					consumeItem(slot);
					break;
				case ItemType.Equipment:

			}
		}
	};

	if (!currentHero) {
		return <Fragment/>;
	}

	return <Grid container justify="center" spacing={2}>
		<Grid item lg={7}>
			<Card raised>
				<CardHeader title="Hero"/>
				<CardContent style={{padding: 8}}>
					<Grid container spacing={2}>
						<Grid container item direction="row" spacing={2} justify="center">
							<Grid container item lg={2} direction="column" spacing={2}>
								<Grid item>
									<EquipmentSlot
										name="Head"
										slot={currentHero.equipment}
										eqType="Head"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Chest"
										slot={currentHero.equipment}
										eqType="Chest"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Belt"
										slot={currentHero.equipment}
										eqType="Belt"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Boot"
										slot={currentHero.equipment}
										eqType="Boot"
									/>
								</Grid>
							</Grid>

							<Grid item lg={6}>
								<Card style={{height: "100%"}} variant="outlined">
									<CardMedia
										component="img"
										height={"100%"}
										image={`/assets/avatar/${currentHero.avatar.filename}`}
										style={{backgroundSize: "cover"}}
									/>
								</Card>
							</Grid>

							<Grid container item lg={2} direction="column" spacing={2}>
								<Grid item>
									<EquipmentSlot
										name="Left Hand"
										slot={currentHero.equipment}
										eqType="Left Hand"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Right Hand"
										slot={currentHero.equipment}
										eqType="Right Hand"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Ring 1"
										slot={currentHero.equipment}
										eqType="Ring 1"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Ring 2"
										slot={currentHero.equipment}
										eqType="Ring 2"
									/>
								</Grid>
							</Grid>
						</Grid>

						<Grid container item lg={12} justify="center" spacing={3}>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Neck"
									slot={currentHero.equipment}
									eqType="Neck"
								/>
							</Grid>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Bag"
									eqType="Bag"
									slot={currentHero.equipment}
								/>
							</Grid>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Artifact"
									slot={currentHero.equipment}
									eqType="Artifact"
								/>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>

		<Grid item lg={9}>
			<Card>
				<CardHeader title="Inventory"/>
				<CardContent>
					<GridList cols={10} cellHeight={128}>
						{[...Array(10).keys()].map(value => {
							if (value <= items.length - 1) {
								return <GridListTile key={value}>
									<InventorySlot
										slot={items[value]}
										onUse={handleUse}
									/>
								</GridListTile>
							} else {
								return <GridListTile key={value}>
									<InventorySlot/>
								</GridListTile>;
							}
						})}
					</GridList>
				</CardContent>
			</Card>
		</Grid>
	</Grid>;
};

export default Hero;
