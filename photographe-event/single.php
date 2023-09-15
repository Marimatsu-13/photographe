<div class="hide-header">
<?php get_header(); ?>
</div>
<div class="main single">
<?php if (have_posts()) : ?>
<?php while (have_posts()) : the_post(); ?>
<div class="post">
<div class="bloc-com">
<h1 class="post-title"><?php the_title(); ?></h1>

<?php
$reference = get_post_meta(get_the_ID(), 'reference', true);

if (($reference)) {
 echo "<p>Référence : <span class='ref'>$reference</span></p>";}
    ?>
<?php
$categorie = get_the_term_list(get_the_ID(), 'categorie', 'Catégorie : ');

    if ($categorie) {
        echo '<p>' . $categorie . '</p>';
    }   
    ?>

<?php
$format = get_the_term_list(get_the_ID(), 'format', 'Formats : ');

    if ($format) {
        echo '<p>' . $format . '</p>';
    }  

    ?>
<?php
$type = get_post_meta(get_the_ID(), 'type', true);

if (($reference)) {
    echo '<p>Type : ' . esc_html($type) . '</p>';}
    ?>


<?php
the_date(' Y', '<p>Année : ', '</p>');?>

<div class="post-content">
<?php the_content(); ?>
</div>
</div>
<div class="post-photo">
<?php if (has_post_thumbnail()) {
    the_post_thumbnail('miniature-personnalisee');} ?>
</div>
<div class= "same-cat">
<?php 
$taxonomy = 'categorie';
$term = get_the_terms(get_the_ID(), $taxonomy);

if ($term && !is_wp_error($term)) {
    $term_slug = $term[0]->slug;

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 2,
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $term_slug
            )
        )
    );

    $my_query = new WP_Query($args);

    if ($my_query->have_posts()) : 
        while ($my_query->have_posts()) : $my_query->the_post();
            if (has_post_thumbnail()) {
                the_post_thumbnail('miniature-personnalisee');
            }
        endwhile;
    else:
        echo "Aucun article trouvé.";
    endif;
    wp_reset_postdata();
} else {
    echo "Aucune taxonomie trouvée.";
}
?>
</div>
</div>
<?php endwhile; ?>
<?php endif; ?>
</div>
<?php get_footer(); ?>