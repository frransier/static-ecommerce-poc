<template>
    <div class="presentkort-wrapper">
        <Modal :isVisible="modalIsVisible" @close="toggleModal">
            <div class="presentkort">
                <div :style="{ display: hasAcceptedTerms ? 'none' : null }" class="presentkort__overlay">
                    <div class="presentkort__accept">
                        <label>
                            <input
                                v-model="acceptedTermsValue"
                                name="terms-and-conditions"
                                type="checkbox"
                            >
                            <br>
                            Jag accepterar köpvillkoren
                        </label>
                        <input
                            type="button"
                            value="Gå vidare"
                            @click="validateAcceptTerms"
                        >
                        <p></p>
                        <p :style="{ display: displayError ? 'block' : 'none' }" style="color: red;">Vänligen acceptera köpvillkoren</p>
                    </div>
                </div>
                <p>
                    <iframe
                        class="presentkort__iframe"
                        src="https://presentkort.retain24.com/Jaktia/start.do"
                        width="310"
                        height="150">
                    </iframe>
                </p>
            </div>
        </Modal>

        <Btn
            :isRed="true"
            :text="$getDictionaryValue('Site.PresentkortButton', 'Köp presentkort')"
            @click.native="toggleModal"
        />
    </div>
</template>

<script>
import Modal from '@/components/Modal'
import Button from '@/components/Button'

export default {
    name: 'Presentkort',
    components: {
        Modal,
        Btn: Button
    },
    data () {
        return {
            modalIsVisible: false,
            acceptedTermsValue: false,
            hasAcceptedTerms: false,
            displayError: false
        }
    },
    methods: {
        toggleModal () {
            this.modalIsVisible = !this.modalIsVisible
        },
        validateAcceptTerms () {
            if (this.acceptedTermsValue) {
                this.hasAcceptedTerms = true
            } else {
                this.displayError = true
            }
        }
    }
}
</script>
