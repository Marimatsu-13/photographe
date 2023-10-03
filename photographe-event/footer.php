<footer>
    <?php
    global $nbrimgs;
    echo $nbrimgs;
    wp_nav_menu([
        'theme_location' => 'footer',
        'container' => false,
    ]);
    ?>
    
    <div class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="<?php echo get_template_directory_uri() . '/images/Contact-header.png'; ?> " alt="Contact" class="header-contact">
        <?php echo do_shortcode('[contact-form-7 id="dfd2a6f" title="Contact form 1"]'); ?>
        </div>
    </div>
    </footer>
    <?php 
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'paged' => 1,);
 $my_query = new WP_Query($args);

if ($my_query->have_posts()) : ?>
<div class= "publication-list">
<?php
$i = 0;
$urlarray = [];
    while ($my_query->have_posts()) : $my_query->the_post();
    $urlarray = [];
    $url= get_permalink(get_the_ID());

    $urlarray[] = $url;
    $urljson = json_encode($urlarray);

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
<?php endif;
?>


<?php wp_footer() ?>
</body>
</html>