export default class Product {
    constructor(target, product, userSelectInfo) {
        this.target = target;
        this.product = product;
        this.userSelectInfo = userSelectInfo;
    }

    template(idx) {
        const li = document.createElement('li');
        li.id = this.product._id;
        if (idx % 2 === 0) {
            li.classList.add('items', 'even');
        } else {
            li.classList.add('items');
        }
        li.innerHTML = `
          <div class="infoWrap">
                <input type="checkbox" class="select-btn"/>
                <div class="cartSection">
                    <img src=${this.product.img} alt="" class="itemImg" />
                    <h3>${this.product.productName}</h3>
                    <p><input type="text" class="qty" placeholder=${
                        this.userSelectInfo.quantity
                    } />x ${this.product.price}</p>
                    <p class="stockStatus">In Stock</p>
                </div>
                <div class="prodTotal cartSection">
                    <p class="prod-total-text">${
                        this.product.price * this.userSelectInfo.quantity
                    }</p>
                </div>
                <div class="cartSection remove-btn">
                    <a href="#" class="remove">x</a>
                </div>
          </div>
      `;
        this.setEvent(li);
        return li;
    }

    setEvent(elem) {
        elem.querySelector('.select-btn').addEventListener(
            'change',
            this.select.bind(this),
        );
        elem.querySelector('.qty').addEventListener(
            'input',
            this.update.bind(this),
        );
        elem.querySelector('.remove-btn').addEventListener(
            'click',
            this.del.bind(this),
        );
    }

    select() {
        const quantity = document.getElementById('quantity');
        const subTotal = document.getElementById('subtotal');
        const total = document.getElementById('total');
        const input = document
            .getElementById(this.product._id)
            .querySelector('.select-btn');

        if (input.checked) {
            quantity.innerText =
                parseInt(quantity.innerText) + this.userSelectInfo.quantity;
            subTotal.innerText =
                parseInt(subTotal.innerText) +
                this.userSelectInfo.quantity * this.product.price;
            total.innerText =
                parseInt(total.innerText) +
                this.userSelectInfo.quantity * this.product.price;
        } else {
            quantity.innerText =
                parseInt(quantity.innerText) - this.userSelectInfo.quantity;
            subTotal.innerText =
                parseInt(subTotal.innerText) -
                this.userSelectInfo.quantity * this.product.price;
            total.innerText =
                parseInt(total.innerText) -
                this.userSelectInfo.quantity * this.product.price;
        }
    }

    update(e) {
        e.target.placeholder = e.target.value;
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newQty = parseInt(e.target.value) || 0;
        const oldQty = parseInt(this.userSelectInfo.quantity);
        cart[this.product._id].quantity = newQty;
        this.userSelectInfo.quantity = newQty;

        localStorage.setItem('cart', JSON.stringify(cart));
        const prodTotal = document
            .getElementById(this.product._id)
            .querySelector('.prod-total-text');
        prodTotal.innerText = newQty * this.product.price;

        const quantity = document.getElementById('quantity');
        const subTotal = document.getElementById('subtotal');
        const total = document.getElementById('total');
        const input = document
            .getElementById(this.product._id)
            .querySelector('.select-btn');

        if (input.checked) {
            if (newQty > oldQty) {
                quantity.innerText =
                    parseInt(quantity.innerText) + (newQty - oldQty);
                subTotal.innerText =
                    parseInt(subTotal.innerText) +
                    this.product.price * (newQty - oldQty);
                total.innerText =
                    parseInt(total.innerText) +
                    this.product.price * (newQty - oldQty);
            } else {
                quantity.innerText =
                    parseInt(quantity.innerText) - (oldQty - newQty);
                subTotal.innerText =
                    parseInt(subTotal.innerText) -
                    this.product.price * (oldQty - newQty);
                total.innerText =
                    parseInt(total.innerText) -
                    this.product.price * (oldQty - newQty);
            }
        }
    }

    del() {
        const quantity = document.getElementById('quantity');
        const subTotal = document.getElementById('subtotal');
        const total = document.getElementById('total');
        const input = document
            .getElementById(this.product._id)
            .querySelector('.select-btn');
        if (input.checked) {
            quantity.innerText =
                parseInt(quantity.innerText) - this.userSelectInfo.quantity;
            subTotal.innerText =
                parseInt(subTotal.innerText) -
                this.userSelectInfo.quantity * this.product.price;
            total.innerText =
                parseInt(total.innerText) -
                this.userSelectInfo.quantity * this.product.price;
        }
        const cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[this.product._id];
        localStorage.setItem('cart', JSON.stringify(cart));
        this.target.removeChild(document.getElementById(this.product._id));
    }
}
