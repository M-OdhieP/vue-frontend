import swal from 'sweetalert2'

export const successSwal = (title, text) => {
  swal.fire({
    icon: 'success',
    title: title,
    text: text,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  })
}
export const errorSwal = (title, text) => {
  swal.fire({
    icon: 'error',
    title: title,
    text: text,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  })
}

export default {
  methods: {
    successSwal,
    errorSwal,
  },
}
