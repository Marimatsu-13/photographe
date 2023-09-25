<footer>
    <?php
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
    
    
<?php wp_footer() ?>
</body>
</html>