
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

function sqrt_polynom() {
    
    // Сбор данных с сайта

    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let arg_a = document.querySelector("#arg_a").value;
    let arg_b = document.querySelector("#arg_b").value;
    let arg_c = document.querySelector("#arg_c").value;

    // Замена запятой в числе на точку (если такая есть)

    arg_a = toPoint(arg_a);
    arg_b = toPoint(arg_b);
    arg_c = toPoint(arg_c);

    // Точность по умолчанию - 0 (если ничего не введено).

    if (precision === "") {
        precision = 0;
    }

    // Проверка на нечисловой ввод

    if (isNaN(arg_a) || isNaN(arg_b) || isNaN(arg_c) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "इनपुट त्रुटि। कोई संख्या या एकाधिक संख्या दर्ज नहीं की गई है । ";
        return;
    }
    
    // Проверка на пустой ввод

    if (arg_a === "" || arg_b === "" || arg_c === "") {
        document.querySelector(".name1").innerHTML = "कुछ भी दर्ज नहीं किया गया है ।  संख्याओं का उपयोग करके देखें";
        return;
    }

    // Если первый и последний коэффициент имеют разные знаки выводим ошибку

    if (arg_a * arg_c < 0) {
        document.querySelector(".name1").innerHTML = "बहुत खेद है ।  इस बहुपद की जड़ लेना असंभव है । ";
        return;
    }

    // Проверка на большое число

    if (Math.abs(arg_a) > 1e308 || Math.abs(arg_b) > 1e308 || Math.abs(arg_c) > 1e308) {
        document.querySelector(".name1").innerHTML = "दर्ज की गई संख्या बहुत बड़ी है ।  कृपया एक संख्या दर्ज करें जिसका मॉड्यूल 1e308 से कम है । ";
        return;
    }

    // Проверка на нецелую точность

    if (precision != Math.floor(precision)) {
        document.querySelector(".name1").innerHTML = "गैर-पूर्णांक परिशुद्धता दर्ज की गई है ।  कृपया एक पूर्णांक दर्ज करें । ";
        return;
    }

    // Проверка на отрицательную точность

    if (precision < 0) {
        document.querySelector(".name1").innerHTML = "नकारात्मक सटीकता दर्ज की गई है ।  कृपया 0 से 16 तक की संख्या दर्ज करें । ";
        return;
    }

    // Проверка на слишком большую точность

    if (precision > 16) {
        document.querySelector(".name1").innerHTML = "बहुत अधिक सटीकता दर्ज की गई है ।  कृपया 0 से 16 तक की संख्या दर्ज करें । ";
        return;
    }

    // Проверка на слишком маленький модуль числа

    if (Math.abs(arg_a) < 1e-100 && Math.abs(arg_a) != 0 || Math.abs(arg_b) < 1e-100 && Math.abs(arg_b) != 0 || Math.abs(arg_c) < 1e-100 && Math.abs(arg_c) != 0) {
        document.querySelector(".name1").innerHTML = "त्रुटि। दर्ज संख्या का मापांक 1e-100 से कम है ।  कृपया एक संख्या दर्ज करें जिसका मापांक 1e-100 या 0 से अधिक है । ";
        return;
    }

    // Обрабатываем случай где только коэффициент при x не равен нулю

    if (arg_a == 0 && arg_c == 0 && arg_b != 0) {
        if (arg_b < 0) {
            s = ((-arg_b == 1) ? "" : Math.sqrt(-arg_b)) + "ix^0.5";
        }
        else {
            s = ((arg_b == 1) ? "" : Math.sqrt(arg_b)) + "x^0.5";
        }

        if (!arithm) {
            s = s + " и -" + s;
        }

        document.querySelector(".name1").innerHTML = ((arithm) ? "अंकगणित " : "बीजीय ") + "एक बहुपद का वर्गमूल " + ((Math.abs(arg_b) == 1) ? ((arg_b < 0) ? "-" : "") : arg_b) + "x बराबर " + s + ".\nगोलाई सटीकता है " + precision + " दशमलव स्थान।";
        return;
    }

    // Проверка на комплекность итогового числа
    
    kompl = false;

    if (arg_a < 0) {
        if (arithm) {
            document.querySelector(".name1").innerHTML = "बहुत खेद है ।  इस बहुपद की जड़ लेना असंभव है । ";
            return;
        }
        kompl = true;
        arg_a = -arg_a;
        arg_b = -arg_b;
        arg_c = -arg_c;
    }

    // Считаем итоговые коэффициенты
    
    k1 = Math.sqrt(arg_a);
    k2 = Math.sqrt(arg_c);

    

    // Проверка существования корня из многочлена

    if (4 * arg_a * arg_c != arg_b * arg_b) {
        document.querySelector(".name1").innerHTML = "बहुत खेद है ।  इस बहुपद की जड़ लेना असंभव है । ";
        return;
    }

    // Если итоговое число - 0
    
    if (k1 == 0 && k2 == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "अंकगणित " : "बीजीय ") + "एक बहुपद का वर्गमूल 0 बराबर 0" + "\nगोलाई सटीकता है " + precision + " दशमलव स्थान।";
        return;
    }

    // Проверка на минус между слагаемыми

    neg = false;

    if (arg_b < 0) {
        neg = true;
    }

    // Если некоторые коэффициенты равны нулю
    
    if (k2 == 0) {
        s = ((k1 == 1) ? "" : ((k1.toFixed(precision) == k1) ? k1 : round(k1.toFixed(precision)))) + "x";
    }
    else if (k1 == 0) {
        s = ((k2.toFixed(precision) == k2) ? k2 : round(k2.toFixed(precision)))
    }
    else {
        s = ((k1 == 1) ? "" : ((k1.toFixed(precision) == k1) ? k1 : round(k1.toFixed(precision)))) + "x " + ((neg) ? "- " : "+ ") + ((k2.toFixed(precision) == k2) ? k2 : round(k2.toFixed(precision)));
    }

    // Добавляем i для комплексного числа и +- если корень алгебраический

    if (kompl || !arithm) {
        s = "(" + s + ")";
        if (kompl) {
            s += "i";
        } 
        if (!arithm) {
            s = s + " और -" + s;
        }
    }

    // Итоговый вывод с кучей условий

    document.querySelector(".name1").innerHTML = ((arithm) ? "अंकगणित " : "बीजीय ") + "एक बहुपद का वर्गमूल " + ((kompl) ? "-" : "") +"(" + ((arg_a == 0) ? "" : ((arg_a == 1) ? "" : arg_a) + "x^2") + ((arg_b == 0) ? "" : ((arg_b > 0) ? " + " : " - ") + ((Math.abs(arg_b) == 1) ? "" : Math.abs(arg_b)) + "x") + ((arg_c == 0) ? "" : ((arg_a == 0 && arg_b == 0) ? "" : " + ") + arg_c) + ") बराबर " + s + ".\nगोलाई सटीकता है " + precision + " दशमलव स्थान।";
}