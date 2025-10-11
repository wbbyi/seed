export class UserHistory {
	_id : string
	image : string
	name : string
	resultName : string
	resultRate : number
	resultDes : string
	seedClass : string
	otherName : string
	englishName : string
	
	[key: string]: any;
	
	constructor(_id : string,
		image : string,
		name : string,
		resultName : string,
		resultRate : number,
		resultDes : string,
		seedClass : string,
		otherName : string,
		englishName : string) {
		this._id = _id
		this.image = image
		this.name = name
		this.resultName = resultName
		this.resultRate = resultRate
		this.resultDes = resultDes
		this.seedClass = seedClass
		this.otherName = otherName
		this.englishName = englishName
	}
}