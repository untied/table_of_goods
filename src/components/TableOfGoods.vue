
<style scoped>
  .table .table__goods-total {
    font-weight: normal;
  }
  .create-item {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #eee;
    padding: 20px 20px 0 20px;
  }
  .buttons-row {
    margin-top: 30px;
  }
  .buttons-row .buttons-row__button {
    width: 100px;
  }
</style>

<template>
  <div id="table-of-goods">
    <h3>Канцелярские товары</h3>
    <table class="table" v-if="goodsData.length !== 0">
      <thead class="thead-dark">
        <tr>
          <th scope="col">№</th>
          <th scope="col">Название</th>
          <th scope="col">Количество</th>
          <th scope="col">Цена</th>
          <th scope="col" class="text-center">Корректировка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in goodsData">
          <th scope="row">{{parseInt(index) + 1}}</th>
          <td>{{item.name}}</td>
          <td>{{item.quantity}}</td>
          <td>{{item.price}} руб.</td>
          <td class="text-center">
            <a href="javascript:void(0)" class="text-success" @click="modifyItem(item.id)" title="Редактировать"><i class="fa fa-lg fa-file-text" aria-hidden="true"></i></a>
            <a href="javascript:void(0)" class="text-danger" @click="removeItem(item.id)" title="Удалить"><i class="fa fa-lg fa-times" aria-hidden="true"></i></a>
          </td>
        </tr>
      </tbody>
      <thead class="thead-light">
        <tr>
          <th scope="row" colspan="3" class="text-right">Итого:</th>
          <th colspan="2" class="table__goods-total">{{goodsTotal}} руб.</th>
        </tr>
      </thead>
    </table>
    <div class="alert alert-danger" role="alert" v-if="goodsData.length === 0">
      В данный момент нет данных для отображения.
      Но вы можете <a href="javascript:void(0)" class="alert-link" @click="createItem()">добавить</a> их или <a href="javascript:void(0)" class="alert-link" @click="resetData()">восстановить</a> начальные данные!
    </div>
    <div class="create-item" v-show="formShown">
      <form>
        <div class="form-group row">
          <label for="inputGoodsName" class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-form-label">Название</label>
          <div class="col-xs-6 col-sm-6 col-md-9 col-lg-9 col-xl-9">
            <input type="text" class="form-control" id="inputGoodsName" placeholder="Введите название товара" v-model="theItem.name" />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputGoodsQuantity" class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-form-label">Количество</label>
          <div class="col-xs-6 col-sm-6 col-md-9 col-lg-9 col-xl-9">
            <input type="text" class="form-control" id="inputGoodsQuantity" placeholder="Введите количество товара" v-model="theItem.quantity" />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputGoodsPrice" class="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-form-label">Цена (руб.)</label>
          <div class="col-xs-6 col-sm-6 col-md-9 col-lg-9 col-xl-9">
            <input type="text" class="form-control" id="inputGoodsPrice" placeholder="Введите цену товара" v-model="theItem.price" />
          </div>
        </div>
        <div class="form-group row buttons-row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
            <button type="button" class="btn btn-success buttons-row__button" @click="saveItem()">{{ !theItem.id ? 'Добавить' : 'Сохранить' }}</button>
            <button type="button" class="btn btn-secondary buttons-row__button" @click="hideRecordForm()">Отмена</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import mixins from '@/mixins'

  const GOODS_DATA = [ // начальные данные для таблицы
    {
      id: 1,
      name: 'Скрепки канцелярские (уп.)',
      quantity: 20,
      price: 35
    },
    {
      id: 2,
      name: 'Бумага для принтера (уп.)',
      quantity: 14,
      price: 120
    },
    {
      id: 3,
      name: 'Маркеры для бумаги (шт.)',
      quantity: 8,
      price: 85
    },
    {
      id: 4,
      name: 'Стикеры желтые 10х10 (уп.)',
      quantity: 12,
      price: 62
    }
  ]

  export default {
    name: 'TableOfGoods',
    data () {
      return {
        goodsData: [], // список товаров
        formShown: false, // признак показа формы
        theItem: { // модель для создания и редактирования товара
          id: null,
          name: '',
          quantity: '',
          price: ''
        }
      }
    },
    mixins: [mixins.nextId],
    computed: {
      goodsTotal () { // подсчет итоговой суммы
        let total = 0
        $.each(this.goodsData, i => {
          total += this.goodsData[i].price * this.goodsData[i].quantity
        })
        return total
      }
    },
    methods: {
      createItem () { // создание новой записи в таблице
        this.theItem.id = null
        this.theItem.name = ''
        this.theItem.quantity = ''
        this.theItem.price = ''
        this.showRecordForm()
      },
      modifyItem (id) { // редактирование записи в таблице
        let found = false
        $.each(this.goodsData, i => {
          if (this.goodsData[i].id === id) {
            this.theItem.id = this.goodsData[i].id
            this.theItem.name = this.goodsData[i].name
            this.theItem.quantity = this.goodsData[i].quantity
            this.theItem.price = this.goodsData[i].price
            found = true
            return false
          }
        })
        if (found) {
          this.showRecordForm()
        }
      },
      removeItem (id) { // удаление строки из таблицы
        let goodsData = []
        $.each(this.goodsData, i => {
          if (this.goodsData[i].id !== id) {
            goodsData.push(this.goodsData[i])
          }
        })
        this.goodsData = goodsData
      },
      showRecordForm () { // открываем форму для добавления товара
        this.formShown = true
        this.$nextTick(() => {
          $('html, body').animate({ scrollTop: $(document).height() - $(window).height() })
        })
      },
      hideRecordForm () { // скрываем форму для добавления товара
        this.formShown = false
        this.$nextTick(() => {
          $('html, body').animate({ scrollTop: 0 })
        })
      },
      saveItem () { // сохранение новой позиции
        // простая валидация формы
        if (!this.theItem.name) {
          window.alert('Пожалуйста, введите корректное название товара!')
          return
        }
        let quantity = parseInt(this.theItem.quantity)
        if (isNaN(quantity)) {
          window.alert('Пожалуйста, введите корректное количество товара!')
          return
        }
        let price = parseInt(this.theItem.price)
        if (isNaN(price)) {
          window.alert('Пожалуйста, введите корректную цену товара!')
          return
        }

        if (!this.theItem.id) { // добавление нового товара
          // сбор всех идентификаторов товара в хэш
          let goodsData = []
          let idPool = []
          $.each(this.goodsData, i => {
            idPool.push(this.goodsData[i].id)
            goodsData.push(this.goodsData[i])
          })

          // добавляем новую позицию в список
          let id = this.nextId(idPool) // получаем id для нового товара
          goodsData.push({
            id: id,
            name: this.theItem.name,
            quantity: this.theItem.quantity,
            price: this.theItem.price
          })
          this.goodsData = goodsData
        } else { // редактирование товара
          $.each(this.goodsData, i => {
            if (this.goodsData[i].id === this.theItem.id) {
              this.goodsData[i].name = this.theItem.name
              this.goodsData[i].quantity = this.theItem.quantity
              this.goodsData[i].price = this.theItem.price
              return false
            }
          })
        }
        this.hideRecordForm() // прячем форму редактирования товара
      },
      resetData () {
        this.goodsData = $.extend(true, {}, GOODS_DATA) // заполнение текущих данных стартовыми значениями
        this.hideRecordForm() // прячем форму редактирования товара
      }
    },
    beforeMount () {
      // инициализация таблицы стартовыми данными
      this.goodsData = $.extend(true, {}, GOODS_DATA)

      // подписка на события от главного меню
      this.$bus.$on('create-item', () => {
        this.createItem()
      })
      this.$bus.$on('reset-data', () => {
        this.resetData()
      })
    }
  }
</script>
