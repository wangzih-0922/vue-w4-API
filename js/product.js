import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import pagination from "./pagination.js";
import { productModal, delProductModal } from './modal.js';


const app = createApp({
    components: {
        pagination,
        productModal,
        delProductModal,

    },
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "chingno2004",
            products: {},
            productModal: "",
            delProductModal: "",
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            },
            pagination: {},
        }
    },
    methods: {
        checkAdmin() {
            axios.post(`${this.url}/api/user/check`)
                .then((res) => {
                    this.getProducts();
                })
                .catch((error) => {
                    alert("登入驗證失敗");
                    window.location = index.html;
                })
        },
        getProducts(page = 1) {  //參數預設值
            axios.get(`${this.url}/api/${this.path}/admin/products/?page=${page}`)
                .then((res) => {
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        openModal(status, item) {
            if (status == 'add') {
                this.tempProduct = {
                    imagesUrl: []
                };
                this.isNew = true;
                this.productModal.show();
            } else if (status === "edit") {
                this.tempProduct = { ...item };
                this.isNew = false;
                this.productModal.show();
            } else if (status === 'delete') {
                this.tempProduct = { ...item };
                this.delProductModal.show();
            }

        },


    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin();

        this.productModal = new bootstrap.Modal(document.querySelector("#productModal"), { Keyboard: false });
        this.delProductModal = new bootstrap.Modal(document.querySelector("#delProductModal"), { Keyboard: false });
    }
})
app.mount("#app");







