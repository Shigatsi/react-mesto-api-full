const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateLink = (value, helpers) => {
  if(validator.isUrl(value)){
    return value
  }
  return  helpers.error('Некорректный URL');
}

const validateLogin = celebrate({
  body:  Joi.object().keys(({
    email: Joi.string().required().email().messages({
      'any.required': 'Обязательное поле',
      'any.email': 'Обязательное поле'
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': 'Обязательное поле',
        'string.min': 'Минимальная длина 8 символов',
      }),
  }))
})

const validateUser = celebrate({
  body:  Joi.object().keys(({
    name: Joi.string().min(2).max(30).messages({
      'string.max': 'Максимальная длина 30 символов',
      'string.min': 'Минимальная длина 2 символа',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.max': 'Максимальная длина 30 символов',
      'string.min': 'Минимальная длина 2 символа',
    }),
    email: Joi.string().required().email().messages({
      'any.required': 'Обязательное поле',
      'any.email': 'Обязательное поле'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Обязательное поле',
        'string.min': 'Минимальная длина 8 символов',
      }),
  }))
})

const validateCard = celebrate({
  body:  Joi.object().keys(({
    name: Joi.string().min(2).max(30).required().messages({
      'string.max': 'Максимальная длина 30 символов',
      'string.min': 'Минимальная длина 2 символа',
      'any.required': 'Обязательное поле'
    }),
    link: Joi.string().required().custom(validateLink).messages({
        'any.required': 'Обязательное поле',
      }),
  }))
})



module.exports = {
  validateLogin,
  validateUser,
  validateCard
}
