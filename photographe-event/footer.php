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
            <h1>Contact</h1>
        <?php echo do_shortcode('[contact-form-7 id="dfd2a6f" title="Contact form 1"]'); ?>
        </div>
    </div>
    </footer>


<?php wp_footer() ?>
</body>
</html>