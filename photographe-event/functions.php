<?php 

// Enregistre les styles et scripts du thème
function theme_scripts()
{
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_script( 'script', get_template_directory_uri() . '/script.js', array(), '1.0.0', true );
	wp_enqueue_script( 'lightbox-script', get_template_directory_uri() . '/lightbox.js', array(), '1.0.0', true );
	wp_enqueue_script( 'modale-script', get_template_directory_uri() . '/modale.js', array(), '1.0.0', true );
	wp_enqueue_script( 'modale-script2', get_template_directory_uri() . '/modale2.js', array(), '1.0.0', true );
}
add_action('wp_enqueue_scripts', 'theme_scripts');

// Configuration personnalisée de l'en-tête
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

// Configuration personnalisée du logo
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

// Prise en charge des fonctionnalités du thème
function montheme_supports()
{
    add_theme_support('title-tag');
    add_theme_support('menus');
}

add_action('after_setup_theme','montheme_supports');

// Enregistre les menus
function register_my_menu()
{
    register_nav_menu( 'header', 'En tête du menu' );
    register_nav_menu( 'footer', 'Pied de page' );
}
  add_action( 'after_setup_theme', 'register_my_menu' );

function custom_image_sizes() 
{
    
    add_image_size('miniature-personnalisee', 844, 563);
	add_image_size('miniature-personnalisee2', 594, 495, true);
	add_image_size('miniature-personnalisee3', 81, 71, true);

}

add_action('after_setup_theme', 'custom_image_sizes');


// Charge plus de contenu lors du click sur le boutton load more
function load_more() 
{
    $paged = $_POST['paged'];
    

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12, 
        'paged' => $paged,
    );

    $my_query = new WP_Query($args);

    ob_start();

/*debut du de la creation des div pour lightbox-category_ref
elles sont utilises pour l affichage des sinformation categorie et reference dans la lightbox
on reprend la metheode utiliser dans le footer*/

if ($my_query->have_posts()) :
	?>
	<div class= "publication-list">
	<?php
		while ($my_query->have_posts()) : $my_query->the_post();
		the_post_thumbnail('miniature-personnalisee2');
	?>
		<div class= "lightbox_category_ref hidden">
			<div class= "lightbox_category">
			   <?php
				$categorie = get_the_terms(get_the_ID(), 'categorie');
				$term = the_terms(get_the_ID(), 'categorie');
				if ($categorie) {
				  echo '<p>' . $categorie . '</p>';
				 }
			   ?>
			</div>
			<div class= "lightbox_ref">
				<?php
				 $reference = get_post_meta(get_the_ID(), 'reference', true);
				if (($reference)) {
				 echo "<p><span class='ref'>$reference</span></p>";}
				?>
				<div class= "lightbox_eye">     
					<?php
					$page_url= get_permalink();
					?>
					<script>
						let urlpage = "<?php echo $page_url; ?>";
					</script>
				</div>   
			</div>
			 
		</div>
		
		<?php endwhile;?>
		  
	</div>
	<?php endif;?>
	<?php

 
   $output = ob_get_clean();

    echo json_encode(array('success' => true, 'html' => $output));
    
    wp_die();

}
  add_action('wp_ajax_load_more', 'load_more');
  add_action('wp_ajax_nopriv_load_more', 'load_more');

  

function filter_posts() 
{
	$category = $_POST['category'];
	$format = $_POST['format'];
	$date = $_POST['date'];
   
	
    if(($category == '') and ($format == '') and ($date == '') ){
		$args = array(
			'post_type' => 'photo',
			'posts_per_page' => 12,
			'paged' => 1,
		);
		}
	
	else{
		$args = array(
			'post_type' => 'photo',
			'posts_per_page' => 12,
			'tax_query' => array(
			  'relation' => 'OR',
			  array(
				'taxonomy' => 'categorie', 
				'field' => 'term_id',
				'terms' => $category,
				'operator' => 'IN'
			  ),
			  array(
				'taxonomy' => 'format', 
				'field' => 'term_id',
				'terms' => $format,
				'operator' => 'IN'
			  ),
			  array(
				  'taxonomy' => 'annee', 
				  'field' => 'term_id',
				  'terms' => $date,
				  'operator' => 'IN'
				),
		  ),
		  );
	
	    }

	
  
	$my_query = new WP_Query($args);

	ob_start();
/*debut du de la creation des div pour lightbox-category_ref
elles sont utilises pour l affichage des sinformation categorie et reference dans la lightbox
on reprend la metheode utiliser dans le footer*/

if ($my_query->have_posts()) :
	?>
	<div class= "publication-list">
	<?php
		while ($my_query->have_posts()) : $my_query->the_post();
		the_post_thumbnail('miniature-personnalisee2');
	?>
		<div class= "lightbox_category_ref hidden">
			<div class= "lightbox_category">
			   <?php
				$categorie = get_the_terms(get_the_ID(), 'categorie');
				$term = the_terms(get_the_ID(), 'categorie');
				if ($categorie) {
				  echo '<p>' . $categorie . '</p>';
				 }
			   ?>
			</div>
			<div class= "lightbox_ref">
				<?php
				 $reference = get_post_meta(get_the_ID(), 'reference', true);
				if (($reference)) {
				 echo "<p><span class='ref'>$reference</span></p>";}
				?>
				<div class= "lightbox_eye">     
					<?php
					$page_url= get_permalink();
					?>
					<script>
						let urlpage = "<?php echo $page_url; ?>";
					</script>
				</div>   
			</div>
			 
		</div>
		
		<?php endwhile;?>
		  
	</div>
	<?php endif;?>
	<?php

$output = ob_get_clean();

echo json_encode(array('success' => true, 'html' => $output));

wp_die();
}

add_action('wp_ajax_filter_posts', 'filter_posts');
add_action('wp_ajax_nopriv_filter_posts', 'filter_posts');





