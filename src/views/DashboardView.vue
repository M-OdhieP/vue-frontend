<script setup>
import HeaderComponent from '../components/HeaderComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import '../../public/dashboard.css'
</script>

<template>
  <HeaderComponent />

  <div class="container-fluid">
    <div class="row">
      <SidebarComponent />


      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2"> User Management</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <button type="button" class="btn btn-sm btn-outline-secondary" @click="createUser()">
              Add User
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path fill-rule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user.id">

                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <button @click="editUser(user)" class="btn btn-sm btn-info me-1">Edit</button>
                  <button @click="deleteUser(user.id)" class="btn btn-sm btn-danger gap-1">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import { successSwal, errorSwal } from "../components/method/SwalAlert.js";
export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {

      const token = localStorage.getItem('token')
      axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.users = response.data.user
        })
        .catch(error => {

          if (error.message == "Network Error") {
            errorSwal("Error", error.message)
            this.$router.push({ name: 'login' })
          }

          if (error.response.status === 401) {
            this.$router.push({ name: 'login' })
            errorSwal("Unauthorized", "Must Login First!")
          } else {
            console.log(error);
            errorSwal("Error", error.message)
            this.$router.push({ name: 'login' })
          }
        })
    },
    editUser(user) {
      swal.fire({
        title: 'Edit User',
        html: `
          <input id="name" class="swal2-input" placeholder="Name" value="${user.name}" required>
          <input id="email" class="swal2-input" placeholder="Email" value="${user.email}" required>
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value
          }
        }
      }).then(result => {
        if (result.value) {
          axios.put(`http://127.0.0.1:8000/api/users/${user.id}`, {
            name: result.value.name,
            email: result.value.email
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }).then(response => {
            this.fetchUsers()
            successSwal('Success!', 'User has been updated.')
          }).catch(error => {
            errorSwal('Update User Failed', 'Please ensure that the email is unique and in the correct format.')
            console.log(error)
          })
        }
      })
    },
    deleteUser(id) {
      swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }).then(response => {
            this.fetchUsers()
            successSwal('Deleted!', 'The user has been deleted.')

          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    createUser() {
      swal.fire({
        title: 'Create User',
        html: `
          <input id="name" class="swal2-input" placeholder="Name">
          <input id="email" class="swal2-input" placeholder="Email">
          <input id="password" class="swal2-input" type="password" placeholder="password">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Create',
        confirmButtonColor: '#00b894',
        preConfirm: () => {
          return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
          }
        }
      }).then(result => {
        if (result.value) {
          axios.post(`http://127.0.0.1:8000/api/users`, {
            name: result.value.name,
            email: result.value.email,
            password: result.value.password
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }).then(response => {
            this.fetchUsers()
            // console.log(response);
            successSwal('Success!', 'User has been created.')
          }).catch(error => {
            errorSwal('Create User Failed', "Please make sure all fields are filled and the email is unique.")
            console.log(error)
          })
        }
      })
    },

  }
}
</script>
