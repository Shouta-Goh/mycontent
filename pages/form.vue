<template>
  <formTemp class="form" style></formTemp>
</template>
<script>
import formTemp from "~/components/form";

export default {
  components: {
    formTemp
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 60%;
  margin: 50px auto;
}

@media screen and (max-width: 600px) {
  .form {
    width: 90%;
  }
}
</style>