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

if (!empty($reference)) {
    echo '<p>Référence : ' . esc_html($reference) . '</p>';}
    ?>
<?php
$categorie = get_post_meta(get_the_ID(), 'categories', true);

if (!empty($reference)) {
    echo '<p>Catégorie : ' . esc_html($categorie) . '</p>';}
    ?>


<?php
$format = get_post_meta(get_the_ID(), 'formats', true);

if (!empty($reference)) {
    echo '<p>Format: ' . esc_html($format) . '</p>';}
    ?>
<?php
$type = get_post_meta(get_the_ID(), 'type', true);

if (!empty($reference)) {
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
    the_post_thumbnail('large');} ?>
</div>
</div>
<?php endwhile; ?>
<?php endif; ?>
</div>
<?php get_footer(); ?>