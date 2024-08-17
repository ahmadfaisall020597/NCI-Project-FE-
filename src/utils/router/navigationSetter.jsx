import { useNavigate } from "react-router-dom"

export const NavigateSetter = () => {
    History.navigate = useNavigate();

    return null;
}