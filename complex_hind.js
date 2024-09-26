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

function sqrt_complex() {
    
    // Сбор данных с сайта

    let precision = document.querySelector("#precision").value;
    let real_num = document.querySelector("#real_num").value;
    let imagine_num = document.querySelector("#imagine_num").value;

    // Замена запятой в числе на точку (если такая есть)

    real_num = toPoint(real_num);
    imagine_num = toPoint(imagine_num);

    // Точность по умолчанию - 0 (если ничего не введено).

    if (precision === "") {
        precision = 0;
    }

    // Проверка на нечисловой ввод

    if (isNaN(real_num) || isNaN(imagine_num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "इनपुट त्रुटि। कोई संख्या या एकाधिक संख्या दर्ज नहीं की गई है । ";
        return;
    }
    
    // Проверка на пустой ввод

    if (real_num === "" || imagine_num === "") {
        document.querySelector(".name1").innerHTML = "कुछ भी दर्ज नहीं किया गया है ।  संख्याओं का उपयोग करके देखें";
        return;
    }
        
    // Если в мнимой части ноль просим перейти на страничку для действительных чисел

    if (imagine_num == 0) {
        document.querySelector(".name1").innerHTML = "काल्पनिक भाग में शून्य।\nमेरा सुझाव है कि आप वास्तविक संख्याओं के लिए पृष्ठ पर एक ही चीज़ दर्ज करें । ";
        return;
    }

    // Проверка на большое число

    if (Math.abs(real_num) > 1e308 || Math.abs(imagine_num) > 1e308) {
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

    if (Math.abs(real_num) < 1e-100 && Math.abs(real_num) != 0 || Math.abs(imagine_num) < 1e-100 && Math.abs(imagine_num) != 0) {
        document.querySelector(".name1").innerHTML = "त्रुटि। दर्ज संख्या का मापांक 1e-100 से कम है ।  कृपया एक संख्या दर्ज करें जिसका मापांक 1e-100 या 0 से अधिक है । ";
        return;
    }

    // Считаем корень из числа

    arg1 = Math.sqrt((Math.sqrt(Math.pow(real_num, 2) + Math.pow(imagine_num, 2))) / 2 + real_num / 2);
    arg2 = Math.sqrt((Math.sqrt(Math.pow(real_num, 2) + Math.pow(imagine_num, 2)) - real_num) / 2) * (imagine_num / Math.abs(imagine_num));

    let s = ((arg1 == arg1.toFixed(precision)) ? arg1 : round(arg1.toFixed(precision))) + ((arg2 > 0) ? " + " : " - ") + ((Math.abs(arg2) == 1) ? "" : ((Math.abs(arg2) == Math.abs(arg2).toFixed(precision)) ? Math.abs(arg2) : round(Math.abs(arg2).toFixed(precision)))) + "i";

    s = "(" + s + ") और -(" + s + ")";

    // Итоговый вывод с кучей условий

    document.querySelector(".name1").innerHTML = "संख्या का वर्गमूल (" + ((real_num != 0) ? real_num + ((imagine_num > 0) ? " + " : " - ") : ((imagine_num > 0) ? "" : "-")) + ((Math.abs(imagine_num) == 1) ? "" : Math.abs(imagine_num)) + "i) बराबर " + s + ".\nगोलाई सटीकता है " + precision + " दशमलव स्थान।";
}