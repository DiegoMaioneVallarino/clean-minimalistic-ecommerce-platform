import {
    useMemo,
    useState
} from "react";

import "../../styles/admin-messages.css";


type MessageStatus =
    | "Unread"
    | "Read";


type AdminMessage = {
    id: number;
    customer: string;
    email: string;
    subject: string;
    body: string;
    time: string;
    status: MessageStatus;
};


const initialMessages: AdminMessage[] = [
    {
        id: 1,

        customer:
            "Alice Morgan",

        email:
            "alice@example.com",

        subject:
            "Where is my order?",

        body:
            "Hi, I placed an order a few days ago and I would like to know the current shipping status.",

        time:
            "12 min",

        status:
            "Unread",
    },

    {
        id: 2,

        customer:
            "John Carter",

        email:
            "john@example.com",

        subject:
            "Change product size",

        body:
            "I ordered a medium size but I would like to change it to large if the order has not shipped yet.",

        time:
            "31 min",

        status:
            "Unread",
    },

    {
        id: 3,

        customer:
            "Maria Lopez",

        email:
            "maria@example.com",

        subject:
            "Return request",

        body:
            "I would like to return one of the products from my latest order. Could you tell me how the return process works?",

        time:
            "1 h",

        status:
            "Read",
    },

    {
        id: 4,

        customer:
            "Sofia Ramirez",

        email:
            "sofia@example.com",

        subject:
            "Discount question",

        body:
            "Hi, I saw a discounted product yesterday. Is the promotion still available?",

        time:
            "3 h",

        status:
            "Read",
    },
];


function AdminMessages() {

    const [messages, setMessages] =
        useState<AdminMessage[]>(
            initialMessages
        );


    const [search, setSearch] =
        useState("");


    const [
        selectedMessageId,
        setSelectedMessageId
    ] = useState<number | null>(
        initialMessages[0]?.id ??
        null
    );


    const filteredMessages =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            if (!query) {
                return messages;
            }


            return messages.filter(
                (message) => {

                    const searchable = `
                        ${message.customer}
                        ${message.email}
                        ${message.subject}
                        ${message.body}
                    `
                        .toLowerCase();


                    return searchable.includes(
                        query
                    );

                }
            );

        }, [
            messages,
            search
        ]);


    const selectedMessage =
        messages.find(
            (message) =>
                message.id ===
                selectedMessageId
        ) ?? null;


    const unreadCount =
        messages.filter(
            (message) =>
                message.status ===
                "Unread"
        ).length;


    function selectMessage(
        messageId: number
    ) {

        setSelectedMessageId(
            messageId
        );


        setMessages(
            (currentMessages) =>
                currentMessages.map(
                    (message) =>
                        message.id ===
                        messageId
                            ? {
                                ...message,
                                status:
                                    "Read"
                            }
                            : message
                )
        );

    }


    function markUnread() {

        if (!selectedMessage) {
            return;
        }


        setMessages(
            (currentMessages) =>
                currentMessages.map(
                    (message) =>
                        message.id ===
                        selectedMessage.id
                            ? {
                                ...message,
                                status:
                                    "Unread"
                            }
                            : message
                )
        );

    }


    return (
        <section className="admin-messages">

            <div className="admin-messages-header">

                <div>

                    <p>
                        Customer support
                    </p>

                    <h1>
                        Messages
                    </h1>

                </div>


                <div className="admin-messages-counter">

                    <span>
                        Unread
                    </span>

                    <strong>
                        {unreadCount}
                    </strong>

                </div>

            </div>


            <div className="admin-messages-search">

                <input
                    type="text"

                    placeholder="Search messages"

                    value={search}

                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                />

            </div>


            <div className="admin-messages-layout">


                <div className="admin-message-list">

                    {filteredMessages.map(
                        (message) => (

                            <button
                                key={message.id}

                                type="button"

                                className={`
                                    admin-message-preview
                                    ${
                                        message.id ===
                                        selectedMessageId
                                            ? "selected"
                                            : ""
                                    }
                                    ${
                                        message.status ===
                                        "Unread"
                                            ? "unread"
                                            : ""
                                    }
                                `}

                                onClick={() =>
                                    selectMessage(
                                        message.id
                                    )
                                }
                            >

                                <div className="admin-message-preview-top">

                                    <strong>
                                        {
                                            message.customer
                                        }
                                    </strong>

                                    <span>
                                        {
                                            message.time
                                        }
                                    </span>

                                </div>


                                <h3>
                                    {
                                        message.subject
                                    }
                                </h3>


                                <p>
                                    {
                                        message.body
                                    }
                                </p>

                            </button>

                        )
                    )}

                </div>


                <div className="admin-message-reader">

                    {selectedMessage ? (

                        <>

                            <div className="admin-message-reader-header">

                                <div>

                                    <span>
                                        From
                                    </span>

                                    <h2>
                                        {
                                            selectedMessage.customer
                                        }
                                    </h2>

                                    <p>
                                        {
                                            selectedMessage.email
                                        }
                                    </p>

                                </div>


                                <button
                                    type="button"

                                    onClick={
                                        markUnread
                                    }
                                >
                                    Mark unread
                                </button>

                            </div>


                            <div className="admin-message-content">

                                <span>
                                    Subject
                                </span>

                                <h3>
                                    {
                                        selectedMessage.subject
                                    }
                                </h3>


                                <p>
                                    {
                                        selectedMessage.body
                                    }
                                </p>

                            </div>


                            <div className="admin-message-reply">

                                <textarea
                                    placeholder="Write a reply..."
                                />


                                <button
                                    type="button"
                                >
                                    Send reply
                                </button>

                            </div>

                        </>

                    ) : (

                        <div className="admin-message-empty">

                            Select a message.

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}


export default AdminMessages;