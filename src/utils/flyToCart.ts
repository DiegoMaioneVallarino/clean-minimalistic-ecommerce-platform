export function flyToCart(
    sourceElement: HTMLElement
) {
    const cartElement = document.getElementById(
        "cart-link"
    );

    if (!cartElement) {
        return;
    }

    const sourceRect =
        sourceElement.getBoundingClientRect();

    const cartRect =
        cartElement.getBoundingClientRect();

    const clone =
        sourceElement.cloneNode(true) as HTMLElement;

    clone.style.position = "fixed";

    clone.style.left = `${sourceRect.left}px`;
    clone.style.top = `${sourceRect.top}px`;

    clone.style.width = `${sourceRect.width}px`;
    clone.style.height = `${sourceRect.height}px`;

    clone.style.margin = "0";

    clone.style.pointerEvents = "none";

    clone.style.zIndex = "9999";

    clone.style.objectFit = "cover";

    document.body.appendChild(clone);

    const sourceCenterX =
        sourceRect.left + sourceRect.width / 2;

    const sourceCenterY =
        sourceRect.top + sourceRect.height / 2;

    const cartCenterX =
        cartRect.left + cartRect.width / 2;

    const cartCenterY =
        cartRect.top + cartRect.height / 2;

    const deltaX =
        cartCenterX - sourceCenterX;

    const deltaY =
        cartCenterY - sourceCenterY;

    const animation = clone.animate(
        [
            {
                transform:
                    "translate(0px, 0px) scale(1)",
                opacity: 1,
            },

            {
                transform:
                    `translate(${deltaX * 0.75}px, ${deltaY * 0.75}px) scale(0.35)`,
                opacity: 0.75,
                offset: 0.7,
            },

            {
                transform:
                    `translate(${deltaX}px, ${deltaY}px) scale(0.08)`,
                opacity: 0,
            },
        ],
        {
            duration: 700,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            fill: "forwards",
        }
    );

    animation.onfinish = () => {
        clone.remove();
    };
}