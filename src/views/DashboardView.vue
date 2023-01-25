<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td><a class="btn btn-info" href="">Edit</a> | <a class="btn btn-danger" href="">Delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {


  data() {
    return {
      users: [],
      token: localStorage.getItem('token')
    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/users', {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
      .then(response => {
        this.users = response.data.user

      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

 


