import { useUserStore } from "../store/userStore";

export const useAuth = () => {
    const {username, roles, isLoggedIn, hasRole, setAuth, clearAuth} = useUserStore();

    return {
        username,
        roles,
        isLoggedIn,
        hasRole,
        setAuth,
        clearAuth,
        isAdmin: hasRole("ROLE_ADMIN")
    }
}