import { useToken } from "../hooks/use-auth";

export function getToken() {
    const { getToken } = useToken();
    const token = getToken();
    return token
}