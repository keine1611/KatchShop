const axios = require('axios/dist/browser/axios.cjs')
const Toastify = require('toastify-js')
const gridjs = require('gridjs') 
const h = require('gridjs')

//Validator Form
function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var selectorRules = {};

  // Hàm thực hiện validate
  function validate(inputElement, rule) {
    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
    var errorMessage;
    var buttonSubmit = document.querySelector(options.buttonSubmit)
    // Lấy ra các rules của selector
    var rules = selectorRules[rule.selector];

    // Lặp qua từng rule & kiểm tra
    // Nếu có lỗi thì dừng việc kiểm
    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ':checked')
          );
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add('invalid');
      getParent(inputElement, options.formGroupSelector).classList.remove('valid');
    } else {
      errorElement.innerText = '';
      getParent(inputElement, options.formGroupSelector).classList.remove('invalid.');
      getParent(inputElement, options.formGroupSelector).classList.add('valid');
    }

    return !errorMessage;
  }

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form)
  var buttonSubmit = $(options.buttonSubmit)
  if (formElement) {
    // Khi click button submit
    buttonSubmit.click(function () {
      var isFormValid = true;

      // Lặp qua từng rules và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        buttonSubmit.prop('disabled', false)
        // Trường hợp submit với javascript
        if (typeof options.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name]');
          var formValues = Array.from(enableInputs).reduce(function (values, input) {

            switch (input.type) {
              case 'radio':
                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                break;
              case 'checkbox':
                if (!input.matches(':checked')) {
                  values[input.name] = '';
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case 'file':
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }

            return values;
          }, {});
          options.onSubmit(formValues);
        }
        // Trường hợp submit với hành vi mặc định

      }
      else {
        buttonSubmit.prop('disabled', true)
      }
    })

    // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
    options.rules.forEach(function (rule) {

      // Lưu lại các rules cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach(function (inputElement) {
        // Xử lý trường hợp blur khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
          var isFormValid = true;
          // Lặp qua từng rules và validate
          options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var isValid = validate(inputElement, rule);
            if (!isValid) {
              isFormValid = false;
            }
          });
          if (isFormValid) {
            buttonSubmit.prop('disabled', false)
          }
          else {
            buttonSubmit.prop('disabled', true)
          }
        }

        // Xử lý mỗi khi người dùng nhập vào input
        inputElement.oninput = function () {
          var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
          errorElement.innerText = '';
          getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
          getParent(inputElement, options.formGroupSelector).classList.remove('valid');
        }
      });
    });
  }

}

// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || 'Vui lòng nhập trường này'
    }
  };
}

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message || 'Trường này phải là email';
    }
  };
}

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    }
  };
}

Validator.maxLength = function (selector, max, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length <= max ? undefined : message || `Vui lòng nhập tối đa ${max} kí tự`;
    }
  };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
    }
  }
}

function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)",
    },
    onClick: function () { } // Callback after click
  }).showToast();
}


//BRAND

//create
$(document).ready(function () {
  Validator({
    form: '#formCreateBrand',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    buttonSubmit: '#createBrand',
    rules: [
      Validator.isRequired('#name_brand', 'Vui lòng nhập tên thương hiệu'),
      Validator.isRequired('#description_brand', 'Vui lòng nhập thông tin thương hiệu'),
      Validator.maxLength('#name_brand', 50, 'Tên thương hiệu tối đa 50 kí tự'),
      Validator.maxLength('#description_brand', 2000, 'Tên thương hiệu tối đa 2000 kí tự'),
    ],
    onSubmit: function (data) {
      console.log(data)
      axios({
        method: 'post',
        url: 'http://localhost:1611/api/brand/',
        data: data
      })
        .then(function (res) {
          if (res.status == 200) {
            showToast('Thêm thành công')
          }
          else {
            if (res.status == 500) {
              showToast('Thêm thất bại')
            }
          }

        })
        .catch(function (res) {
          showToast('Lỗi kết nối đến máy chủ')
        })
    }
  })
})



//delete
$(document).ready(function () {
  $('.deleteBrand').click(function () {
    var elementCount = $('.deleteBrand').length
    console.log(elementCount)
    var id_brand = $(this).attr('id')
    axios({
      method: 'delete',
      url: 'http://localhost:1611/api/brand/' + id_brand,
    })
      .then(function (res) {
        if (res.status == 200) {
          showToast('Xoá thành công!')
            .then(function () {
              if (elementCount == 1) {
                return
              }
              else {
                console.log($(this).getParent().getParent().getParent())
                $(this).getParent().getParent().getParent().remove()
              }
            })

        }
        else {
          showToast('Lỗi khi xoá')
        }

      })
      .catch(function () {
        showToast('Lỗi kết nối đến máy chủ')
      })


  })
})



//Validator form

// Đối tượng `Validator`
