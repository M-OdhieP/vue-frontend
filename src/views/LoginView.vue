<template>
  <div class="login bg-dark">
    <div class="card m-0 mx-auto">
      <div class="card-header text-center">
        <h5> Login Page</h5>
      </div>
      <div class="card-body">
        <div class="container">

          <form @submit.prevent="onSubmit">
            <div class="form-group mb-3">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" />
            </div>
            <div class="form-group mb-3">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" />
            </div>
            <button type="submit" class=" btn btn-sm btn-primary my-2 float-end">Login</button>
          </form>
        </div>
      </div>
    </div>
    <div class="card mx-auto mt-2">
      <div class="card-body text-center">
        <a href="https://m-odhiep.github.io" class="fw-bold"> Muhamad Odhie Prasetio </a>- test Fullstack Developer <br>
        <a href="https://github.com/M-OdhieP/laravel-passport-vue" class="fw-bold">Laravel Passport Backend</a> <br>

        <a href="https://github.com/M-OdhieP/vue-frontend" class="fw-bold"> VueJS Frontend</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // handle success
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);

            console.log(response.data);
            this.$router.push({ name: 'dashboard' })
          } else {
            console.log(response.data)
          };
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>

<style>
.login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card {
  min-width: 35vw;
}
</style>