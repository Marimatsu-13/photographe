<footer>
    <?php
    
    wp_nav_menu([
        'theme_location' => 'footer',
        'container' => false,
    ]);
    ?>
    
    <div class="modal2">
        <div class="modal-content2">
            <span class="close2">&times;</span>
            <img src="<?php echo get_template_directory_uri() . '/images/Contact-header.png'; ?> " alt="Contact" class="header-contact">
        <?php echo do_shortcode('[contact-form-7 id="6b6aa5c" title="Contact form 1_copy"]'); ?>
        </div>
    </div>
    </footer>
    <?php 
 // Requête pour récupérer des publications de type 'photo'
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 12,
        'paged' => 1,);
 $my_query = new WP_Query($args);

// Vérifie si la requête a des posts
if ($my_query->have_posts()) : ?>
<div class= "publication-list">
<?php
// on parcours touts les posts
    while ($my_query->have_posts()) : $my_query->the_post();
   // Récupère et affiche le lien de la publication
    $url= get_permalink(get_the_ID());
    ?>
   <div class= "lightbox_category_ref hidden">
        <div class= "lightbox_category">
           <?php
           // on Récupère et affiche la catégorie de la photo
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
             // on Récupère  le lien de la photo pour le zoom
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