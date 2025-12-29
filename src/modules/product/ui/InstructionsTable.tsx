import { Alert } from "@shared/ui/Alert.ui";
import { Paragraph } from "@shared/ui/text";
import { MessageSquareDotIcon, MousePointerClickIcon } from "lucide-react";

export const InstructionsTable: React.FC = () => {
	return (
		<Alert variant="info">
			<Paragraph variant="default" className="flex gap-3">
				<MessageSquareDotIcon /> Чтобы взаимодействовать с элементами из таблицы,
			</Paragraph>
			<Paragraph variant="default" className="flex gap-3">
				<MousePointerClickIcon /> нажмите на них
			</Paragraph>
		</Alert>
	);
};
