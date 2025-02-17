<script setup lang="ts">
useHead({
    title: 'Terms of Service - Ghost Jobs',
    meta: [
        {
            name: 'description',
            content: 'Terms of Service and User Agreement for Ghost Jobs platform.',
        },
    ],
})
</script>

<template>
    <div class="legal-page">
        <Section class="legal-section">
            <Container>
                <div class="legal-content">
                    <h1 class="title is-2 mb-6">Terms of Service</h1>
                    <p class="subtitle is-6 has-text-grey mb-6">Last Updated: October 2nd, 2024</p>

                    <div class="content">
                        <h2 class="title is-4 mt-6 mb-4">1. Introduction</h2>
                        <p class="mb-5">
                            These Terms of Service ("Terms") constitute a legally binding agreement made between you,
                            whether personally or on behalf of an entity ("you") and Ghost Jobs, LLC ("we," "us," or
                            "our"), concerning your access to and use of our website, GhostJobs.io, and any related
                            platforms or services (collectively, the "Site"). By accessing and using the Site, you
                            acknowledge that you have read, understood, and agree to be bound by these Terms. If you do
                            not agree to all the Terms, you are expressly prohibited from using the Site and must
                            discontinue use immediately.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">2. Eligibility to Use the Site</h2>
                        <p class="mb-5">
                            The Site is intended for users who are at least 18 years old. By using the Site, you confirm
                            that you meet this age requirement. The Site is intended for personal, non-commercial use,
                            and you may not use the Site for any purpose that is unlawful or prohibited by these Terms.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">3. Account Registration and Security</h2>
                        <p class="mb-5">
                            To access certain features of the Site, you may be required to register for an account. By
                            registering, you agree to provide true, accurate, and complete information about yourself.
                            You are responsible for maintaining the confidentiality of your account information and
                            agree to notify us immediately of any unauthorized use of your account. We disclaim any
                            liability for third-party actions made via your account(s).
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">4. Privacy Policy</h2>
                        <p class="mb-5">
                            We care about data privacy and security. Please review our Privacy Policy, which governs the
                            use of your personal information on the Site. By using the Site, you agree to be bound by
                            our Privacy Policy, which is incorporated into these Terms.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">5. Use of the Site</h2>
                        <p class="mb-3">By using the Site, you agree not to:</p>
                        <ul class="mb-4">
                            <li>Use the Site in any way that violates any applicable laws.</li>
                            <li>Use the Site for any unauthorized commercial purpose.</li>
                            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site.
                            </li>
                            <li>Post any defamatory, obscene, or otherwise objectionable content.</li>
                        </ul>
                        <p class="mb-3">You agree to comply with all applicable laws, rules, and regulations, and you
                            will not:</p>
                        <ul class="mb-5">
                            <li>Distribute viruses or harmful computer code.</li>
                            <li>Attempt to hack or interfere with the Site or any of our services.</li>
                        </ul>

                        <h2 class="title is-4 mt-6 mb-4">6. User Contributions</h2>
                        <p class="mb-5">
                            The Site may invite you to chat, contribute to, or participate in blogs, message boards,
                            forums, or other features, and may provide you with the opportunity to create, submit, post,
                            display, transmit, perform, publish, or broadcast content and materials to us or on the Site
                            (collectively, "Contributions"). By posting Contributions, you grant us a worldwide,
                            irrevocable, perpetual, non-exclusive, royalty-free license to use, reproduce, modify,
                            publish, and distribute your Contributions.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">7. Intellectual Property Rights</h2>
                        <p class="mb-5">
                            Unless otherwise indicated, the Site and all content on it, including text, graphics, logos,
                            icons, images, audio clips, and software, is the property of Ghost Jobs, LLC, or its
                            licensors. All rights reserved. You agree not to reproduce, republish, modify, distribute,
                            or otherwise exploit any part of the Site without prior written consent.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">8. Disclaimers and Limitation of Liability</h2>
                        <p class="mb-5">
                            The Site is provided on an "AS-IS" and "AS AVAILABLE" basis, without warranties of any kind,
                            either express or implied. We do not guarantee that the Site will be uninterrupted,
                            error-free, or free of harmful components. To the maximum extent permitted by law, Ghost
                            Jobs, LLC disclaims all liability, whether arising in contract, tort, strict liability, or
                            otherwise, for damages arising from your use of the Site.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">9. Indemnification</h2>
                        <p class="mb-5">
                            You agree to indemnify, defend, and hold harmless Ghost Jobs, LLC and its affiliates,
                            officers, agents, employees, and partners from and against any losses, liabilities, claims,
                            demands, damages, costs, and expenses arising out of or related to your use of the Site or
                            any violation of these Terms.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">10. Governing Law</h2>
                        <p class="mb-5">
                            These Terms shall be governed and construed in accordance with the laws of the State of
                            Texas, without regard to its conflict of law principles.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">11. Changes to the Terms</h2>
                        <p class="mb-5">
                            We reserve the right to update these Terms at any time. Changes will be effective
                            immediately upon posting the updated Terms on the Site. You are encouraged to review these
                            Terms periodically.
                        </p>

                        <h2 class="title is-4 mt-6 mb-4">12. Contact Us</h2>
                        <p class="mb-5">
                            For any inquiries regarding these Terms, please contact us at hello@ghostjobs.io.
                        </p>
                    </div>
                </div>
            </Container>
        </Section>
    </div>
</template>

<style lang="scss" scoped>
.legal-page {
    padding: 2rem 0;
    background: var(--wrap-muted-color);
}

.legal-section {
    padding: 3rem 0;
}

.legal-content {
    max-width: 800px;
    margin: 0 auto;
    background: var(--card-bg-color);
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: var(--light-box-shadow);

    .title {
        color: var(--dark-text);

        &.is-2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        &.is-4 {
            color: var(--primary);
            font-size: 1.5rem;
            font-weight: 600;
        }
    }

    .content {
        color: var(--medium-text);
        font-size: 1rem;
        line-height: 1.7;

        p {
            margin-bottom: 1.5rem;
        }

        ul {
            margin-left: 1.5rem;
            margin-bottom: 1.5rem;

            li {
                margin-bottom: 0.5rem;
            }
        }
    }
}

@media only screen and (width <=767px) {
    .legal-content {
        padding: 2rem 1.5rem;

        .title {
            &.is-2 {
                font-size: 2rem;
            }

            &.is-4 {
                font-size: 1.25rem;
            }
        }
    }
}
</style>
