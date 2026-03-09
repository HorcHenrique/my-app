"use client";

interface BrainProps {  
    canApply: boolean;
    onApply: () => void;
}

export default function Brain(props: BrainProps) {
    return (
        <button
            onClick={props.onApply}
            className={`apply ${!props.canApply ? "is-disabled" : ""}`}
            type="button"
            aria-disabled={!props.canApply}
        >
            APPLY
        </button>
    );
}