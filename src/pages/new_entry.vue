<template>
  <f7-page>
    <f7-navbar back-link="رجوع" title="إضافة بيانات اسطبل"></f7-navbar>

    <f7-block strong inset>
      <f7-block-title>
        معلومات الاسطبل
      </f7-block-title>

      <f7-list>
        <f7-list-item>
          <f7-list-input
              label="رقم القطعة"
              type="number"
              v-model:value="state.row.piece"
          >
          </f7-list-input>

          <f7-list-input
              label="رقم العقد"
              type="number"
              v-model:value="state.row.contract"
          >
          </f7-list-input>
        </f7-list-item>

        <f7-list-item>
          <f7-list-input
              label="المالك"
              type="text"
              v-model:value="state.row.owner"
          >
          </f7-list-input>

          <f7-list-input
              label="تاريخ الزيارة"
              type="datepicker"
              :calendar-params="{closeOnSelect: true}"
              v-model:value="state.row.dateTime"
          >
          </f7-list-input>
        </f7-list-item>

      </f7-list>
    </f7-block>

    <f7-block inset strong>
      <f7-block-title>بيان الخيل</f7-block-title>
      <f7-list>
        <f7-list-item>
        <f7-list-input
            label="سباق"
            type="number"
            v-model:value="state.row.s1"
        ></f7-list-input>
        <f7-list-input
            label="رمك"
            type="number"
            v-model:value="state.row.s2"
        ></f7-list-input>
        <f7-list-input
            label="الأمهار"
            type="number"
            v-model:value="state.row.s3"
        ></f7-list-input>
        </f7-list-item>

        <f7-list-item>
        <f7-list-input
            label="ترفيهي"
            type="number"
            v-model:value="state.row.s4"
        ></f7-list-input>
        <f7-list-input
            label="قفز"
            type="number"
            v-model:value="state.row.s5"
        ></f7-list-input>
        <f7-list-input
            label="مدرسة"
            type="number"
            v-model:value="state.row.s6"
        ></f7-list-input>
        </f7-list-item>

        <f7-list-item>
        <f7-list-input
            label="جمال"
            type="number"
            v-model:value="state.row.s7"
        ></f7-list-input>
        <f7-list-input
            label="تحمل"
            type="number"
            v-model:value="state.row.s8"
        ></f7-list-input>
        <f7-list-input
            label="شعبي"
            type="number"
            v-model:value="state.row.s9"
        ></f7-list-input>
        </f7-list-item>
      </f7-list>
    </f7-block>

    <f7-button
        style="max-width: 400px; margin: 0 auto"
      @click="submit_form"
      raised
        outline
      >اعتمد المدخلات</f7-button>
  </f7-page>
</template>

<script setup>
import {reactive} from "vue";
import {addRecord} from "@/js/custom_functions";
import {f7} from "framework7-vue";
Date.prototype.ymd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
    (mm>9 ? '' : '0') + mm,
    (dd>9 ? '' : '0') + dd
  ].join('-');
};

let state = reactive({
  row: {
    piece: 1,
    contract: "0",
    owner: "",
    dateTime: [],
    s1: 0, // سباق
    s2: 0, // رمك
    s3: 0, // الأمهار
    s4: 0, // ترفيهي
    s5: 0, // قفز
    s6: 0, // مدرسة
    s7: 0, // جمال
    s8: 0, // تحمل
    s9: 0, // شعبي
    comments: null,
    supervisor: window.login_name
  }
})

let submit_form = () => {
  if(!state.row.dateTime.length)
    return f7.dialog.alert("الرجاء اختيار تاريخ الزيارة", "")

  if(!state.row.owner.length)
    return f7.dialog.alert("الرجاء كتابة اسم المالك", "")

  if(!state.row.contract && state.row.contract!=0)
    return f7.dialog.alert("الرجاء كتابة رقم العقد", "")


  let dup = state.row
  console.log(dup)
  dup.dateTime = dup.dateTime[0].ymd()
  let check = addRecord(dup)
  if(!check)
    f7.dialog.alert("العقد مضاف مسبقاً")
  else {
    f7.views.main.router.navigate("/")
  }

}
</script>
