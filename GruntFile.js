module.exports = function(grunt){
	
	grunt.initConfig( {

		'jshint':{
			 options: {
			    jshintrc: '.jshintrc',
			    jshintignore: '.jshintignore'
			  },
			public:[
				"public/js/*.js"
			],
			server:[  
				"server/**/*.js","server/**/**/*.js"
			]
		},
		'concat':{
			dist: {
				src:["public/js/*.js"],
				dest:"public/dist/output.js"
			}
		},
		'watch':{
			public:{
				files:["public/js/*.js"],
				tasks:["jshint:public",'concat']
			},
			server:{
				files:["server/**/*.js","server/**/**/*.js"],
				tasks:["jshint:server"]
			}
		}

	}); 



	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-concat");


	
	grunt.registerTask("default",['jshint','concat','watch'])

}; 