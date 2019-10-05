/*------------------------------------
 MODULES
 ------------------------------------*/
var gulp        = require('gulp'),
    del         = require('del'),
    sass        = require('gulp-sass'),
    watch       = require('gulp-watch'),
    sync        = require('browser-sync').create(),
    reload      = sync.reload,
    sequence    = require('run-sequence'),
    autoprefix  = require('gulp-autoprefixer'),
    sourcemaps  = require('gulp-sourcemaps'),
    minify_css  = require('gulp-clean-css'),
    minify_svg  = require('gulp-svgmin'),
    svg_symbols = require('gulp-svg-symbols'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify');


/*------------------------------------
 GLOBAL VARS
 ------------------------------------*/
// Add plugin and theme directories for compiling.
var THEMES  = [];
var PLUGINS = [];


var PROJECT_DIRECTORIES = {
	themes:  THEMES,
	plugins: PLUGINS
};

gulp.task('default', function () {
	
	gulp.task('browser_sync', function () {
		
		sync.init({
			https:       false,
			open:        true,
			reloadDelay: 50,
			ghostMode: false
		});
		
	});
	
	var PATHS    = {css: [], icons: [], js: []},
	    WATCHERS = {scss: [], svg: [], scripts: [], php: []};
	
	for (var PROJECT_TYPE in PROJECT_DIRECTORIES) {
		
		var PROJECT_CSS   = [],
		    PROJECT_ICONS = [],
		    PROJECT_JS    = [];
		
		PROJECT_DIRECTORIES[PROJECT_TYPE].forEach(function (PROJECT_DIRECTORY) {
			
			var SOURCE              = PROJECT_TYPE + '/' + PROJECT_DIRECTORY + '/',
			    PROJECT_SCSS        = SOURCE + 'scss/project/**/*.scss',
			    PROJECT_SVG         = SOURCE + 'svg/*.svg',
			    PROJECT_SCRIPTS     = SOURCE + 'scripts',
			    DESTINATION         = '../wp-content/' + PROJECT_TYPE + '/' + PROJECT_DIRECTORY,
			    DESTINATION_CSS     = DESTINATION + '/css',
			    DESTINATION_SVG     = DESTINATION + '/images/svg',
			    DESTINATION_SCRIPTS = DESTINATION + '/scripts',
			    DESTINATION_PHP     = DESTINATION + '/**/*.php';
			
			PROJECT_CSS[PROJECT_DIRECTORY] = {
				'source':      PROJECT_SCSS,
				'destination': DESTINATION_CSS
			};
			
			PROJECT_ICONS[PROJECT_DIRECTORY] = {
				'source':      PROJECT_SVG,
				'destination': DESTINATION_SVG
			};
			
			PROJECT_JS[PROJECT_DIRECTORY] = {
				'source':      PROJECT_SCRIPTS,
				'destination': DESTINATION_SCRIPTS
			};
			
			WATCHERS['scss'].push(PROJECT_SCSS);
			WATCHERS['svg'].push(PROJECT_SVG);
			
			WATCHERS['scripts'].push('global/scripts/_helpers.js');
			WATCHERS['scripts'].push('global/scripts/lib/*.js');
			WATCHERS['scripts'].push(PROJECT_SCRIPTS + '/modules/*.js');
			WATCHERS['scripts'].push(PROJECT_SCRIPTS + '/app.js');
			
			WATCHERS['php'].push(DESTINATION_PHP);
			
			
		});
		
		PATHS['css'].push(PROJECT_CSS);
		PATHS['icons'].push(PROJECT_ICONS);
		PATHS['js'].push(PROJECT_JS);
		
	}
	
	gulp.task('process_scss', function () {
		
		PATHS['css'].forEach(function (CSS) {
			
			for (var INDEX in CSS) {
				console.log(INDEX);
				gulp.src(CSS[INDEX]['source'])
				.pipe(sass().on('error', sass.logError))
				.pipe(sourcemaps.init())
				.pipe(autoprefix({
					overrideBrowserslist: ['last 2 versions'],
					cascade:  false
				}))
				.pipe(minify_css())
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(CSS[INDEX]['destination']))
				.pipe(sync.reload({
					stream: true
				}));
				
			}
			
		});
		
	});
	
	gulp.task('process_svg', function () {
		
		PATHS['icons'].forEach(function (SVG) {
			
			for (var INDEX in SVG) {
				
				gulp.src(SVG[INDEX]['source'])
				//.pipe(minify_svg())
				.pipe(svg_symbols())
				.pipe(gulp.dest(SVG[INDEX]['destination']));
				
			}
			
		});
		
	});
	
	
	gulp.task('delete_svg_css', function () {
		
		PATHS['icons'].forEach(function (SVG) {
			
			for (var INDEX in SVG) {
				
				del(SVG[INDEX]['destination'] + '/*.css', {force: true});
				
			}
			
		});
		
	});
	
	
	gulp.task('process_script_libraries', function () {
		
		var sources = [
			'global/scripts/lib/*.js'
		];
		
		PATHS['js'].forEach(function (SCRIPT) {
			
			for (var INDEX in SCRIPT) {
				
				gulp.src(sources)
				.pipe(concat('lib.js'))
				//.pipe(uglify())
				.pipe(gulp.dest(SCRIPT[INDEX]['destination']));
				
			}
			
		});
		
	});
	
	
	gulp.task('process_scripts', function () {
		
		PATHS['js'].forEach(function (SCRIPT) {
			
			for (var INDEX in SCRIPT) {
				
				console.log(SCRIPT[INDEX]);
				
				
				var sources = [
					'global/scripts/_helpers.js',
					SCRIPT[INDEX]['source'] + '/modules/*.js',
					SCRIPT[INDEX]['source'] + '/app.js'
				];
				
				gulp.start('process_script_libraries');
				
				gulp.src(sources)
				.pipe(sourcemaps.init())
				.pipe(concat(INDEX + '.js'))
				
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(SCRIPT[INDEX]['destination']));
				
			}
			
		});
		
	});
	
	sequence('process_scss', 'process_svg', 'delete_svg_css', 'process_scripts', function () {
		
		gulp.watch(WATCHERS['scss'], ['process_scss']);
		
		gulp.watch(WATCHERS['svg'], ['process_svg', 'delete_svg_css']);
		
		gulp.watch(WATCHERS['scripts'], ['process_scripts']).on('change', reload);
		
		gulp.watch(WATCHERS['php']).on('change', reload);
		
		gulp.start('browser_sync');
		
	});
	
});
