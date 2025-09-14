export class CardMessage {
	photo : string
	name : string
	text : string
	time : string
	constructor(photo : string,
		name : string,
		text : string,
		time : string) {
		this.photo = photo;
		this.name = name;
		this.text = text;
		this.time = time;
	}
}