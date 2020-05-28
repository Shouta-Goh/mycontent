
<template>
  <div>
    <v-card class="elevation-6 card-style">
      <v-container>
        <h2>Contact</h2>
        <p>何か気になることがありましたら<br>
          お気軽にお問い合わせください
        </p>

        <v-form
          ref="form"
          lazy-validation
          method="post"
          name="contact"
          data-netlify-honeypot="bot-field"
          netlify
        >
          <v-text-field v-show="false" v-model="contact" name="form-name" />
          <v-text-field
            v-model="contactForm.name"
            :rules="contactFormValidation.nameRules"
            label="名前"
            required
          ></v-text-field>

          <v-text-field
            v-model="contactForm.email"
            :rules="contactFormValidation.emailRules"
            label="メールアドレス"
            required
          ></v-text-field>

          <v-textarea
            v-model="contactForm.contents"
            :rules="contactFormValidation.contentsRules"
            label="内容"
            required
          ></v-textarea>

          <v-btn
            :loading="contactForm.loading"
            :disabled="!contactFormValidation.valid"
            type="submit"
            block
            large
            color="info"
            class="mt-4 font-weight-bold"
          >送信</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    contactForm: {
      name: "",
      contents: "",
      email: "",
      loading: false
    },
    contactFormValidation: {
      valid: false,
      nameRules: [v => !!v || "名前は必須項目です"],
      emailRules: [
        v => !!v || "メールアドレスは必須項目です",
        v => /.+@.+\..+/.test(v) || "メールアドレスを正しく入力してください"
      ],
      contentsRules: [v => !!v || "内容は必須項目です"]
    },
    snackBar: {
      show: false,
      color: "",
      message: ""
    }
  })
};
</script>

<style scoped>
.card-style{
  text-align: center;

}

h2 {
  position: relative;
  display: inline-block;
  padding: 0 55px;
  margin: 8px;
}

h2:before, h2:after {
  content: '';
  position: absolute;
  top: 50%;
  display: inline-block;
  width: 45px;
  height: 1px;
  background-color: black;
}

h2:before {
  left:0;
}
h2:after {
  right: 0;
}
</style>