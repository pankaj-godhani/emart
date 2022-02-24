<template>
  <div
    class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white "
    @mouseenter="$sidebar.onMouseEnter()"
    @mouseleave="$sidebar.onMouseLeave()"

  >
    <div class="scrollbar-inner bg-gradient" ref="sidebarScrollArea" >
      <div class="sidenav-header d-flex align-items-center" >
        <a class=" " href="/">
          <img src="../../../public/img/e-metro.png" class="img-fluid" style="max-width: 80%; height: auto; padding-left: 15px; margin-top: 10px" alt="Sidebar logo" />
        </a>
        <div class="ml-auto">
          <!-- Sidenav toggler -->
          <div
            class="sidenav-toggler d-none d-xl-block"
            :class="{ active: !$sidebar.isMinimized }"
            @click="minimizeSidebar"
          >
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
      <div class="navbar-inner">
        <ul class="navbar-nav bg-gradient" >
          <slot name="links">
            <sidebar-item
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :link="link"
            >
              <sidebar-item
                v-for="(subLink, index) in link.children"
                :key="subLink.name + index"
                :link="subLink"
              >
              </sidebar-item>
            </sidebar-item>
          </slot>
        </ul>
        <slot name="links-after"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  props: {
    title: {
      type: String,
      default: "Creative Tim",
      description: "Sidebar title",
    },
    shortTitle: {
      type: String,
      default: "CT",
      description: "Sidebar short title",
    },
    logo: {
      type: String,
      default:
        "img/e-metro.png",
      description: "Sidebar app logo",
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these.",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  data(){
    return{}
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
  },
  mounted() {
    this.$sidebar.isMinimized = this.$sidebar.breakpoint < window.innerWidth;
    this.minimizeSidebar();
  },
  beforeUnmount() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>

<style scoped>

element.style {
  background: rgb(244, 177, 96);
}
.navbar-vertical.navbar-expand-xs .navbar-nav {
  flex-direction: column;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}
.bg-gradient{
  background: linear-gradient(
    87deg, #c8883b 0, #e4a85f 100%) !important;
}
</style>
