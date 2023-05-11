var db = openDatabase('Students', '1.0', 'Test DB', 2 * 1024 * 1024);

function regist(){
    let fio = document.iform.fio.value;
    let phone = document.iform.phone.value;
    let email = document.iform.email.value;
    let age = document.iform.num.value;
    let neme = document.iform.stud.value;
    let gender = document.iform.gender.value;
    let know = document.iform.from.value;
    insertData(db, fio, phone, email, age, neme, gender, know);
    return true;
}
dateView(db);

// Создание таблицы
function createTable(db) { 
    db.transaction(function (t) { 
        t.executeSql("CREATE TABLE STUDENTS(fio TEXT, phone TEXT, email TEXT, age TEXT, neme TEXT, gender TEXT, know TEXT)", []); 
    });
}
createTable(db);
// Заполнение бд
function insertData(db, fio, phone, email, age, neme, gender, know) {
    db.transaction(function (e) { 
        e.executeSql("INSERT INTO STUDENTS(fio, phone, email, age, neme, gender, know) VALUES (?, ?, ?, ?, ?, ?, ?)", [fio, phone, email, age, neme, gender, know]); 
    }); 
}

// Вывод данных
function dateView(db){
    let table = document.getElementById('tbody');
    db.transaction(function (t) { 
        t.executeSql("SELECT * FROM STUDENTS", [], 
        function (tran, r) {
            for (let i = 0; i < r.rows.length; i++) {
                var fio = r.rows.item(i).fio;
                var phone = r.rows.item(i).phone;
                var email = r.rows.item(i).email;
                var age = r.rows.item(i).age;
                var neme = r.rows.item(i).neme;
                var gender = r.rows.item(i).gender;
                var know = r.rows.item(i).know;
                table.innerHTML += `<tr><td>${neme}</td><td>${age}</td><td>${gender}</td><td>${know}</td></tr>`;
            }
        }
        );
    });
}
function deleteDate(db){
    let conf = confirm('Удалить?');
    if(conf){
        db.transaction(function (t) 
        {	
            t.executeSql('DROP TABLE STUDENTS',[], OK());
        });
    }
}
function OK(){
    window.location.reload();
}