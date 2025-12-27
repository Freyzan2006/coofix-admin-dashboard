interface KbdProps {
	value: string;
}

export const Kbd: React.FC<KbdProps> = ({ value }) => {
	return <kbd className="kbd">{value}</kbd>;
};
