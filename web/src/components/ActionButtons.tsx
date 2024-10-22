import {Category} from "../types/category.ts";
import {Link} from "../types/link.ts";

interface ActionButtonsProps {
    target: Category | Link,
    onDelete: () => void
    onOrderChange: (newOrder: number) => void
}

function ActionButtons({target, onDelete, onOrderChange}: ActionButtonsProps) {
    return (
        <div className="flex flex-row gap-2">
            <button
                className="h-6 hover:text-ctp-red"
                onClick={() => onOrderChange(target.order - 1)}
            >
                [UP]
            </button>
            <button
                className="h-6 hover:text-ctp-red"
                onClick={() => onOrderChange(target.order + 1)}
            >
                [DN]
            </button>
            <button
                className="h-6 text-ctp-flamingo hover:text-ctp-red"
                onClick={() => onDelete()}>
                [RM]
            </button>
        </div>
    );
}

export default ActionButtons;