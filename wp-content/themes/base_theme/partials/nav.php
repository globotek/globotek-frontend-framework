<nav id="main-menu" class="site-head__nav js-toggle__target">

    <?php
    /**
     * In this section, we're going to take the menus created in the admin area
     * and feed each item into the markup. We need to process the menus as to split
     * them into parent and child menu items so they can be arranged accordingly.
     *
     *
     * First, we get all available menus based on what's stipulated in functions.php
     * so that we're not reliant on what the menu has been called by the user in the
     * admin area.
     */
    $menu_locations = get_nav_menu_locations();

    /** Select the menu we want for current location, in this case, header so main.*/
    $menu_id = $menu_locations['main'];

    /** Get all the menu items for the chosen menu.*/
    $menu_items = wp_get_nav_menu_items($menu_id);

    /** Apply WP classes to menu items.*/
    _wp_menu_item_classes_by_context($menu_items);

    $parent_array = array();
    $child_array = array();
    $grandchild_array = array();

    /**
     * We need to split the menu items into their respective parent and child denotions.
     * To do this, we loop over all the menu item and take the ID and parent ID of the
     * menu item. Parent's will always have parent ID of 0 so we use that to determine if
     * it's a parent menu item and drop it into the parent array. If the parent ID is more
     * than 0, it's a child item so it gets dropped in the child array. We use the child's
     * parent ID as a key so we can group all child items together in one array which we can
     * query easily using the parent ID, as the children are to be attached to the parent.
     */
    foreach ($menu_items as $link) {

        $link_id = $link->ID;
        $parent_id = intval($link->menu_item_parent);

        if ($parent_id == 0) {

            $parent_array[] = $link_id;

        }

        if ($parent_id > 0) {

            if (in_array($parent_id, $parent_array)) {

                $child_array[$parent_id][] = $link_id;

            } else {

                $grandchild_array[$parent_id][] = $link_id;

            }

        }

    }


    /** Now we have separated parent items from child items, we can construct the markup.*/
    echo '<ol class="site-head__nav__inner">';

    /** Loop over all menu items again, as to build the lists.*/
    foreach ($menu_items as $link) {

        $link_id = $link->ID;
        $parent_id = $link->menu_item_parent;
        $sub_menu_class = '';


        /**
         * We check if the menu item ID exists as a key in the child array. If it does, it has
         * child items associated with it.
         */
        if (!empty($child_array) && array_key_exists($link_id, $child_array)) {

            /**
             * As we've separated items with submenus from those that don't, we can now output
             * the necessary submenu markup independently from those with no submenu.
             */
            echo '<li class="site-head__nav__item menu-item-has-children js-toggle__target' . implode(' ', $link->classes) . '" data-elem-class="class-attribute">';
            echo '<a href="#' . strtolower(str_replace(' ', '-', $link->title)) . '" class="js-toggle__trigger">' . $link->title . '<span class="site-head__nav__item__arrow"><i class="fas fa-chevron-down"></i></span></a>';

            $grandchild_keys = $child_array[$link_id];

            foreach ($grandchild_keys as $key) {

                if (in_array($key, array_keys($grandchild_array))) {

                    $sub_menu_class = 'sub-menu-has-sub-menu';

                }

            }

            echo '<ul id="' . strtolower(str_replace(' ', '-', $link->title)) . '" class="js-toggle__target sub-menu ' . $sub_menu_class . '">';

            /**
             * We have the IDs of child items stored but no data so we need to loop over
             * all the menu items again, in order to get the data for each menu item ID.
             * Due to previously using the parent ID as the key for each set of child items
             * we can easily pick the array of child item IDs we want to look at, thus linking
             * them to the correct parent ID in the markup.
             */
            foreach ($child_array[$link_id] as $sub_link_id) {

                /**
                 * Check to see if this 2nd tier menu item has children of its own and thus,
                 * needs to output a grandchildren menu. If it matches yes, run a sub-routine
                 * specific to 3 tier menu items.
                 */
                if (array_key_exists($sub_link_id, $grandchild_array)) {

                    foreach ($menu_items as $sub_link) {

                        if ($sub_link->ID == $sub_link_id) {

                            echo '<li class="' . implode(' ', $sub_link->classes) . ' menu-item-has-children">';
                            echo '<a href="' . $sub_link->url . '" class="title-menu-item">' . $sub_link->title . '</a>';

                            echo '<ul class="sub-sub-menu">';

                            foreach ($grandchild_array[$sub_link_id] as $sub_sub_link_id) {

                                foreach ($menu_items as $sub_sub_link) {

                                    if ($sub_sub_link->ID == $sub_sub_link_id) {

                                        echo '<li class="' . implode(' ', $sub_sub_link->classes) . '">';
                                        echo '<a href="' . $sub_sub_link->url . '">' . $sub_sub_link->title . '</a>';
                                        echo '</li>';

                                    }

                                }

                            }

                            echo '</ul>';

                            echo '</li>';
                        }

                    }

                } else {

                    /**
                     * Fail side of check simply outputs second tier menu items with no sub sub-menu.
                     */
                    foreach ($menu_items as $sub_link) {

                        /**
                         * As we iterate, we check to see if the child ID matches the menu item ID
                         * and if it does, we output a list item and feed in appropriate data.
                         */
                        if ($sub_link->ID == $sub_link_id) {

                            echo '<li class="' . implode(' ', $sub_link->classes) . '">';
                            echo '<a href="' . $sub_link->url . '">' . $sub_link->title . '</a>';
                            echo '</li>';

                        }

                    }

                }

            }

            echo '</ul>';
            echo '</li>';

        } elseif ($link->menu_item_parent == 0) {

            echo '<li class="site-head__nav__item ' . implode(' ', $link->classes) . '">';

            echo '<a href="' . $link->url . '">' . $link->title . '</a>';

            echo '</li>';

        }
    }

    echo '</ol>';
    /** End menu markup creation.*/
    ?>

</nav>

<div class="site-head__burger">

	<a href="#main-menu" class="site-head__burger--close js-toggle__trigger">

		<i class="fa fa-times" aria-hidden="true"></i>

	</a>

	<a href="#main-menu" class="site-head__burger--open js-toggle__trigger">

		<i class="fa fa-bars" aria-hidden="true"></i>

	</a>

</div>
