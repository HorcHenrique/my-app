"use client";

interface BrainProps {  
    onApply: () => void;
}

export default function Brain(props: BrainProps) {
    return (
        <button
            onClick={props.onApply}
            className="apply"
            type="button"
        >
            APPLY
        </button>
    );
}