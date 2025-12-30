import { useParams } from "react-router";

export default function UserDetailPage() {
	const userId = useParams().id;
	return <div>UserDetailPage {userId}</div>;
}
