
const productModal = {
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "chingno2004"
        }
    },
    props: ['tempProduct', 'isNew', 'productModal'],
    methods: {
        updateProduct() {
            let api = `${this.url}/api/${this.path}/admin/product`;
            let httpMethod = 'post'
            if (!this.isNew) {
                api = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
                httpMethod = 'put';
            }
            axios[httpMethod](api, { data: this.tempProduct })
                .then((res) => {
                    this.$emit('update-product')
                    this.productModal.hide();
                })
                .catch((error) => {
                    console.log(error);
                    alert("新增／編輯失敗")
                })


        }
    },
    template: ` <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                    <span>新增產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="mb-2">
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                                <input type="text" class="form-control mt-2" id="imageUrl" placeholder="請輸入圖片連結"
                                    v-model="tempProduct.imageUrl">
                                <img class="img-fluid mt-1" :src="tempProduct.imageUrl" alt="">
                            </div>
                        </div>
                        <div class="mb-3">
                            <h3>多圖設置</h3>
                            <div v-if="Array.isArray(tempProduct.imagesUrl)">
                                <template v-for=" (item,key) in tempProduct.imagesUrl" :key="key +'1234'">
                                    <input type="text" class="form-control mb-2" placeholder="請輸入圖片連結"
                                        v-model="tempProduct.imagesUrl[key]">
                                    <img class="img-fluid mb-2" :src="tempProduct.imagesUrl[key]" alt="">
                                </template>
                            </div>
                        </div>
                        <button
                            v-if="!tempProduct.imagesUrl?.length || tempProduct.imagesUrl[tempProduct.imagesUrl?.length - 1]"
                            type="button" class="btn btn-outline-primary btn-sm d-block w-100 mb-1"
                            @click="tempProduct.imagesUrl.push('')">新增圖片</button>

                        <button v-else type="button" class="btn btn-outline-danger btn-sm d-block w-100"
                            @click="tempProduct.imagesUrl.pop('')">刪除最後一張圖片</button>
                    </div>
                    <div class="col-sm-8">
                        <div class="mb-3">
                            <label for="title" class="form-label">標題</label>
                            <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                                v-model="tempProduct.title">
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="category" class="form-label">分類</label>
                                <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                                    v-model="tempProduct.category">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">單位</label>
                                <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                                    v-model="tempProduct.unit">
                            </div>
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="origin_price" class="form-label">原價</label>
                                <input id="origin_price" type="number" min="0" class="form-control"
                                    placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">售價</label>
                                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                                    v-model.number="tempProduct.price">
                            </div>
                        </div>
                        <hr>

                        <div class="mb-3">
                            <label for="description" class="form-label">產品描述</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                                v-model="tempProduct.description">
              </textarea>
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">說明內容</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                                v-model="tempProduct.content">
              </textarea>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input id="is_enabled" class="form-check-input" type="checkbox"
                                    v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-primary" @click="updateProduct">
                    確認
                </button>
            </div>
        </div>
    </div>
</div>`

}

const delProductModal = {
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "chingno2004"
        }
    },
    props: ['temp', 'delProductModal'],
    methods: {
        deleteProduct() {
            this.delProductModal.hide();
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.temp.id}`)
                .then((res) => {
                    this.$emit('delete-product')
                    alert("此產品已成功刪除");
                })
                .catch((error) => {
                    console.log(error);
                    alert("刪除產品失敗")
                })
        },
    },
    template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
    aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="delProductModalLabel" class="modal-title">
                    <span>刪除產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{ temp.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-danger" @click="deleteProduct">
                    確認刪除
                </button>
            </div>
        </div>
    </div>
</div>`
}

export { productModal, delProductModal };
