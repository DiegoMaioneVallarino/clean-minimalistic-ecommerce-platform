import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <header>
                Header
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                Footer
            </footer>
        </>
    );
}

export default MainLayout;