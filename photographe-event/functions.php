<?php 

function theme_scripts(){
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_script( 'script', get_template_directory_uri() . '/script.js', array(), '1.0.0', true );
	
}
add_action('wp_enqueue_scripts', 'theme_scripts');


function custom_header_setup() {
	$args = array(
		'default-text-color' => '000',
		'width'              => 1440,
		'height'             => 250,
		'flex-width'         => true,
		'flex-height'        => true,
	);
	add_theme_support( 'custom-header', $args );
}
add_action( 'after_setup_theme', 'custom_header_setup' );


function themename_custom_logo_setup() {
	$defaults = array(
		'height'               => 100,
		'width'                => 400,
		'flex-height'          => true,
		'flex-width'           => true,
		'header-text'          => array( 'site-title', 'site-description' ),
	);
	add_theme_support( 'custom-logo', $defaults );
}
add_action( 'after_setup_theme', 'themename_custom_logo_setup' );


function montheme_supports()
{
    add_theme_support('title-tag');
    add_theme_support('menus');
}

add_action('after_setup_theme','montheme_supports');

function register_my_menu(){
    register_nav_menu( 'header', 'En tête du menu' );
    register_nav_menu( 'footer', 'Pied de page' );
  }
  add_action( 'after_setup_theme', 'register_my_menu' );

  function custom_image_sizes() {
    
    add_image_size('miniature-personnalisee', 844, 563);
	add_image_size('miniature-personnalisee2', 594, 495, true);
	add_image_size('miniature-personnalisee3', 81, 71, true);

}

add_action('after_setup_theme', 'custom_image_sizes');



function weichie_load_more() {
	$paged = $_POST['paged'];

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12, 
        'paged' => $paged,
    );

    $query = new WP_Query($args);

    ob_start();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
             echo get_the_post_thumbnail();
        }
    }

    $output = ob_get_clean();

    echo json_encode(array('success' => true, 'html' => $output));
    wp_die();
}
  add_action('wp_ajax_weichie_load_more', 'weichie_load_more');
  add_action('wp_ajax_nopriv_weichie_load_more', 'weichie_load_more');