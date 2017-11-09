<style>
  body {
    padding-top: 60px;
    padding-bottom: 60px;
  }
</style>

<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-expand-xl navbar-dark bg-info fixed-top">
      <!-- Table of Goods -->
      <a class="navbar-brand" href="javascript:void(0)">Table of Goods</a>
      <div class="navbar-collapse collapse" id="navbarNav">
        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click="create()"><i class="fa fa-plus" aria-hidden="true"></i> Добавить</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click="reset()"><i class="fa fa-refresh" aria-hidden="true"></i> Сброс</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
  import EventBus from '@/eventBus'

  export default {
    name: 'app',
    methods: {
      create () {
        EventBus.$emit('create-data')
      },
      reset () {
        EventBus.$emit('reset-data')
      }
    }
  }
</script>

