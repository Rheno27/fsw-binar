import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

const Protected = ({ children, role }) => {
    const navigate = useNavigate();

    const { token, user } = useSelector((state) => state.auth);

    if (!token || !user) {
        navigate({ to: "/login" });
    }

    if (token && user && role.length > 0) {
        const isCanAccess = role.includes(user?.role_id);
        if (!isCanAccess) {
            navigate({ to: "/" });
            return;
        }
    }

    return children;
};

export default Protected;
