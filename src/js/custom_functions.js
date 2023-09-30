import {f7} from "framework7-vue";

export function getAllRecords() {
    let storage = localStorage.getItem("records")
    if(!storage)
        return []
    else
        return JSON.parse(storage)
}

export function getRecord(contract_id) {
    let records = getAllRecords()
    for(let single of records)
        if(single.contract === contract_id)
            return single

    // اذا وصلنا هنا يعني مالقينا العقد
    return false
}

export function addRecord(row) {
    let records = getAllRecords()
    // Check if not previously available
    for(let single_record of records) {
        if(row.contract === single_record.contract)
            return false // Do not add record, because it is duplicate
    }

    // Now add the record
    records.push(row)
    localStorage.setItem("records", JSON.stringify(records))
    return true
}

export function deleteRecord(contract_id) {
    let records = getAllRecords()
    // Check if not previously available
    let new_list = []
    for(let single_record of records) {
        if(contract_id !== single_record.contract)
            new_list.push(single_record)
    }

    localStorage.setItem("records", JSON.stringify(new_list))
    return new_list
}


export function check_login(f7) {
    if(!window.login_name) {
        let check = localStorage.getItem("username")
        if(check) {
            window.login_name = check
            return check
        }
        else
        {
            setTimeout(() => {
                f7.dialog.prompt("ادخل اسم المراقب كتسجيل دخول", "", (val) => {
                    window.login_name = val
                    localStorage.setItem("username", val)
                    window.location.reload()
                }, () => {
                    window.login_name = "Guest"
                }, "")
            }, 300)

        }
    }
}

export function logout(f7) {
    window.login_name = null
    localStorage.removeItem("username")
    f7.views.main.router.refreshPage()
}

// فنكشن يسوي لنا بيانات وهمية
export function seed() {
    console.log(`Seeding`)
   addRecord({
       piece: 1,
       contract: "13482",
       owner: "محمد عبدالله ابراهيم",
       dateTime: "2023-09-30 02:11:00",
       s1: 2, // سباق
       s2: 0, // رمك
       s3: 0, // الأمهار
       s4: 0, // ترفيهي
       s5: 1, // قفز
       s6: 0, // مدرسة
       s7: 0, // جمال
       s8: 0, // تحمل
       s9: 1, // شعبي
       comments: null,
       supervisor: window.login_name
   })
   addRecord({
       piece: 1,
       contract: "440154",
       owner: "خالد عبدالعزيز سعود",
       dateTime: "2023-09-30 02:11:00",
       s1: 2, // سباق
       s2: 0, // رمك
       s3: 6, // الأمهار
       s4: 0, // ترفيهي
       s5: 1, // قفز
       s6: 0, // مدرسة
       s7: 2, // جمال
       s8: 0, // تحمل
       s9: 0, // شعبي
       comments: null,
       supervisor: window.login_name
   })
   addRecord({
       piece: 1,
       contract: "884528",
       owner: "عبدالله بنيدر",
       dateTime: "2023-09-30 02:11:00",
       s1: 0, // سباق
       s2: 0, // رمك
       s3: 0, // الأمهار
       s4: 0, // ترفيهي
       s5: 0, // قفز
       s6: 0, // مدرسة
       s7: 0, // جمال
       s8: 0, // تحمل
       s9: 0, // شعبي
       comments: "مشاركة للترويح عن النفس",
       supervisor: window.login_name
   })
   addRecord({
       piece: 1,
       contract: "77752",
       owner: "احمد بن فهد بن ناصر",
       dateTime: "2023-09-30 02:11:00",
       s1: 2, // سباق
       s2: 0, // رمك
       s3: 0, // الأمهار
       s4: 0, // ترفيهي
       s5: 0, // قفز
       s6: 8, // مدرسة
       s7: 3, // جمال
       s8: 3, // تحمل
       s9: 1, // شعبي
       comments: null,
       supervisor: window.login_name
   })

    return getAllRecords()
}
