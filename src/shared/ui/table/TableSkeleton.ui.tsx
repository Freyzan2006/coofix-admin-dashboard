import { cn } from "@shared/lib/utils";
import { Thead } from "./Thead.ui";
import { TableRow } from "./TableRow.ui";
import { TableHeader } from "./TableHeader.ui";
import { Tbody } from "./Tbody.ui";
import { useMemo } from "react";
import { Spinner } from "../Spinner.ui";
import { createStableIds } from "@shared/lib/createStableIds.lib";
import { createMatrixIds } from "@shared/lib/createMatrixIds.lib";

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

	// --- Стабильные id для колонок ---
	const colIds = useMemo(() => createStableIds(col), [col]);

	// --- Стабильные id для таблицы (строки + колонки) ---
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
		<div className="overflow-x-auto relative">
			<Spinner
				className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				size="lg"
			/>
			<table className={className} {...props}>
				<Thead>
					<TableRow>{colSkeleton}</TableRow>
				</Thead>
				<Tbody>{rowSkeleton}</Tbody>
			</table>
		</div>
	);
};
