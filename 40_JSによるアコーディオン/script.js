document.addEventListener('DOMContentLoaded', function () {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    const accordionContainer = document.querySelector('.accordion-container');

    const closeOthers = true;

    accordionTriggers.forEach(trigger => {
        const content = document.getElementById(trigger.getAttribute('aria-controls'));

        // 初期設定: hidden属性ではなくmax-heightで制御するので外しておく
        if (content) {
            content.hidden = false; // hidden属性を無効化
            content.style.maxHeight = '0px';
        }

        trigger.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const currentContent = document.getElementById(this.getAttribute('aria-controls'));

            if (!currentContent) return;

            if (closeOthers && !isExpanded) {
                accordionContainer.querySelectorAll('.accordion-item').forEach(item => {
                    const otherTrigger = item.querySelector('.accordion-trigger');
                    const otherContent = item.querySelector('.accordion-content');

                    if (otherTrigger !== this && otherTrigger.getAttribute('aria-expanded') === 'true') {
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        otherContent.style.maxHeight = '0px';
                    }
                });
            }

            this.setAttribute('aria-expanded', String(!isExpanded));

            if (!isExpanded) {
                currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
            } else {
                currentContent.style.maxHeight = '0px';
            }
        });
    });
});