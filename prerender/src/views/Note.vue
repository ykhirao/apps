<template>
  <div class="note">
    <h1>This is an note page</h1>
    <h2>{{ id }}</h2>
  </div>
</template>
<script>
import axios from "axios";
import marked from "marked";

export default {
  beforeRouteEnter(to, from, next) {
    const id = Number(to.params.id);
    axios.get(`/note/${id}.md`).then(res => {
      console.log(marked(res.data));
      next(vm => {
        vm.content = marked(res.data);
      });
    });
  },
  props: { id: Number },
  created() {
    document.title = `Note:${this.id}`;
  },
  destroyed() {
    document.title = `Default Title`;
  }
};
</script>
