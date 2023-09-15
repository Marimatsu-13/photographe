<?php get_header(); ?>
<div class="main page">
<?php if (have_posts()) : ?>
<?php while (have_posts()) : the_post(); ?>
<div class="post">
<div class="post-content">
<?php the_content(); ?>
</div>
<?php the_content(); ?>
<div class='filtre'>
<div class="filter-section">
    <select id="category-select">
        <option value="all">CATEGORIE</option>
    </select>
</div>
<div class="format-section">
    <select id="format-select">
        <option value="all">FORMAT</option>
    </select>
</div>

<div class="date-section">
    <select id="date-select">
        <option value="all">TRIER PAR</option>
    </select>
</div>
</div>
<div class="row">
<?php
$args = array(
    'post_type' => 'photo',
    'posts_per_page' => 12,
);

$my_query = new WP_Query($args);

if ($my_query->have_posts()) : 
    while ($my_query->have_posts()) : $my_query->the_post();
        if (has_post_thumbnail()) {
            the_post_thumbnail('miniature-personnalisee2');
        }
    endwhile;
endif;

wp_reset_postdata();
?>
</div>
<button id="load-more-button">Charger plus</button>
</div>
<?php endwhile; ?>
<?php endif; ?>
</div>
<?php get_footer(); ?>