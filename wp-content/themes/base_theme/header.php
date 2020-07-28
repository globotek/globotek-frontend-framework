<!DOCTYPE html>

<html dir="ltr" lang="en-GB">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1"/>

	<title><?php wp_title(); ?></title>

    <?php if (is_search()): ?>

		<meta name="robots" content="noindex, nofollow"/>

    <?php endif; ?>

    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>


<header class="site-head" data-module="toggle">

	<div class="site-head__inner">

		<a href="<?php echo home_url(); ?>" class="site-head__logo">

            <?php
            $custom_logo_id = get_theme_mod('custom_logo');
            $logo = wp_get_attachment_image_src($custom_logo_id, 'full');

            if (has_custom_logo()) {

                echo '<img src="' . esc_url($logo[0]) . '" alt="' . get_bloginfo('name') . '">';

            } else {

                echo '<h1>' . get_bloginfo('name') . '</h1>';

            } ?>

		</a>

        <?php get_template_part('partials/nav'); ?>

	</div>

</header>

