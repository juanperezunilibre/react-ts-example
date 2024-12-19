
import "./Button.css";


interface Props {
    text: string,
    onClick?: () => void,
    children: React.ReactNode
    disabled?: boolean
}

function Button({
    text = "",
    onClick,
    disabled
}: Props) {
    return <button onClick={onClick} disabled={disabled}>
        {text}
    </button>
}

export default Button;

