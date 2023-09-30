<template>
  <f7-page>
    <f7-navbar back-link="رجوع" title="عرض بيان اسطبل">
    </f7-navbar>

    <f7-block v-if="state.record">
      <f7-block-title>
        معلومات الاسطبل
      </f7-block-title>
      <div class="card data-table">
        <table class="table data-table">
          <thead>
          <tr>
            <th>رقم القطعة</th>
            <td>{{ state.record.piece }}</td>
          </tr>
          <tr>
            <th>تاريخ الزيارة</th>
            <td>{{ state.record.dateTime }} - {{ state.dh }}</td>
          </tr>
          <tr>
            <th>المالك</th>
            <td>{{ state.record.owner }}</td>
          </tr>
          <tr>
            <th>رقم العقد</th>
            <td>{{ state.record.contract }}</td>
          </tr>
          </thead>
        </table>
      </div>

      <f7-block-title>بيان الخيل</f7-block-title>
      <div class="card data-table">

        <table class="table data-table" style="overflow: hidden">
          <thead>
          <tr>
            <th>سباق</th>
            <th>رمك</th>
            <th>الأمهار</th>
            <th>ترفيهي</th>
            <th>قفز</th>
            <th>مدرسة</th>
            <th>جمال</th>
            <th>تحمل</th>
            <th>شعبي</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ state.record.s1 }}</td>
            <td>{{ state.record.s2 }}</td>
            <td>{{ state.record.s3 }}</td>
            <td>{{ state.record.s4 }}</td>
            <td>{{ state.record.s5 }}</td>
            <td>{{ state.record.s6 }}</td>
            <td>{{ state.record.s7 }}</td>
            <td>{{ state.record.s8 }}</td>
            <td>{{ state.record.s9 }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="state.record.comments">
        <f7-block-title>ملاحظات اضافية</f7-block-title>
        <f7-block inset>{{ state.record.comments }}</f7-block>
      </div>

      <div>
        <f7-block-title>المراقب</f7-block-title>
        <f7-block inset>{{ state.record.supervisor }}</f7-block>
      </div>


      <f7-button
          @click="delete_this_record"
      >
        حذف السجل
        <f7-icon md="material:delete" ios="material:delete"></f7-icon>
      </f7-button>
    </f7-block>
    <h3 v-else>
      لم يتم العثور على بيانات العقد
    </h3>

  </f7-page>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {deleteRecord, getRecord} from "@/js/custom_functions";
import {f7} from "framework7-vue";

let props = defineProps({
  f7route: Object
})

let state = reactive({
  record: null,
  dh: "", // هذا للتاريخ الهجري بنحول التاريخ بعد مانحمل
})

let delete_this_record = () => {
  f7.dialog.confirm("هل أنت متأكد من حذف السجل؟", "", () => {
    // بعد مايضغط موافق
    deleteRecord(state.record.contract)
    f7.views.main.router.navigate("/", {clearPreviousHistory: true})
  })
}

onMounted(() => {
  state.record = getRecord(props.f7route.params.contract)
  // الان نجيبه بالهجري بعد
  state.dh = new Date(state.record.dateTime).toLocaleDateString('ar-sa', {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
})
</script>
