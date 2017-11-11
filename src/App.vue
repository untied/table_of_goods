<style>
  body {
    padding-top: 60px;
    padding-bottom: 60px;
  }
</style>

<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-expand-xl navbar-dark bg-info fixed-top">
      <a class="navbar-brand" href="javascript:void(0)" @click="reset()">
        <i class="fa fa-shopping-basket" aria-hidden="true"></i> Table of Goods
      </a>
      <div class="navbar-collapse collapse" id="navbarNav">
        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click="create()"><i class="fa fa-plus fa-lg" aria-hidden="true"></i> Добавить</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click="reset()"><i class="fa fa-refresh fa-lg" aria-hidden="true"></i> Сброс</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      create () {
        this.$bus.$emit('create-item')
      },
      reset () {
        this.$bus.$emit('reset-data')
      }
    }
  }
</script>

