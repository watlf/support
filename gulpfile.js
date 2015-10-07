var elixir = require('laravel-elixir');
require('laravel-elixir-bower');
require('laravel-elixir-angular');
require('laravel-elixir-bowerbundle');

elixir.config.sourcemaps = true;

/**
 * For admin panel
 */
elixir.config.registerWatcher(
    'copy',
    ["resources/admin/angular/**/*.html"],
    'default'
);

elixir(function(mix) {
    mix.bowerBundle('site', 'resources/assets/bundle')
        .copy('resources/assets/bundle/site.js*', 'public/js')
        .copy('resources/assets/bundle/site.css*', 'public/css')
        .scripts([
            'index.js',
            'scroll.js'
        ])
        .styles(
        [
            'app.css'
        ],
        'public/css/all.css'
    );
});

/**
 * For front site
 */
elixir(function(mix) {
    mix
        .copy('resources/admin/angular/**/*.html', 'public/assets/admin/views/')
        .angular('resources/admin/angular/', 'public/assets/admin/js')
        .bowerBundle('admin','resources/assets/bundle')
        .copy('resources/assets/bundle/admin.js*', 'public/assets/admin/js')
        .copy('resources/assets/bundle/admin.css*', 'public/assets/admin/css');
});