'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var filter = require('gulp-filter');

var createRouteMarkup = function(routeNames) {
  var routeMarkup = '';
  var homeTab = routeNames.shift();
  routeMarkup = '<li><Link to=\'/'+ homeTab +'\'><span>'+ homeTab +'</span></Link></li>\n\t\t\t\t\t\t';
  routeNames.forEach(function(route) {
	routeMarkup += '<li><Link to=\'/'+ route +'\'><span>'+ route +'</span></Link></li>\n\t\t\t\t\t\t';
  });
  return routeMarkup;
}

var createRoutes = function(routeNames) {
  var routes = '';
  routeNames.forEach(function(route) {
	routes += '<Route path=\''+ route +'\' component={'+route+'Container} />\n\t';
  });
  return routes;
}

var createImports = function(routeNames) {
  var imports = '';
  routeNames.forEach(function(route) {
	imports += 'import { '+ route +'Container } from \'../containers/'+ route +'Container\';\n';
  });
  return imports;
}

var createReducerImports = function(reducerNames) {
  var imports = '';
  reducerNames.forEach(function(reducer) {
	imports += 'import { ' + reducer + 'Reducer } from \'../reducers/'+ reducer + 'Reducer\';\n';
  });
  return imports;
}

var createReducers = function(reducerNames) {
  var reducers = '';
  reducerNames.forEach(function(reducer) {
	reducers += reducer + ': ' + reducer + 'Reducer,\n\t';
  });
  return reducers;
}

var createStores = function(storeNames) {
  var stores = '';
  storeNames.forEach(function(store) {
	stores += store + ': { text: \'Welcome to '+ store +'!\'},\n\t'; 
  });
  return stores;
}
module.exports = yeoman.Base.extend({
  prompting: function () {
	
	var prompts = [{
	  type: 'input',
	  name: 'applicationName',
	  message: 'Application name:(CAMELCASE ONLY)',
	  default: this.appname
	},
	{
	  type:'input',
	  name:'pageTitle',
	  message: 'Page title:',
	  default: this.appname
	},
	{
	  type: 'input',
	  name: 'pageNames',
	  message: 'Enter comma separated page names to create (Home is included by default) (ex: Home,Users,Tables): Home,'
	}];

	return this.prompt(prompts).then(function (props) {
	  this.props = props;
	}.bind(this));
  },

  writing: function () {
	var that = this;

	//Create folder structure
	mkdirp.sync(this.props.applicationName+'/src');
	mkdirp.sync(this.props.applicationName+'/src/actions');
	mkdirp.sync(this.props.applicationName+'/src/components');
	mkdirp.sync(this.props.applicationName+'/src/constants');
	mkdirp.sync(this.props.applicationName+'/src/containers');
	mkdirp.sync(this.props.applicationName+'/src/reducers');
	mkdirp.sync(this.props.applicationName+'/src/routes');
	mkdirp.sync(this.props.applicationName+'/src/store');
	mkdirp.sync(this.props.applicationName+'/dist');
	mkdirp.sync(this.props.applicationName+'/dist/css');
	mkdirp.sync(this.props.applicationName+'/public')
	
	this.registerTransformStream(replace('&lt;','<'));
	this.registerTransformStream(replace('&gt;','>'));
	this.registerTransformStream(replace('&#39;','\''));

	//Create boilerplates
	this.fs.copy(
	  this.templatePath('_package.json'),
	  this.destinationPath(this.props.applicationName+'/package.json')
	);
	this.fs.copyTpl(
	  this.templatePath('index.html'),
	  this.destinationPath(this.props.applicationName+'/public/index.html'),
	  { title: this.props.pageTitle }
	);
	this.fs.copyTpl(
	  this.templatePath('index.js'),
	  this.destinationPath(this.props.applicationName+'/src/index.js'),
	  { name: this.props.applicationName }
	);
	this.fs.copy(
	  this.templatePath('api.js'),
	  this.destinationPath(this.props.applicationName+'/src/api.js')
	);
	this.props.pageNames = this.props.pageNames.split(/[ ,]+/).filter(Boolean);
	this.props.pageNames.length ? this.props.pageNames.unshift('Home') : this.props.pageNames.push('Home');
	this.props.pageNames.forEach(function(name) {
	  that.fs.copyTpl(
		that.templatePath('Content.js'),
		that.destinationPath(that.props.applicationName+'/src/components/'+name+'Component.jsx'),
		{pageName: name}
	  );
	});
	this.props.pageNames.forEach(function(name) {
	  that.fs.copyTpl(
		that.templatePath('Container.jsx'),
		that.destinationPath(that.props.applicationName+'/src/containers/'+name+'Container.jsx'),
		{
		  name: that.props.applicationName,
		  pageName: name
		}
	  );
	});
	this.props.pageNames.forEach(function(name) {
	  that.fs.copyTpl(
		that.templatePath('customaction.js'),
		that.destinationPath(that.props.applicationName+'/src/actions/'+name+'Action.js'),
		{
		  actionName: name
		}
	  );
	});
	this.props.pageNames.forEach(function(name) {
	  that.fs.copyTpl(
		that.templatePath('customreducer.js'),
		that.destinationPath(that.props.applicationName+'/src/reducers/'+name+'Reducer.js'),
		{
		  reducerName: name
		}
	  );
	});
	this.fs.copyTpl(
	  this.templatePath('CoreLayout.jsx'),
	  this.destinationPath(this.props.applicationName+'/src/layouts/CoreLayout.jsx'),
	  {routes: createRouteMarkup(this.props.pageNames)}
	);
	this.fs.copyTpl(
	  this.templatePath('routes.js'),
	  this.destinationPath(this.props.applicationName+'/src/routes/routes.jsx'),
	  {
		imports: createImports(this.props.pageNames),
		routes: createRoutes(this.props.pageNames)
	  }
	);
	this.fs.copy(
	  this.templatePath('constants.js'),
	  this.destinationPath(this.props.applicationName+'/src/constants/constants.js')
	);
	this.fs.copyTpl(
	  this.templatePath('reducer.js'),
	  this.destinationPath(this.props.applicationName+'/src/reducers/'+this.props.applicationName+'Reducer.js'),
	  {
		name: this.props.applicationName,
		imports: createReducerImports(this.props.pageNames),
		reducers: createReducers(this.props.pageNames)
	  }
	);
	this.fs.copyTpl(
	  this.templatePath('store.js'),
	  this.destinationPath(this.props.applicationName+'/src/store/'+this.props.applicationName+'Store.js'),
	  {
		name: this.props.applicationName,
		stores: createStores(this.props.pageNames)
	  }
	);
	
	//copy assets
	this.fs.copy(
	  this.templatePath('MainStyle.css'),
	  this.destinationPath(this.props.applicationName+'/dist/css/MainStyle.css')
	);
  },

  
  install: function () {
	process.chdir(this.props.applicationName);
	this.npmInstall();
	this.log('Installing dependencies..');
  },
  end: function() {
	//overwrite react-scripts path config; we use a different structure!
	try {
		this.log(yosay('Please say yes to the following questions. Bad things happen otherwise.'));
		this.fs.copy(
		  this.templatePath('paths.js'),
		  this.destinationPath(this.props.applicationName+'/node_modules/react-scripts/config/paths.js')
		);
		this.fs.copy(
		  this.templatePath('webpack.config.dev.js'),
		  this.destinationPath(this.props.applicationName+'/node_modules/react-scripts/config/webpack.config.dev.js')
		);
		this.fs.copy(
		  this.templatePath('webpack.config.prod.js'),
		  this.destinationPath(this.props.applicationName+'/node_modules/react-scripts/config/webpack.config.prod.js')
		);
		this.log('All done! \\{^_^}/ \n');
	}
	catch(e) {
		//do nothing.
	}
  }
  
});
