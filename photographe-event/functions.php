<?php 

function theme_scripts(){
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_script( 'script', get_template_directory_uri() . '/script.js', array(), '1.0.0', true );
	wp_enqueue_script( 'lightbox-script', get_template_directory_uri() . '/lightbox.js', array(), '1.0.0', true );
	
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



function load_more() {
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
  add_action('wp_ajax_load_more', 'load_more');
  add_action('wp_ajax_nopriv_load_more', 'load_more');

  

  function filter_posts() {
	$category = $_POST['category'];
	$format = $_POST['format'];
	$date = $_POST['date'];

	$args = array(
	  'post_type' => 'photo',
	  'posts_per_page' => 12,
	  'tax_query' => array(
		'relation' => 'AND',
		array(
		  'taxonomy' => 'categorie', 
		  'field' => 'slug',
		  'terms' => $category,
		),
		array(
		  'taxonomy' => 'format', 
		  'field' => 'slug',
		  'terms' => $format,
		),
	),'date_query' => array(
		array(
		  'after' => $date,
		  'inclusive' => true,
		),
	  ),
	);
  
  
	$posts = new WP_Query($args);
  
	ob_start();
  
	if ($posts->have_posts()) {
	  while ($posts->have_posts()) {
		$posts->the_post();
		echo get_the_post_thumbnail();
	  }
	} else {
	  echo 'No posts found.';
	}
  
	wp_reset_postdata();
  
	$response = array('html' => ob_get_clean());
	wp_send_json($response);
	wp_die();
  }

add_action('wp_ajax_filter_posts', 'filter_posts');
add_action('wp_ajax_nopriv_filter_posts', 'filter_posts');