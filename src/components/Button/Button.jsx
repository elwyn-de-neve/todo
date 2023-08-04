function Button({
                    children,
                    type,
                    variant = "primary",
                    disabled = false,
                    onClick
                }) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`btn btn-${variant}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;