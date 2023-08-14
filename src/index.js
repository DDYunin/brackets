module.exports = function check(str, bracketsConfig) {
  // Строка и конфигурация
  const stack = [];
  // Map для подсчёта одинаковых скобок
  const mapSameBrackets = new Map();

  // функция, добавляющая скобку
  function addBracket(bracket) {
    if (!mapSameBrackets.has(bracket)) {
      mapSameBrackets.set(bracket, 0);
    } else {
      mapSameBrackets.set(bracket, mapSameBrackets.get(bracket) + 1);
    }
  }

  for (const letter of str) {
    // Ищем текущую скобку и её антогониста
    const [leftBracket, rightBracket] = bracketsConfig.find(brackets => {
      if (letter === brackets[0] || letter === brackets[1]) {
        return true;
      }
      return false;
    });

    // Если левая скобка и правая - одна и та же скобка
    if (leftBracket === rightBracket) {
      // Увеличиваем количество в map
      addBracket(letter);
      // Если число скобок в map - чётное, то просто добавляет в стек
      if (mapSameBrackets.get(leftBracket) % 2 === 0) {
        stack.push(letter);
      } else {
        // Иначе проверяет стек на пустоту и совпадение с последним элементом
        if (stack.length > 0 && letter === stack[stack.length - 1]) {
          stack.pop();
        } else {
          return false;
        }
      }
    } else {
      // Если левая скобка, то добавляем её в массив
      if (leftBracket === letter) {
        stack.push(letter);
      } else {
        // Нахожу подходящую правую скобку и подходящую для неё левую
        if (stack.length > 0 && leftBracket === stack[stack.length - 1]) {
          stack.pop();
        } else {
          return false;
        }
      }
    }
  }
  // Если массив пуст
  if (!stack.length) {
    return true;
  } else {
    return false;
  }


}
