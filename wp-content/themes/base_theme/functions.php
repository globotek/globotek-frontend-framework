<?php
function theme_dev() {

    global $template;

    // echo '<strong>' . $template . '</strong>';

    echo '<script id="__bs_script__">//<![CDATA[
    document.write("<script async src=\'http://HOST:3000/browser-sync/browser-sync-client.js?v=2.26.7\'><\/script>".replace("HOST", location.hostname));
//]]></script>';

}

add_action('wp_footer', 'theme_dev');


function admin_editor_css() {

    echo '<style>.wp-block{ max-width: 1200px !important; }</style>';

}

add_action('admin_footer', 'admin_editor_css');


function theme_styles() {

//    wp_enqueue_style( 'fonts', 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400;1,700&family=Lora:wght@562&display=swap' );
    wp_enqueue_style('style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('global', get_template_directory_uri() . '/css/global.css');
//    wp_enqueue_style( 'slick-slider-css', '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' );
//    wp_enqueue_style( 'prettyPhoto', get_template_directory_uri() . '/css/prettyPhoto.css' );

}

add_action('wp_enqueue_scripts', 'theme_styles');


function theme_scripts() {

    wp_enqueue_script('font-awesome', 'https://kit.fontawesome.com/24b55bf1c4.js');
    wp_enqueue_script('gtek-js-lib', get_template_directory_uri() . '/scripts/gtek_js_lib.js', array('jquery'), 1.0, TRUE);
//    wp_enqueue_script( 'prettyPhoto', get_template_directory_uri() . '/scripts/prettyPhoto.js', array( 'jquery' ), 1.0, TRUE );
//    wp_enqueue_script( 'slick-slider-js', '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js' );
    wp_enqueue_script('gtek-js', get_template_directory_uri() . '/scripts/base_theme.js', array('gtek-js-lib'), 1.0, TRUE);

}

add_action('wp_enqueue_scripts', 'theme_scripts');


add_theme_support('post-thumbnails');
add_theme_support('menus');
add_theme_support('custom-logo');
add_theme_support('title-tag');


register_nav_menus(array(
    'main' => 'Main Menu'
));


if (is_plugin_active('gravityforms/gravityforms.php')) {

    function gtek_form_submit_button($button, $form) {

        return "<button class='button button--positive gform_button form__submit' id='gform_submit_button_{$form['id']}'><span>Send</span></button>";

    }

    add_filter('gform_submit_button', 'gtek_form_submit_button', 10, 2);

}