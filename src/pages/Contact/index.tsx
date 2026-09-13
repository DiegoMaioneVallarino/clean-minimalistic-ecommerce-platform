import {
    useState,
    type FormEvent
} from "react";

import {
    Navigate
} from "react-router-dom";

import {
    useAuth
} from "../../store/AuthContext";

import "../../styles/contact.css";


type ContactFormData = {
    subject: string;
    message: string;
};


function Contact() {

    const {
        user
    } = useAuth();


    const [
        form,
        setForm
    ] = useState<ContactFormData>({
        subject: "",
        message: "",
    });


    const [
        sent,
        setSent
    ] = useState(false);


    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    const currentUser = user;

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        const subject =
            form.subject.trim();

        const message =
            form.message.trim();


        if (
            !subject ||
            !message
        ) {
            return;
        }


        /*
            Más adelante este objeto
            se enviará a MessageContext
            o al backend.
        */

        const newMessage = {
            id:
                Date.now(),

            customer:
        currentUser.name,

            email:
        currentUser.email,

            subject,

            body:
                message,

            createdAt:
                new Date()
                    .toISOString(),

            status:
                "Unread" as const,
        };


        console.log(
            "Contact message:",
            newMessage
        );


        setForm({
            subject: "",
            message: "",
        });


        setSent(true);


        window.setTimeout(
            () => {
                setSent(false);
            },
            3000
        );

    }


    return (
        <section className="contact-page motion-slide-up">

            <div className="contact-layout">


                <div className="contact-intro">

                    <span className="contact-eyebrow">
                        Support
                    </span>


                    <h1>
                        Contact us
                    </h1>


                    <p>
                        Send us a message about
                        your order, products,
                        returns or anything else
                        you need help with.
                    </p>


                    <div className="contact-user">

                        <span>
                            Sending as
                        </span>

                        <strong>
                            {user.name}
                        </strong>

                        <p>
                            {user.email}
                        </p>

                    </div>

                </div>


                <form
                    className="contact-form"

                    onSubmit={
                        handleSubmit
                    }
                >

                    <div className="contact-field">

                        <label
                            htmlFor="contact-subject"
                        >
                            Subject
                        </label>


                        <input
                            id="contact-subject"

                            type="text"

                            placeholder="What can we help you with?"

                            value={
                                form.subject
                            }

                            onChange={
                                (event) =>
                                    setForm(
                                        (
                                            currentForm
                                        ) => ({
                                            ...currentForm,

                                            subject:
                                                event
                                                    .target
                                                    .value,
                                        })
                                    )
                            }
                        />

                    </div>


                    <div className="contact-field">

                        <label
                            htmlFor="contact-message"
                        >
                            Message
                        </label>


                        <textarea
                            id="contact-message"

                            placeholder="Write your message..."

                            value={
                                form.message
                            }

                            onChange={
                                (event) =>
                                    setForm(
                                        (
                                            currentForm
                                        ) => ({
                                            ...currentForm,

                                            message:
                                                event
                                                    .target
                                                    .value,
                                        })
                                    )
                            }
                        />

                    </div>


                    <div className="contact-form-footer">

                        <span
                            className={`
                                contact-success
                                ${
                                    sent
                                        ? "visible"
                                        : ""
                                }
                            `}
                        >
                            Message sent.
                        </span>


                        <button
                            type="submit"

                            className="contact-submit motion-button"
                        >
                            Send message
                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
}


export default Contact;