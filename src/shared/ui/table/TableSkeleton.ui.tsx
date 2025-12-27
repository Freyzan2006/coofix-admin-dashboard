import { createMatrixIds } from "@shared/lib/createMatrixIds.lib";
import { createStableIds } from "@shared/lib/createStableIds.lib";
import { cn } from "@shared/lib/utils";
import { useMemo } from "react";
import { Spinner } from "../Spinner.ui";
import { TableHeader } from "./TableHeader.ui";
import { TableRow } from "./TableRow.ui";
import { Tbody } from "./Tbody.ui";
import { Thead } from "./Thead.ui";

interface ITableSkeletonProps extends React.HTMLAttributes<HTMLTableElement> {
	variant?: "primary" | "secondary";
	col?: number;
	row?: number;
}

export const TableSkeleton: React.FC<ITableSkeletonProps> = ({
	variant = "primary",
	col = 4,
	row = 3,
	...props
}) => {
	const className = cn(
		"table skeleton blur select-none",
		props.className,
		{
			primary: "rounded-box border border-base-content/5 bg-base-100",
			secondary: "",
		}[variant],
	);

	const colIds = useMemo(() => createStableIds(col), [col]);

	const { rowIds, colIds: matrixColIds } = useMemo(
		() => createMatrixIds(row, col),
		[row, col],
	);

	const colSkeleton = useMemo(
		() =>
			colIds.map((id: string, i: number) => (
				<TableHeader key={id}>Column {i + 1}</TableHeader>
			)),
		[colIds],
	);

	const rowSkeleton = useMemo(
		() =>
			rowIds.map((rowId: string, i: number) => (
				<TableRow key={rowId}>
					{matrixColIds.map((colId: string) => (
						<TableHeader key={`${rowId}-${colId}`}>Row {i + 1}</TableHeader>
					))}
				</TableRow>
			)),
		[rowIds, matrixColIds],
	);

	return (
		<div className="overflow-x-auto relative w-full">
			<Spinner
				className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				size="lg"
			/>
			<table {...props} className={className}>
				<Thead>
					<TableRow>{colSkeleton}</TableRow>
				</Thead>
				<Tbody>{rowSkeleton}</Tbody>
			</table>
		</div>
	);
};
