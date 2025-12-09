import { useParams } from "react-router";

export default function UserDetailPage() {
	const userId = useParams().id;
	console.log(userId);
	return <div>UserDetailPage</div>;
}
