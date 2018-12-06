export default {
    data(){ 
        return {
            recaptchaUnverified: true
        }
    },
    methods: {
        captchaVerified(response) {
            this.recaptchaUnverified = false;
            this.user.captcha = response;
        },
        captchaExpired() {
            this.recaptchaUnverified = true;
        }
    }
}