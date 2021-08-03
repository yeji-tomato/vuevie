module.exports = {
    env: {
        browser: true,
        node: true
        // 코드 검사를 브라우저와 node에서 검사를 할 것인지 설정
    },
    extends: [
        // vue 
        //'plugin:vue/vue3-essential', // Lv1
        'plugin:vue/vue3-strongly-recommended', // Lv2 -> 이 문법 적용
        //'plugin:vue/vue3-recommended', // Lv3 -> 엄격한 문법
        // js
        'eslint:recommended'
    ], 
    parserOptions: {
        parser : 'babel-eslint'
    },
    rules: {
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "always",
                "normal": "never",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }]
    }
}