<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Muhamad Odhie Prasetio</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
                <a href="#" class="nav-link px-3" @click="logout()">Logout</a>
            </div>
        </div>
    </header>
</template>
<script>
import axios from 'axios';
import { errorSwal, successSwal } from "../components/method/SwalAlert.js";
import Swal from 'sweetalert2';
export default {
    methods: {
        async logout() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, logout!'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        await axios.get('http://127.0.0.1:8000/api/users', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
                        localStorage.removeItem('token');
                        this.$router.push({ name: 'login' });
                        successSwal("Logged Out!", "")



                    } catch (error) {
                        console.log(error);
                        errorSwal("Error!", error.message)
                    }
                }
            })
        },
    },
};
</script>



