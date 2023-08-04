import {FlagPennant} from "@phosphor-icons/react";

function FlagIcon({priority}) {
    return (
        <span className={`${priority === 1
            ? "high"
            : priority === 2
                ? "medium"
                : "low"}-priority`}>
            <FlagPennant size={16}/>
        </span>
    );
}

export default FlagIcon;