import { Colors } from "@/constants/constants"

interface Props {
    width: string
    height: string
    isTrue: boolean
}
export default function TickIcon({ width, height, isTrue }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? "800"}
            height={height ?? "800"}
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke={isTrue ? Colors.PRIMARYGREEN : '#cbd5e1'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4.892 13.269l4.274 4.274L18.709 8"
            ></path>
        </svg>
    )
}