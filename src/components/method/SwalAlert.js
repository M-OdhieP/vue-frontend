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

export const loadingSwal = (loading) => {
  if (loading) {
    swal.fire({
      html:
        '<div class="d-flex justify-content-center align-items-center" style="height:100px">' +
        '  <div class="spinner-border" role="status"  style="width: 4rem; height: 4rem;" >' +
        '   <span class="visually-hidden">Loading...</span>' +
        ' </div>' +
        '</div>',
      showConfirmButton: false,
    })
  } else {
    swal.close()
  }
}

export default {
  methods: {
    successSwal,
    errorSwal,
    loadingSwal,
  },
}
