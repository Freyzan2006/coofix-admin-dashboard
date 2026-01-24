import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { BringToFrontIcon, HeartIcon, ZapIcon } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
);

const lineChartData = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	datasets: [
		{
			label: "Users",
			data: [65, 59, 80, 81, 56, 55],
			borderColor: "rgb(75, 192, 192)",
			tension: 0.1,
		},
	],
};

const barChartData = {
	labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	datasets: [
		{
			label: "Votes",
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				"rgba(255, 99, 132, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 206, 86, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(153, 102, 255, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		},
	],
};

const pieChartData = {
	labels: ["Red", "Blue", "Yellow"],
	datasets: [
		{
			data: [300, 50, 100],
			backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
		},
	],
};

export default function AnalyticsPage() {
	return (
		<div className="p-4 bg-base-100 min-h-screen">
			<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<div className="stat">
							<div className="stat-figure text-primary">
								<HeartIcon />
							</div>
							<div className="stat-title">Total Users</div>
							<div className="stat-value">1,234</div>
							<div className="stat-desc">21% more than last month</div>
						</div>
					</div>
				</div>

				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<div className="stat">
							<div className="stat-figure text-secondary">
								<ZapIcon />
							</div>
							<div className="stat-title">Page Views</div>
							<div className="stat-value">2.6M</div>
							<div className="stat-desc">14% more than last month</div>
						</div>
					</div>
				</div>

				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<div className="stat">
							<div className="stat-figure text-success">
								<BringToFrontIcon />
							</div>
							<div className="stat-title">New Orders</div>
							<div className="stat-value">567</div>
							<div className="stat-desc">8% less than last month</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">User Growth</h2>
						<div className="chart-container">
							<Line
								data={lineChartData}
								options={{ maintainAspectRatio: false }}
							/>
						</div>
					</div>
				</div>

				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Votes Distribution</h2>
						<div className="chart-container">
							<Bar
								data={barChartData}
								options={{ maintainAspectRatio: false }}
							/>
						</div>
					</div>
				</div>

				{/* Pie Chart */}
				<div className="card bg-base-100 shadow-xl lg:col-span-2">
					<div className="card-body">
						<h2 className="card-title">Category Breakdown</h2>
						<div className="chart-container max-w-md mx-auto">
							<Pie
								data={pieChartData}
								options={{ maintainAspectRatio: false }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
