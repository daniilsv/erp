<template>
  <v-layout column>
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>Создание объекта</span>
    </v-card-title>

    <v-select :items="types" v-model="item.type" label="Основной тип"/>
    <v-text-field v-model="item.title" label="Название"/>
    <v-textarea v-model="item.description" label="Описание"/>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <DateTime v-model="item.timeStart" label="Дата начала" type="datetime"/>
      </v-flex>
      <v-flex xs12 sm6>
        <DateTime v-model="item.timeEnd" label="Дата завершения" type="datetime"/>
      </v-flex>
    </v-layout>
    <v-combobox
      v-model="item.tag"
      :filter="tagFilter"
      :items="tagsList"
      hide-selected
      :hide-no-data="!tagSearch"
      label="Теги"
      :search-input.sync="tagSearch"
      multiple
      small-chips
    >
      <template slot="no-data">
        <v-list-tile>
          <v-list-tile-title>
            Тег не существует "
            <strong>{{ tagSearch }}</strong>". Нажмите
            <kbd>enter</kbd> чтобы создать
          </v-list-tile-title>
        </v-list-tile>
      </template>
    </v-combobox>
    <v-divider/>

    <UserSelect v-model="item.responsible" label="Ответственный"/>

    <UserSelect v-model="item.performer" label="Исполнители" multiple/>
    <UserSelect v-model="item.observer" label="Наблюдатели" multiple/>

    <v-btn color="success" @click="create">Создать</v-btn>
    <v-snackbar v-model="errorSnackbar" color="error">
      {{ errorText }}
      <v-btn dark flat @click="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>


<script>
import createScript from "./default.js";
export default createScript({ type: "project" });
</script>