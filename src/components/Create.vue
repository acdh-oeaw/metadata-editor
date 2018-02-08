<template>
    <main class="grid-col" role="main">
      <div class="container">
        <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
          <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
            <nav class="collapse bd-links" id="bd-docs-nav">
              <div class="bd-toc-item active">
                <a class="bd-toc-link" href="#">Documentation</a>
                <ul class="nav bd-sidenav">
                  <li>
                    <a href="../docs/intro.php">Introduction</a>
                  </li>
                  <li>
                    <a href="../docs/quick-start.php">Quick Start</a>
                  </li>
                </ul>
                <a class="bd-toc-link" href="#">Components</a>
                <ul class="nav bd-sidenav">
                  <li class="active bd-sidenav-active">
                    <a href="../docs/cards.php">Cards</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
            <h1><a id="Cards_0"></a>Entities</h1>
            <p>Cards replace Bootstrap 3’s panels, wells, and thumbnails. A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options.</p>
            <Fundamententity></Fundamententity>
            <h3><a id="Basic_Card_2"></a>Basic Card</h3>
            <p>A basic card with a title, body and button:</p>
            <h3><a id="Card_with_Side_Thumbnail_4"></a>Card with Side Thumbnail</h3>
            <p>A card with a title, body, side thumbnail and button:</p>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import Fundamententity from './Fundamententity';

export default {
  components: {
    Fundamententity,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
