import * as yup from "yup"


export const validationForProfile = yup.object().shape({
    name: yup.string("Поле должно быть строкой").required("ФИО обязательно для заполнения"),
    birthday: yup.string("Поле должно быть строкой").required("Дата рождения обязательня для заполнения"),
    email: yup.string("Поле должно быть строкой").email("Введите правильную почту").required("Почта обязательна для заполнения"),
    image: yup.string("Поле должно быть строкой").url("Введите правильную ссылку на картинку").required("Картинка обязательна для заполнения")
})
export const validationLogin = yup.object().shape({
    email: yup
        .string()
        .typeError('Email должен быть строкой')
        .email('Введите корректный email')
        .required('Email обязателен для заполнения'),
    password: yup
        .string()
        .test("password", 'Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один специальный символ', (value) => {
            return (
                /[a-z]/.test(value) &&
                /[A-Z]/.test(value) &&
                /\d/.test(value) &&
                /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
            );
        })
        .min(8, 'Пароль должен быть не короче 8 символов')
        .max(20, 'Пароль должен быть не длиннее 20 символов')
        .required('Пароль обязателен для заполнения'),
});


export const validationRegister = yup.object().shape({
    nickname: yup
        .string()
        .required("Фамилия обязательна для заполнения"),
    email: yup
        .string()
        .typeError("Email должен быть строкой")
        .email("Введите корректный email")
        .required("Email обязателен для заполнения"),
    password: yup
        .string()
        .test(
            "password",
            "Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один специальный символ",
            (value) => {
                return (
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                );
            }
        )
        .min(8, "Пароль должен быть не короче 8 символов")
        .max(20, "Пароль должен быть не длиннее 20 символов")
        .required("Пароль обязателен для заполнения"),

    confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
        .required("Подтверждение пароля обязательно"),
});
