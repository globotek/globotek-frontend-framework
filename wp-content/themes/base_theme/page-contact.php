<?php
/*
  * Template Name: Contact & About
  */

get_header();
the_post(); ?>

<div class="wrapper">

	<div class="grid grid--halves">

		<div class="content">

            <?php the_content(); ?>

		</div>

		<div class="">
            <?php gravity_form( 1, FALSE, false, false, null, true ); ?>

			<form class="form" method="post">

				<div class="form__group">

					<label class="form__label">First Name</label>

					<input type="text" class="form__input"/>

				</div>

				<div class="form__group">

					<label class="form__label">Last Name</label>

					<input type="text" class="form__input"/>

				</div>

				<div class="form__group form__group--inline">

					<label class="form__label">Phone</label>

					<input type="text" class="form__input"/>

				</div>

				<div class="form__group form__group--inline">

					<label class="form__label">Email</label>

					<input type="text" class="form__input"/>

				</div>

				<input class="form__submit button button--positive" type="submit" />

			</form>

		</div>

	</div>

</div>

<?php get_footer(); ?>
