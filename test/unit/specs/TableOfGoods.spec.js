
// Набор unit-тестов для компонента TableOfGoods

import Vue from 'vue'
import TableOfGoods from '@/components/TableOfGoods'

describe('TableOfGoods.vue', () => {
  it('Should contain the correct page header', () => { // тест на корректность заголовка страницы
    const Constructor = Vue.extend(TableOfGoods)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#table-of-goods > h3').textContent).to.equal('Канцелярские товары')
  })

  it('Should contain the correct column headers', () => { // тест на корректность колонок таблицы и их заголовков
    const Constructor = Vue.extend(TableOfGoods)
    const vm = new Constructor().$mount()
    const cols = vm.$el.querySelectorAll('#table-of-goods > table.table > thead.thead-dark th')
    expect(cols.length).to.equal(5) // проверяем число колонок
    expect(cols[0].textContent).to.equal('№') // проверяем каждую колонку на соответствие заголовку
    expect(cols[1].textContent).to.equal('Название')
    expect(cols[2].textContent).to.equal('Количество')
    expect(cols[3].textContent).to.equal('Цена')
    expect(cols[4].textContent).to.equal('Корректировка')
  })

  it('Correctly adds a new item in the table', () => { // тест на корректность добавления новой записи в таблицу
    // тестовое значение для добавления в таблицу
    const NEW_ITEM = {
      ID: 5, // этот идентификатор должен быть присвоен новой записи
      NAME: 'Цветные карандаши (набор)',
      QUANTITY: 20,
      PRICE: 140
    }

    // итоговая сумма до теста и после
    const SUM_TOTAL_BEFORE = 3804
    const SUM_TOTAL_AFTER = SUM_TOTAL_BEFORE + NEW_ITEM.QUANTITY * NEW_ITEM.PRICE

    // создаем компонент TableOfGoods
    const Constructor = Vue.extend(TableOfGoods)
    const vm = new Constructor().$mount()

    // проверяем начальное значение итоговой суммы
    const goodsTotal = vm.$el.querySelector('#table-of-goods > table.table th.table__goods-total')
    expect(goodsTotal.textContent).to.equal(SUM_TOTAL_BEFORE + ' руб.')

    // заполняем данными модель
    vm.theItem.id = null
    vm.theItem.name = NEW_ITEM.NAME
    vm.theItem.quantity = NEW_ITEM.QUANTITY
    vm.theItem.price = NEW_ITEM.PRICE

    // открываем форму
    vm.formShown = true

    // ищем кнопку "Добавить" и проверяем, что она нашлась в единственном числе
    const addButton = vm.$el.querySelectorAll('button.btn-success')
    expect(addButton.length).to.equal(1)

    // нажимаем на кнопку
    const clickEvent = new window.Event('click')
    addButton[0].dispatchEvent(clickEvent)
    vm._watcher.run()

    // проверяем, что новая запись добавилась в таблицу товаров
    const tbody = vm.$el.querySelector('#table-of-goods > table.table > tbody')
    expect(tbody.textContent).to.contain(NEW_ITEM.NAME)

    // проверяем, что новая запись была добавлена в данные компонента
    expect(vm.goodsData).to.deep.contain({
      id: NEW_ITEM.ID,
      name: NEW_ITEM.NAME,
      quantity: NEW_ITEM.QUANTITY,
      price: NEW_ITEM.PRICE
    })

    // проверяем значение итоговой суммы после добавления новой записи
    expect(goodsTotal.textContent).to.equal(SUM_TOTAL_AFTER + ' руб.')
  })
})
