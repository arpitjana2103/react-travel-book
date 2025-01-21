import SideBar from "../components/SideBar";
import Map from "../components/Map";
import style from "../styles/appPage.module.css";
import { useUser } from "../contexts/userContext";
import { Navigate } from "react-router";

function AppPage() {
    const { user } = useUser();

    if (user === null) return <Navigate replace to="/account" />;

    return (
        <div className={style.appPage}>
            <SideBar />
            <Map />
        </div>
    );
}

export default AppPage;
