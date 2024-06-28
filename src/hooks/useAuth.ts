import { useTypedSelector } from "./redux"

export const useAuth = () => {
    const { id, email } = useTypedSelector(state=>state.user);

    return {
        isAuth : !!email,
        email,
        id,
    };
}