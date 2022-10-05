import React, { ReactElement } from "react";

interface TableProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
}

interface IProps {
  tableText?: string;
}

export const Table = <TItem,>(props: TableProps<TItem>) => {
  return null;
};

export const TableComponent: React.FC<IProps> = (): ReactElement => {
  return (
    <>
      <Table
        items={[{ id: "1", firstName: "Bob" }]}
        renderItem={(item) => {
        //   return item.firstName;
        return null;
        }}
      ></Table>
    </>
  );
};
