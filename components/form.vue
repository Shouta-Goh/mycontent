
<template>
  <div>
    <v-card class="elevation-6 card-style">
      <v-container tag="section">
        <h2>Contact</h2>
        <p>
          何か気になることがありましたら
          <br />お気軽にお問い合わせください
        </p>
        <v-form method="post" netlify name="contact">
          <v-text-field v-show="false" v-model="title" name="form-name" />
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="name" label="name" name="name" autofocus />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="email" label="E-mail" name="email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="message" label="message" name="message" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn :disabled="isEmpty" type="submit">submit</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "contact",
      name: "",
      email: "",
      message: ""
    };
  },
  computed: {
    isEmpty() {
      if (this.name !== "" && this.email !== "" && this.message !== "") {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
.card-style {
  text-align: center;
}

h2 {
  position: relative;
  display: inline-block;
  padding: 0 55px;
  margin: 8px;
}

h2:before,
h2:after {
  content: "";
  position: absolute;
  top: 50%;
  display: inline-block;
  width: 45px;
  height: 1px;
  background-color: black;
}

h2:before {
  left: 0;
}
h2:after {
  right: 0;
}
</style>