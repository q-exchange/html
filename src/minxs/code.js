export const regCode = {
    data() {
        return {
            codedisabled: false,
            countdown: 60
        }
    },
    computed: {
        sendcodeValue() {
            return this.$t("uc.regist.sendcode");
        }
    },
    methods: {
        labelBlur(e) {
            if (e.target.value.length == 0) {
                const element = e.srcElement;
                let span = element.parentNode.parentNode.parentNode.getElementsByTagName("label")[0];
                span.style.transform = `translateY(0px) scale(1)`;
            }

        },
        labelFocus(e) {
            const element = e.srcElement;
            let span = element.parentNode.parentNode.parentNode.getElementsByTagName("label")[0];
            span.style.transform = `translateY(-10px) scale(.85)`;
        },
        settime() {
            this.sendcodeValue = this.countdown;
            this.codedisabled = true;
            let timercode = setInterval(() => {
                this.countdown--;
                this.sendcodeValue = this.countdown;
                if (this.countdown <= 0) {
                    clearInterval(timercode);
                    this.codedisabled = false;
                    this.sendcodeValue = this.$t("uc.regist.sendcode");
                    this.countdown = 60;
                }
            }, 1000);
        },
    }
}