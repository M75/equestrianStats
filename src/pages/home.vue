<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large>
      <f7-nav-title>إحصاء اسطبلات الخيل بالجنادرية</f7-nav-title>
      <f7-nav-title-large>إحصاء اسطبلات الخيل</f7-nav-title-large>
    </f7-navbar>
    <!-- Page content-->

    <f7-block style="background-color: #298800; text-align: center">
      <img src="/img/equestrian_logo.png" style="width: 100%; max-width: 400px">
    </f7-block>

    <f7-block v-if="state.username !== 'ضيف'">
      <f7-button
          @click="logout_now"
      >
        مرحباً {{ state.username }}
      </f7-button>
    </f7-block>
    <f7-block v-if="state.records">
      <f7-block inset strong>
        <f7-block-title>إحصائيات</f7-block-title>
        <f7-list>
          <f7-list-item>
            <f7-list-item :title="`خيول السباق: ${sum_s1}`"/>
            <f7-list-item :title="`الرمك: ${sum_s2}`"/>
            <f7-list-item :title="`الأمهار: ${sum_s3}`"/>
          </f7-list-item>
          <f7-list-item>
            <f7-list-item :title="`الترفيهي: ${sum_s4}`"/>
            <f7-list-item :title="`القفز: ${sum_s5}`"/>
            <f7-list-item :title="`مدرسة: ${sum_s6}`"/>
          </f7-list-item>
          <f7-list-item>
            <f7-list-item :title="`جمال: ${sum_s7}`"/>
            <f7-list-item :title="`تحمل: ${sum_s8}`"/>
            <f7-list-item :title="`شعبي: ${sum_s9}`"/>
          </f7-list-item>
        </f7-list>
      </f7-block>
      <f7-block-title>قائمة العقود</f7-block-title>
      <f7-list>
        <f7-list-item
            v-for="i in state.records"
            :title="`${i.contract} - ${i.owner}`"
            :link="`/view/${i.contract}`"
        >
          <template #media>
            <f7-icon md="material:description" ios="material:description"/>
          </template>
          <template #after>
            <f7-button
            >
            </f7-button>
          </template>
        </f7-list-item>

        <f7-list-item
            title="إضافة جديد"
            link="/add_new"
        >
          <template #media>
            <f7-icon md="material:add_circle"></f7-icon>
          </template>
        </f7-list-item>

      </f7-list>
    </f7-block>

  </f7-page>
</template>

<script setup>

import {computed, onMounted, reactive} from "vue";
import {f7} from "framework7-vue";
import {check_login, getAllRecords, logout, seed} from "@/js/custom_functions";

// state : المتغيرات اللي يتغيرن خلال العرض باستمرار
let state = reactive({
  records: [], // هنا بنسجل عليه قائمة الاسطبلات اول ماتتحمل الصفحة
  username: "ضيف",
})


let sum_s1 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s1 / 1
  return total
})

let sum_s2 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s2 / 1
  return total
})


let sum_s3 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s3 / 1
  return total
})


let sum_s4 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s4 / 1
  return total
})


let sum_s5 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s5 / 1
  return total
})


let sum_s6 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s6 / 1
  return total
})


let sum_s7 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s7 / 1
  return total
})


let sum_s8 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s8 / 1
  return total
})


let sum_s9 = computed(() => {
  let total = 0
  for (let i of state.records)
    total += i.s9 / 1
  return total
})


let logout_now = () => {
  f7.dialog.confirm("هل تريد تسجيل الخروج؟", "", () => {
    logout(f7)
  })
}

// هنا بينفذ الكود أول ماتتحمل الصفحة
onMounted(() => {
  // هنا بينفذ الكود أول ماتتحمل الصفحة
  state.username = check_login(f7) || "ضيف"

  // window.login_name = "M7ammad"
  let previous_records = getAllRecords()
  if (!previous_records.length) {
    setTimeout(() => {
      f7.dialog.confirm("لايوجد سجلات هل تريد ادخال بيانات غير حقيقية؟", "", () => {
        previous_records = seed() // اذا ماعندنا ريكوردات عطنا شي وهمي
        state.records = previous_records
      })
    }, 500)
  }

  state.records = previous_records
})
</script>
