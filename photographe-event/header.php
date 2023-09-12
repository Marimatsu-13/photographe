<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head() ?>
</head>
<body>
<nav id="navigation">
    <section id="nav-bar">
        <div id="menu-items">
        <?php
        if ( function_exists( 'the_custom_logo' ) ) {
            the_custom_logo();
            
        wp_nav_menu(array(
            'theme_location' => 'header',
            'menu_id' => 'Navigation', 
            'container' => false,
        ));
        ?>
        </div>
        <div class="menu-toggle">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
    </section>
<?php
 if ( get_header_image() ) : ?>
	<div id="site-header">
		
			<img src="<?php header_image(); ?>" width="<?php echo absint( get_custom_header()->width ); ?>" height="<?php echo absint( get_custom_header()->height ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">
		
	</div>
<?php endif; 


}
?>
</nav>