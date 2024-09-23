import { Descriptions, Empty, Flex, Segmented, Space, Spin } from "antd";
import useExternalStockRecords from "../../../hooks/useExternalStockRecords";

function ExternalStockRecords() {
  const { items, tableItems, handleItem, isLoading, records } =
    useExternalStockRecords();

  return (
    <>
      <div className="mb-10">
        <Flex gap="small" align="flex-start" vertical>
          {items && items.length > 0 && (
            <Segmented
              defaultValue={items[0]}
              options={items.map((item) => ({
                label: (
                  <div style={{ padding: 4 }}>
                    <div className="uppercase">{item}</div>
                  </div>
                ),
                value: item,
              }))}
              onChange={(value) => handleItem(value)}
            />
          )}
        </Flex>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spin />
        </div>
      ) : records && records.length != 0 ? (
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          {tableItems.map((item, index) => (
            <Descriptions
              layout="horizontal"
              bordered
              key={index}
              items={item}
              column={2}
            />
          ))}
        </Space>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default ExternalStockRecords;
