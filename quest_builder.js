/*

----- Construct a quest out of the raw options in './RAW_DATA/quest_data.txt'

Probably it will use some markov-chain style system to put together quests

Quests will be composed of the following kinds of data:

- Quest type (rescue, treasure hunt, murder, etc)
	└-> Antagonist (Goblin King, Dragon, Human, Elves, etc.)
		└-> Monster themes (Undead, Amphibians, Dogs, Fire, etc.)
	└-> Temperature (Hot, Cold, Moderate)
		└-> Main Geography (Mountains, a dungeon, the shore, icy place)
			└-> Additional monster themes
			└-> How to get there
		└-> Additional themes (big mushrooms, thorns, weather, etc.)
- Random magic items


Also randomly construct four possible heroes. Who attends each quest will be left
up to the community vote (this functionality might be saved for later)

Quest Types:
0 Treasure Hunt

Antagonist
0 Goblin King
1 Dragon
2 Lich

Monster Themes
0 Undead
1 Aquatic


Location themes
- Desert
- Forest
- Mountains
- Mountain Hall
- Swamp
*/