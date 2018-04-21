let Db = require("../db");

module.exports =  class User extends Db{
	
	constructor ()
	{
		super();
		this.id = 0;
		this.tableName ="users";

	}

};