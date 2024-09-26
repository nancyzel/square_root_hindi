// Функция для удаления незначащих нулей

function round(str) {
    ind = str.length;
    while (str[ind - 1] == '0') ind--;
    if (str[ind - 1] == '.') return str.substring(0, ind - 1);
    return str.substring(0, ind);
}

// Функция для замены запятой в записи числа на точку (если такая есть)

function toPoint(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ",") {
            return str.substring(0, i) + "." + str.substring(i + 1);
        }
    }
    return str;
}

// Главная функция

function sqrt_real() {
    
    // Сбор данных с сайта

    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let num = document.querySelector("#data").value;

    // Замена запятой в числе на точку (если такая есть)

    num = toPoint(num);

    // Обработка числа пи

    if (String(num).slice(-2) === "pi") {
        num = String(num).slice(0, -2);
        if (num == "") {
            num = Math.PI;
        }
        else if (num == "-") {
            num = -Math.PI;
        }
        else if (isNaN(num)) {
            document.querySelector(".name1").innerHTML = "इनपुट त्रुटि। कोई संख्या या एकाधिक संख्या दर्ज नहीं की गई है । ";
            return;
        }
        else {
            num = num * Math.PI;
        }
    }
    
    // Обработка чиса e

    if (String(num).slice(-1) === "e") {
        num = String(num).slice(0, -1);
        if (num == "") {
            num = Math.E;
        }
        else if (num == "-") {
            num = -Math.E;
        }
        else if (isNaN(num)) {
            document.querySelector(".name1").innerHTML = "इनपुट त्रुटि। कोई संख्या या एकाधिक संख्या दर्ज नहीं की गई है । ";
            return;
        }
        else {
            num = num * Math.E;
        }
    }

    // Точность по умолчанию - 0 (если ничего не введено).

    if (precision === "") {
        precision = 0;
    }

    // Проверка на нечисловой ввод

    if (isNaN(num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "इनपुट त्रुटि। कोई संख्या या एकाधिक संख्या दर्ज नहीं की गई है । ";
        return;
    }
    
    // Проверка на пустой ввод

    if (num === "") {
        document.querySelector(".name1").innerHTML = "कुछ भी दर्ज नहीं किया गया है ।  संख्याओं का उपयोग करके देखें";
        return;
    }
    
    // Обработка корня из нуля

    if (num == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "अंकगणित " : "बीजीय ") + "संख्या 0 का वर्गमूल 0 है.\nगोलाई सटीकता " + precision + " दशमलव स्थान।";
        return;
    }

    
    // Проверка на большое число

    if (Math.abs(num) > 1e308) {
        document.querySelector(".name1").innerHTML = "दर्ज की गई संख्या बहुत बड़ी है ।  कृपया एक संख्या दर्ज करें जिसका मॉड्यूल 1e308 से कम है । ";
        return;
    }

    // Проверка на нецелую точность

    if (precision != Math.floor(precision)) {
        document.querySelector(".name1").innerHTML = "गैर-पूर्णांक परिशुद्धता पेश की गई है ।  कृपया एक पूर्णांक दर्ज करें । ";
        return;
    }

    // Проверка на отрицательную точность

    if (precision < 0) {
        document.querySelector(".name1").innerHTML = "नकारात्मक सटीकता पेश की गई है ।  कृपया 0 से 16 तक की संख्या दर्ज करें । ";
        return;
    }

    // Проверка на слишком большую точность

    if (precision > 16) {
        document.querySelector(".name1").innerHTML = "बहुत अधिक सटीकता पेश की गई है ।  कृपया 0 से 16 तक की संख्या दर्ज करें । ";
        return;
    }

    // Проверка на слишком маленький модуль числа

    if (Math.abs(num) < 1e-100 && Math.abs(num) != 0) {
        document.querySelector(".name1").innerHTML = "गलती। दर्ज संख्या का मापांक 1e-100 से कम है ।  कृपया एक संख्या दर्ज करें जिसका मापांक 1e-100 या 0 से अधिक है । ";
        return;
    }
    
    // Проверка на отрицательное число

    let neg = false;

    if (num < 0) {
        
        // Если корень арифметический - выводим ошибку

        if (arithm) {
            document.querySelector(".name1").innerHTML = "वास्तविक संख्या में कोई समाधान नहीं हैं";
            return;
        }
        neg = true;
        num = - num;
    }

    // Считаем корень из числа

    sqr = Math.sqrt(num);
    let s = (sqr == sqr.toFixed(precision)) ? sqr : round(sqr.toFixed(precision));

    // Если num отрицательный - добавляем к записи числа i

    if (neg) {
        if (sqr == 1) s = "i";
        else s += "i";
    }

    // Если корень алгебраический - выводим два корня

    if (!arithm) {
        s = s + " और -" + s;
    }

    s += "."

    // Итоговый вывод с кучей условий

    document.querySelector(".name1").innerHTML = ((arithm) ? "अंकगणित " : "बीजीय ") + "संख्या का वर्गमूल " + ((neg) ? "-" : "") + num + " के बराबर " + s + "\nगोलाई सटीकता " + precision + " दशमलव स्थान।";
    
}