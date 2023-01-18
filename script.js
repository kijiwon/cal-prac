// 계산기의 모든 엘리먼트 정보 담기
const calculator = document.querySelector('.cal');
// 버튼의 모든 엘리먼트 정보 담기
const buttons = calculator.querySelector('.input');

// 입력창에 들어오는 엘리먼트 정보 담기
const display = document.querySelector('.display');
let firstNum, operator, previousKey, previousNum;

// 버튼 클릭 이벤트
buttons.addEventListener('click', function (event) {
    const target = event.target; // 클릭된 HTML 엘리먼트의 정보
    const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보
    const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보
    const buttonContainerArray = buttons.children;
    
    if (target.matches('button')) {
      for (let i = 0; i < buttonContainerArray.length; i++) {
        const childrenArray = buttonContainerArray[i].children;
        for (let j = 0; j < childrenArray.length; j++) {
          childrenArray[j].classList.remove('isPressed');
        }
      }
      if (action === 'number') {
        if (display.textContent === '0' || previousKey === 'operator' || previousKey === 'calculate') {
          display.textContent = buttonContent;
        } else {
          display.textContent = display.textContent + buttonContent;
        }
        previousKey = 'number';
      }
      if (action === 'operator') {
        target.classList.add('isPressed');
        if (firstNum && operatorForAdvanced && previousKey !== 'operator' && previousKey !== 'calculate') {
          display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
        }
        firstNum = display.textContent;
        operatorForAdvanced = buttonContent;
        previousKey = 'operator';
      }
  
      if (action === 'decimal') {
        if (!display.textContent.includes('.') && previousKey !== 'operator') {
          display.textContent = display.textContent + '.';
        } else if (previousKey === 'operator') {
          display.textContent = '0.';
        }
        previousKey = 'decimal';
      }
  
      if (action === 'clear') {
        firstNum = undefined;
        operatorForAdvanced = undefined;
        previousNum = undefined;
        previousKey = 'clear';
        display.textContent = '0';
      }
  
      if (action === 'calculate') {
        if (firstNum) {
          if (previousKey === 'calculate') {
            display.textContent = calculate(display.textContent, operatorForAdvanced, previousNum);
          } else {
            previousNum = display.textContent;
            display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
          }
        }
        previousKey = 'calculate';
      }
    }
  });

// 연산
function calculate(n1, operator, n2) {
    let result = 0;
    if (operator === '+') {
      result = Number(n1) + Number(n2);
    }
    if (operator === '-') {
      result = Number(n1) - Number(n2);
    }
    if (operator === '*') {
      result = Number(n1) * Number(n2);
    }
    if (operator === '/') {
      result = Number(n1) / Number(n2);
    }
    if (operator === '^') {
        result = Math.pow(Number(n1),Number(n2))
    }
    if (operator === '%') {
        result = Number(n1)/ 100; 
    }
    return String(result);
}