const passwordValidator = (value) => /^(?![^a-zA-Z]+$)(?!\D+$).{6,15}$/.test(value);

export default {
    passwordValidator
}