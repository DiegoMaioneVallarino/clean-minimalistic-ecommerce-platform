import {
    useMemo,
    useState
} from "react";

import "../../styles/admin-blog.css";


type BlogStatus =
    | "Draft"
    | "Published";


type BlogPost = {
    id: number;

    title: string;

    excerpt: string;

    content: string;

    author: string;

    createdAt: string;

    status: BlogStatus;
};


type BlogFormData = {
    title: string;

    excerpt: string;

    content: string;
};


const initialPosts: BlogPost[] = [
    {
        id: 1,

        title:
            "How to style graphic tees",

        excerpt:
            "A quick guide to combining oversized tees with simple everyday pieces.",

        content:
            `
Graphic tees are one of the easiest pieces
to combine in a casual wardrobe.

Try pairing them with neutral pants,
simple sneakers and minimal accessories.

The graphic itself should remain the main
visual point of the outfit.
            `.trim(),

        author:
            "Admin",

        createdAt:
            "2026-09-08",

        status:
            "Published",
    },

    {
        id: 2,

        title:
            "Behind the new collection",

        excerpt:
            "A look at the ideas and visual references behind our newest pieces.",

        content:
            `
The new collection explores racing graphics,
vintage silhouettes and simplified typography.

The goal was to create pieces that feel
recognizable without becoming too visually heavy.
            `.trim(),

        author:
            "Admin",

        createdAt:
            "2026-09-06",

        status:
            "Draft",
    },
];


const emptyForm: BlogFormData = {
    title: "",
    excerpt: "",
    content: "",
};


function AdminBlog() {

    const [
        posts,
        setPosts
    ] = useState<BlogPost[]>(
        initialPosts
    );


    const [
        search,
        setSearch
    ] = useState("");


    const [
        form,
        setForm
    ] = useState<BlogFormData>(
        emptyForm
    );


    const [
        editingPostId,
        setEditingPostId
    ] = useState<number | null>(
        null
    );


    const filteredPosts =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            if (!query) {
                return posts;
            }


            return posts.filter(
                (post) => {

                    const searchable = `
                        ${post.title}
                        ${post.excerpt}
                        ${post.content}
                        ${post.author}
                        ${post.status}
                    `
                        .toLowerCase();


                    return searchable.includes(
                        query
                    );

                }
            );

        }, [
            posts,
            search
        ]);


    const publishedCount =
        posts.filter(
            (post) =>
                post.status ===
                "Published"
        ).length;


    const draftCount =
        posts.filter(
            (post) =>
                post.status ===
                "Draft"
        ).length;


    function updateForm(
        field: keyof BlogFormData,
        value: string
    ) {

        setForm(
            (currentForm) => ({
                ...currentForm,

                [field]:
                    value,
            })
        );

    }


    function submitPost(
        event:
            React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        if (
            !form.title.trim() ||
            !form.excerpt.trim() ||
            !form.content.trim()
        ) {
            return;
        }


        /*
            EDIT MODE
        */

        if (
            editingPostId !== null
        ) {

            setPosts(
                (currentPosts) =>
                    currentPosts.map(
                        (post) =>
                            post.id ===
                            editingPostId

                                ? {
                                    ...post,

                                    title:
                                        form.title.trim(),

                                    excerpt:
                                        form.excerpt.trim(),

                                    content:
                                        form.content.trim(),
                                }

                                : post
                    )
            );


            setEditingPostId(
                null
            );


            setForm(
                emptyForm
            );


            return;
        }


        /*
            CREATE MODE
        */

        const newPost: BlogPost = {

            id:
                Date.now(),

            title:
                form.title.trim(),

            excerpt:
                form.excerpt.trim(),

            content:
                form.content.trim(),

            author:
                "Admin",

            createdAt:
                new Date()
                    .toISOString()
                    .slice(0, 10),

            status:
                "Draft",
        };


        setPosts(
            (currentPosts) => [
                newPost,
                ...currentPosts,
            ]
        );


        setForm(
            emptyForm
        );
    }


    function startEditing(
        post: BlogPost
    ) {

        setEditingPostId(
            post.id
        );


        setForm({
            title:
                post.title,

            excerpt:
                post.excerpt,

            content:
                post.content,
        });


        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }


    function cancelEditing() {

        setEditingPostId(
            null
        );


        setForm(
            emptyForm
        );

    }


    function togglePostStatus(
        postId: number
    ) {

        setPosts(
            (currentPosts) =>
                currentPosts.map(
                    (post) =>
                        post.id ===
                        postId

                            ? {
                                ...post,

                                status:
                                    post.status ===
                                    "Published"
                                        ? "Draft"
                                        : "Published",
                            }

                            : post
                )
        );

    }


    function deletePost(
        postId: number
    ) {

        setPosts(
            (currentPosts) =>
                currentPosts.filter(
                    (post) =>
                        post.id !==
                        postId
                )
        );


        if (
            editingPostId ===
            postId
        ) {

            cancelEditing();

        }

    }


    return (
        <section className="admin-blog">

            <div className="admin-blog-header">

                <div>

                    <p>
                        Content
                    </p>

                    <h1>
                        Blog
                    </h1>

                </div>


                <div className="admin-blog-metrics">

                    <div>

                        <span>
                            Published
                        </span>

                        <strong>
                            {
                                publishedCount
                            }
                        </strong>

                    </div>


                    <div>

                        <span>
                            Drafts
                        </span>

                        <strong>
                            {
                                draftCount
                            }
                        </strong>

                    </div>

                </div>

            </div>


            <div className="admin-blog-toolbar">

                <input
                    type="text"

                    placeholder="Search posts"

                    value={
                        search
                    }

                    onChange={
                        (event) =>
                            setSearch(
                                event
                                    .target
                                    .value
                            )
                    }
                />

            </div>


            <form
                className={`
                    admin-blog-editor
                    ${
                        editingPostId !==
                        null
                            ? "editing"
                            : ""
                    }
                `}

                onSubmit={
                    submitPost
                }
            >

                <div className="admin-blog-editor-header">

                    <div>

                        <span>
                            {
                                editingPostId !== null
                                    ? "Editing post"
                                    : "New post"
                            }
                        </span>

                        <h2>
                            {
                                editingPostId !== null
                                    ? "Edit article"
                                    : "Create article"
                            }
                        </h2>

                    </div>


                    {
                        editingPostId !==
                        null && (

                            <button
                                type="button"

                                className="admin-blog-cancel"

                                onClick={
                                    cancelEditing
                                }
                            >
                                Cancel
                            </button>

                        )
                    }

                </div>


                <div className="admin-blog-editor-fields">

                    <label>

                        Title

                        <input
                            type="text"

                            placeholder="Article title"

                            value={
                                form.title
                            }

                            onChange={
                                (event) =>
                                    updateForm(
                                        "title",
                                        event
                                            .target
                                            .value
                                    )
                            }
                        />

                    </label>


                    <label>

                        Excerpt

                        <textarea
                            placeholder="Short description"

                            value={
                                form.excerpt
                            }

                            onChange={
                                (event) =>
                                    updateForm(
                                        "excerpt",
                                        event
                                            .target
                                            .value
                                    )
                            }
                        />

                    </label>


                    <label>

                        Content

                        <textarea
                            className="admin-blog-content-input"

                            placeholder="Write the article..."

                            value={
                                form.content
                            }

                            onChange={
                                (event) =>
                                    updateForm(
                                        "content",
                                        event
                                            .target
                                            .value
                                    )
                            }
                        />

                    </label>

                </div>


                <div className="admin-blog-editor-actions">

                    <button
                        type="submit"
                    >
                        {
                            editingPostId !== null
                                ? "Save changes"
                                : "Create draft"
                        }
                    </button>

                </div>

            </form>


            <div className="admin-blog-list">

                {
                    filteredPosts.length ===
                    0 && (

                        <div className="admin-blog-empty">
                            No posts found.
                        </div>

                    )
                }


                {filteredPosts.map(
                    (post) => (

                        <article
                            key={
                                post.id
                            }

                            className="admin-blog-post"
                        >

                            <div className="admin-blog-post-main">

                                <span
                                    className={`
                                        blog-status

                                        ${
                                            post.status
                                                .toLowerCase()
                                        }
                                    `}
                                >
                                    {
                                        post.status
                                    }
                                </span>


                                <h2>
                                    {
                                        post.title
                                    }
                                </h2>


                                <p>
                                    {
                                        post.excerpt
                                    }
                                </p>

                            </div>


                            <div className="admin-blog-meta">

                                <span>
                                    Author
                                </span>

                                <strong>
                                    {
                                        post.author
                                    }
                                </strong>

                            </div>


                            <div className="admin-blog-meta">

                                <span>
                                    Created
                                </span>

                                <strong>
                                    {
                                        post.createdAt
                                    }
                                </strong>

                            </div>


                            <div className="admin-blog-actions">

                                <button
                                    type="button"

                                    onClick={() =>
                                        startEditing(
                                            post
                                        )
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"

                                    onClick={() =>
                                        togglePostStatus(
                                            post.id
                                        )
                                    }
                                >
                                    {
                                        post.status ===
                                        "Published"

                                            ? "Unpublish"

                                            : "Publish"
                                    }
                                </button>


                                <button
                                    type="button"

                                    className="delete"

                                    onClick={() =>
                                        deletePost(
                                            post.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </article>

                    )
                )}

            </div>

        </section>
    );
}


export default AdminBlog;